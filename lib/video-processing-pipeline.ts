import { spawn } from "child_process"
import { promises as fs } from "fs"
import path from "path"

export interface VideoProcessingOptions {
  inputPath: string
  outputPath: string
  sport: string
  quality: "low" | "medium" | "high"
  extractFrames?: boolean
  frameRate?: number
}

export interface ProcessingResult {
  success: boolean
  outputPath?: string
  thumbnailPath?: string
  frames?: string[]
  metadata?: VideoMetadata
  error?: string
}

export interface VideoMetadata {
  duration: number
  width: number
  height: number
  frameRate: number
  bitrate: number
  format: string
  size: number
}

export class VideoProcessingPipeline {
  private readonly tempDir = "/tmp/video-processing"
  private readonly outputDir = "/uploads/processed"

  constructor() {
    this.ensureDirectories()
  }

  private async ensureDirectories() {
    await fs.mkdir(this.tempDir, { recursive: true })
    await fs.mkdir(this.outputDir, { recursive: true })
  }

  async processVideo(options: VideoProcessingOptions): Promise<ProcessingResult> {
    try {
      // Extract metadata first
      const metadata = await this.extractMetadata(options.inputPath)

      // Optimize video for sports analysis
      const optimizedPath = await this.optimizeVideo(options)

      // Generate thumbnail
      const thumbnailPath = await this.generateThumbnail(options.inputPath)

      // Extract frames for pose analysis if requested
      let frames: string[] = []
      if (options.extractFrames) {
        frames = await this.extractFrames(options.inputPath, options.frameRate || 5)
      }

      return {
        success: true,
        outputPath: optimizedPath,
        thumbnailPath,
        frames,
        metadata,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown processing error",
      }
    }
  }

  private async extractMetadata(inputPath: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      const ffprobe = spawn("ffprobe", [
        "-v",
        "quiet",
        "-print_format",
        "json",
        "-show_format",
        "-show_streams",
        inputPath,
      ])

      let output = ""
      ffprobe.stdout.on("data", (data) => {
        output += data.toString()
      })

      ffprobe.on("close", (code) => {
        if (code !== 0) {
          reject(new Error("Failed to extract video metadata"))
          return
        }

        try {
          const data = JSON.parse(output)
          const videoStream = data.streams.find((s: any) => s.codec_type === "video")

          resolve({
            duration: Number.parseFloat(data.format.duration),
            width: videoStream.width,
            height: videoStream.height,
            frameRate: eval(videoStream.r_frame_rate),
            bitrate: Number.parseInt(data.format.bit_rate),
            format: data.format.format_name,
            size: Number.parseInt(data.format.size),
          })
        } catch (error) {
          reject(new Error("Failed to parse video metadata"))
        }
      })
    })
  }

  private async optimizeVideo(options: VideoProcessingOptions): Promise<string> {
    const outputPath = path.join(this.outputDir, `optimized_${Date.now()}.mp4`)

    return new Promise((resolve, reject) => {
      const qualitySettings = {
        low: ["-crf", "28", "-preset", "fast"],
        medium: ["-crf", "23", "-preset", "medium"],
        high: ["-crf", "18", "-preset", "slow"],
      }

      const ffmpeg = spawn("ffmpeg", [
        "-i",
        options.inputPath,
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        ...qualitySettings[options.quality],
        "-movflags",
        "+faststart",
        "-y",
        outputPath,
      ])

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve(outputPath)
        } else {
          reject(new Error("Video optimization failed"))
        }
      })
    })
  }

  private async generateThumbnail(inputPath: string): Promise<string> {
    const thumbnailPath = path.join(this.outputDir, `thumb_${Date.now()}.jpg`)

    return new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-i",
        inputPath,
        "-ss",
        "00:00:02",
        "-vframes",
        "1",
        "-q:v",
        "2",
        "-y",
        thumbnailPath,
      ])

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve(thumbnailPath)
        } else {
          reject(new Error("Thumbnail generation failed"))
        }
      })
    })
  }

  private async extractFrames(inputPath: string, frameRate: number): Promise<string[]> {
    const framesDir = path.join(this.tempDir, `frames_${Date.now()}`)
    await fs.mkdir(framesDir, { recursive: true })

    return new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-i",
        inputPath,
        "-vf",
        `fps=${frameRate}`,
        "-q:v",
        "2",
        "-y",
        path.join(framesDir, "frame_%04d.jpg"),
      ])

      ffmpeg.on("close", async (code) => {
        if (code === 0) {
          try {
            const files = await fs.readdir(framesDir)
            const framePaths = files.filter((f) => f.endsWith(".jpg")).map((f) => path.join(framesDir, f))
            resolve(framePaths)
          } catch (error) {
            reject(new Error("Failed to read extracted frames"))
          }
        } else {
          reject(new Error("Frame extraction failed"))
        }
      })
    })
  }

  async cleanupTempFiles(paths: string[]) {
    for (const filePath of paths) {
      try {
        await fs.unlink(filePath)
      } catch (error) {
        console.warn(`Failed to cleanup temp file: ${filePath}`)
      }
    }
  }
}

export const videoProcessor = new VideoProcessingPipeline()
