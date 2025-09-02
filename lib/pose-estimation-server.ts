import * as tf from "@tensorflow/tfjs-node"
import * as posenet from "@tensorflow-models/posenet"
import { WebSocketServer } from "ws"
import { createServer } from "http"

export interface PoseEstimationResult {
  timestamp: number
  poses: {
    keypoints: {
      part: string
      position: { x: number; y: number }
      score: number
    }[]
    score: number
  }[]
  processingTime: number
}

export interface RealTimePoseConfig {
  architecture: "MobileNetV1" | "ResNet50"
  outputStride: 8 | 16 | 32
  inputResolution: { width: number; height: number }
  multiplier: number
  maxDetections: number
  scoreThreshold: number
  nmsRadius: number
}

export class RealTimePoseEstimationServer {
  private poseNetModel: any = null
  private wsServer: WebSocketServer | null = null
  private httpServer: any = null
  private isInitialized = false
  private activeConnections = new Set<any>()

  private defaultConfig: RealTimePoseConfig = {
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: { width: 640, height: 480 },
    multiplier: 0.75,
    maxDetections: 2,
    scoreThreshold: 0.5,
    nmsRadius: 20,
  }

  async initialize(port = 8080): Promise<void> {
    try {
      console.log("[v0] Initializing real-time pose estimation server...")

      // Load PoseNet model with optimized settings
      this.poseNetModel = await posenet.load({
        architecture: this.defaultConfig.architecture,
        outputStride: this.defaultConfig.outputStride,
        inputResolution: this.defaultConfig.inputResolution,
        multiplier: this.defaultConfig.multiplier,
      })

      // Create HTTP server for WebSocket upgrade
      this.httpServer = createServer()

      // Create WebSocket server
      this.wsServer = new WebSocketServer({ server: this.httpServer })

      // Setup WebSocket handlers
      this.setupWebSocketHandlers()

      // Start server
      this.httpServer.listen(port, () => {
        console.log(`[v0] Real-time pose estimation server running on port ${port}`)
      })

      this.isInitialized = true
    } catch (error) {
      console.error("[v0] Failed to initialize pose estimation server:", error)
      throw error
    }
  }

  private setupWebSocketHandlers(): void {
    if (!this.wsServer) return

    this.wsServer.on("connection", (ws) => {
      console.log("[v0] New pose estimation client connected")
      this.activeConnections.add(ws)

      ws.on("message", async (data) => {
        try {
          const message = JSON.parse(data.toString())
          await this.handleMessage(ws, message)
        } catch (error) {
          console.error("[v0] Error processing message:", error)
          ws.send(JSON.stringify({ error: "Invalid message format" }))
        }
      })

      ws.on("close", () => {
        console.log("[v0] Pose estimation client disconnected")
        this.activeConnections.delete(ws)
      })

      ws.on("error", (error) => {
        console.error("[v0] WebSocket error:", error)
        this.activeConnections.delete(ws)
      })

      // Send initial configuration
      ws.send(
        JSON.stringify({
          type: "config",
          config: this.defaultConfig,
          status: "ready",
        }),
      )
    })
  }

  private async handleMessage(ws: any, message: any): Promise<void> {
    const startTime = Date.now()

    switch (message.type) {
      case "analyze_frame":
        await this.analyzeFrame(ws, message.data, startTime)
        break

      case "analyze_video":
        await this.analyzeVideo(ws, message.data, startTime)
        break

      case "update_config":
        await this.updateConfig(ws, message.config)
        break

      case "get_performance_metrics":
        await this.getPerformanceMetrics(ws)
        break

      default:
        ws.send(JSON.stringify({ error: "Unknown message type" }))
    }
  }

  private async analyzeFrame(ws: any, frameData: any, startTime: number): Promise<void> {
    if (!this.isInitialized || !this.poseNetModel) {
      ws.send(JSON.stringify({ error: "Server not initialized" }))
      return
    }

    try {
      // Convert base64 image to tensor
      const imageBuffer = Buffer.from(frameData.image, "base64")
      const imageTensor = tf.node.decodeImage(imageBuffer, 3)

      // Estimate poses
      const poses = await this.poseNetModel.estimatePoses(imageTensor, {
        flipHorizontal: frameData.flipHorizontal || false,
        maxDetections: this.defaultConfig.maxDetections,
        scoreThreshold: this.defaultConfig.scoreThreshold,
        nmsRadius: this.defaultConfig.nmsRadius,
      })

      // Clean up tensor
      imageTensor.dispose()

      const processingTime = Date.now() - startTime

      const result: PoseEstimationResult = {
        timestamp: frameData.timestamp || Date.now(),
        poses: poses.map((pose: any) => ({
          keypoints: pose.keypoints.map((kp: any) => ({
            part: kp.part,
            position: { x: kp.position.x, y: kp.position.y },
            score: kp.score,
          })),
          score: pose.score,
        })),
        processingTime,
      }

      ws.send(
        JSON.stringify({
          type: "pose_result",
          result,
          frameId: frameData.frameId,
        }),
      )
    } catch (error) {
      console.error("[v0] Frame analysis error:", error)
      ws.send(
        JSON.stringify({
          error: "Frame analysis failed",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
      )
    }
  }

  private async analyzeVideo(ws: any, videoData: any, startTime: number): Promise<void> {
    if (!this.isInitialized || !this.poseNetModel) {
      ws.send(JSON.stringify({ error: "Server not initialized" }))
      return
    }

    try {
      const frames = videoData.frames || []
      const results: PoseEstimationResult[] = []

      // Send progress updates
      ws.send(
        JSON.stringify({
          type: "video_analysis_started",
          totalFrames: frames.length,
        }),
      )

      for (let i = 0; i < frames.length; i++) {
        const frameResult = await this.processVideoFrame(frames[i], i)
        results.push(frameResult)

        // Send progress update every 10 frames
        if (i % 10 === 0) {
          ws.send(
            JSON.stringify({
              type: "video_analysis_progress",
              processed: i + 1,
              total: frames.length,
              progress: ((i + 1) / frames.length) * 100,
            }),
          )
        }
      }

      const totalProcessingTime = Date.now() - startTime

      ws.send(
        JSON.stringify({
          type: "video_analysis_complete",
          results,
          totalProcessingTime,
          averageFrameTime: totalProcessingTime / frames.length,
        }),
      )
    } catch (error) {
      console.error("[v0] Video analysis error:", error)
      ws.send(
        JSON.stringify({
          error: "Video analysis failed",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
      )
    }
  }

  private async processVideoFrame(frameData: any, frameIndex: number): Promise<PoseEstimationResult> {
    const frameStartTime = Date.now()

    try {
      const imageBuffer = Buffer.from(frameData.image, "base64")
      const imageTensor = tf.node.decodeImage(imageBuffer, 3)

      const poses = await this.poseNetModel.estimatePoses(imageTensor, {
        flipHorizontal: false,
        maxDetections: this.defaultConfig.maxDetections,
        scoreThreshold: this.defaultConfig.scoreThreshold,
        nmsRadius: this.defaultConfig.nmsRadius,
      })

      imageTensor.dispose()

      return {
        timestamp: frameData.timestamp || frameIndex * 33.33, // Assume 30fps
        poses: poses.map((pose: any) => ({
          keypoints: pose.keypoints.map((kp: any) => ({
            part: kp.part,
            position: { x: kp.position.x, y: kp.position.y },
            score: kp.score,
          })),
          score: pose.score,
        })),
        processingTime: Date.now() - frameStartTime,
      }
    } catch (error) {
      console.error(`[v0] Error processing frame ${frameIndex}:`, error)
      return {
        timestamp: frameIndex * 33.33,
        poses: [],
        processingTime: Date.now() - frameStartTime,
      }
    }
  }

  private async updateConfig(ws: any, newConfig: Partial<RealTimePoseConfig>): Promise<void> {
    try {
      // Update configuration
      this.defaultConfig = { ...this.defaultConfig, ...newConfig }

      // Reload model if architecture changed
      if (newConfig.architecture || newConfig.outputStride || newConfig.inputResolution || newConfig.multiplier) {
        console.log("[v0] Reloading PoseNet model with new configuration...")
        this.poseNetModel = await posenet.load({
          architecture: this.defaultConfig.architecture,
          outputStride: this.defaultConfig.outputStride,
          inputResolution: this.defaultConfig.inputResolution,
          multiplier: this.defaultConfig.multiplier,
        })
      }

      ws.send(
        JSON.stringify({
          type: "config_updated",
          config: this.defaultConfig,
        }),
      )
    } catch (error) {
      console.error("[v0] Config update error:", error)
      ws.send(
        JSON.stringify({
          error: "Failed to update configuration",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
      )
    }
  }

  private async getPerformanceMetrics(ws: any): Promise<void> {
    const metrics = {
      activeConnections: this.activeConnections.size,
      modelLoaded: !!this.poseNetModel,
      serverUptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      configuration: this.defaultConfig,
    }

    ws.send(
      JSON.stringify({
        type: "performance_metrics",
        metrics,
      }),
    )
  }

  async shutdown(): Promise<void> {
    console.log("[v0] Shutting down pose estimation server...")

    // Close all WebSocket connections
    this.activeConnections.forEach((ws) => {
      ws.close()
    })

    // Close WebSocket server
    if (this.wsServer) {
      this.wsServer.close()
    }

    // Close HTTP server
    if (this.httpServer) {
      this.httpServer.close()
    }

    // Dispose of TensorFlow model
    if (this.poseNetModel) {
      this.poseNetModel.dispose()
    }

    this.isInitialized = false
    console.log("[v0] Pose estimation server shutdown complete")
  }

  getStatus(): { initialized: boolean; connections: number; modelLoaded: boolean } {
    return {
      initialized: this.isInitialized,
      connections: this.activeConnections.size,
      modelLoaded: !!this.poseNetModel,
    }
  }
}

export const poseEstimationServer = new RealTimePoseEstimationServer()
