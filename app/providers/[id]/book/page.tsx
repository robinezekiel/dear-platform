"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Calendar, Video, Phone, MapPin, CreditCard, Shield } from "lucide-react"

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

const availableDates = [
  { date: "2024-01-15", day: "Mon", available: true },
  { date: "2024-01-16", day: "Tue", available: true },
  { date: "2024-01-17", day: "Wed", available: false },
  { date: "2024-01-18", day: "Thu", available: true },
  { date: "2024-01-19", day: "Fri", available: true },
  { date: "2024-01-22", day: "Mon", available: true },
  { date: "2024-01-23", day: "Tue", available: true },
]

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<string>("video")
  const [reason, setReason] = useState("")
  const [step, setStep] = useState(1)

  const handleBooking = () => {
    // Handle booking logic here
    setStep(4) // Go to confirmation
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Book Appointment</h1>
          <p className="text-slate-600">Schedule your session with Dr. Sarah Chen</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNum ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && <div className="w-8 h-0.5 bg-slate-200 mx-2"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === 1 && (
          <Card className="border-slate-200 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date & Time
              </CardTitle>
              <CardDescription>Choose your preferred appointment date and time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Available Dates</h3>
                <div className="grid grid-cols-7 gap-2">
                  {availableDates.map((dateObj) => (
                    <button
                      key={dateObj.date}
                      onClick={() => dateObj.available && setSelectedDate(dateObj.date)}
                      disabled={!dateObj.available}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedDate === dateObj.date
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : dateObj.available
                            ? "border-slate-200 hover:border-slate-300 text-slate-900"
                            : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <div className="text-xs text-slate-600">{dateObj.day}</div>
                      <div className="font-semibold">{new Date(dateObj.date).getDate()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Available Times</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          selectedTime === time
                            ? "border-blue-500 bg-blue-50 text-blue-900"
                            : "border-slate-200 hover:border-slate-300 text-slate-900"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Session Type */}
        {step === 2 && (
          <Card className="border-slate-200 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Session Type
              </CardTitle>
              <CardDescription>How would you like to have your session?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <button
                  onClick={() => setSessionType("video")}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    sessionType === "video" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Video Call</h4>
                      <p className="text-sm text-slate-600">Secure video session from anywhere</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSessionType("phone")}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    sessionType === "phone" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Phone Call</h4>
                      <p className="text-sm text-slate-600">Traditional phone session</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSessionType("in-person")}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    sessionType === "in-person"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-slate-900">In-Person</h4>
                      <p className="text-sm text-slate-600">Visit the office in San Francisco, CA</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Details & Payment */}
        {step === 3 && (
          <Card className="border-slate-200 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Session Details & Payment
              </CardTitle>
              <CardDescription>Provide additional information and payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Session Reason */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Reason for Visit (Optional)</label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe what you'd like to discuss in this session..."
                  className="resize-none"
                  rows={3}
                />
              </div>

              {/* Appointment Summary */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">Appointment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Provider:</span>
                    <span className="text-slate-900">Dr. Sarah Chen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span className="text-slate-900">
                      {selectedDate && new Date(selectedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span className="text-slate-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Session Type:</span>
                    <span className="text-slate-900 capitalize">{sessionType.replace("-", " ")}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-slate-200">
                    <span className="text-slate-900">Total:</span>
                    <span className="text-slate-900">$150.00</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Payment Method</h4>
                <div className="grid gap-3">
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" id="card" defaultChecked />
                      <label htmlFor="card" className="font-medium text-slate-900">
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="mt-3 grid gap-3">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVC" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" id="insurance" />
                      <label htmlFor="insurance" className="font-medium text-slate-900">
                        Insurance
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                  Back
                </Button>
                <Button onClick={handleBooking} className="bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-900">Appointment Confirmed!</CardTitle>
              <CardDescription className="text-green-700">
                Your session with Dr. Sarah Chen has been successfully booked
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">Appointment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Confirmation #:</span>
                    <span className="text-slate-900 font-mono">DEAR-2024-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date & Time:</span>
                    <span className="text-slate-900">
                      {selectedDate && new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Session Type:</span>
                    <span className="text-slate-900 capitalize">{sessionType.replace("-", " ")}</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-green-700">
                  A confirmation email has been sent to your registered email address with session details and
                  preparation instructions.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    Add to Calendar
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">View My Appointments</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Secure & Confidential</h4>
                <p className="text-sm text-blue-700">
                  All sessions are HIPAA-compliant and your privacy is protected with end-to-end encryption.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
