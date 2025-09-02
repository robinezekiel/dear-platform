import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { NotificationCenter } from "@/components/dear/notification-center"
import jest from "jest" // Import jest to declare the variable

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe("NotificationCenter", () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it("should render notification center", () => {
    render(<NotificationCenter />)

    const bellIcon = screen.getByRole("button")
    expect(bellIcon).toBeInTheDocument()
  })

  it("should fetch and display notifications", async () => {
    const mockNotifications = {
      notifications: [
        {
          id: "1",
          type: "therapy",
          title: "Session Reminder",
          message: "Your therapy session is tomorrow",
          read: false,
          createdAt: "2024-01-20T10:00:00Z",
        },
      ],
      unreadCount: 1,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNotifications),
    })

    render(<NotificationCenter />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/notifications")
    })

    // Click to open dropdown
    const bellButton = screen.getByRole("button")
    fireEvent.click(bellButton)

    await waitFor(() => {
      expect(screen.getByText("Session Reminder")).toBeInTheDocument()
      expect(screen.getByText("Your therapy session is tomorrow")).toBeInTheDocument()
    })
  })

  it("should mark notification as read", async () => {
    const mockNotifications = {
      notifications: [
        {
          id: "1",
          type: "therapy",
          title: "Session Reminder",
          message: "Your therapy session is tomorrow",
          read: false,
          createdAt: "2024-01-20T10:00:00Z",
        },
      ],
      unreadCount: 1,
    }

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNotifications),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })

    render(<NotificationCenter />)

    // Wait for notifications to load
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/notifications")
    })

    // Open dropdown
    const bellButton = screen.getByRole("button")
    fireEvent.click(bellButton)

    // Click mark as read button
    await waitFor(() => {
      const markReadButton = screen.getByRole("button", { name: /check/i })
      fireEvent.click(markReadButton)
    })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/notifications/1/read", {
        method: "POST",
      })
    })
  })

  it("should handle fetch errors gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"))

    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    render(<NotificationCenter />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("[v0] Failed to fetch notifications:", expect.any(Error))
    })

    consoleSpy.mockRestore()
  })
})
