"use client"
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function MobileViewCaldender() {
  // states
  const [date, setDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    comment: "",
  })

  // get number of days in month
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()

  // get month name
  const month = date.toLocaleString("default", { month: "long" })

  // change to next month
  const changeToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    console.log("next month")
  }

  // change to previus month
  const changeToPreviusMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    console.log("previus month")
  }

  // toggle selected day
  const toggleDay = (day: number) => {
    setSelectedDay(selectedDay === day ? null : day)
  }

  // format date to dd/mm
  const formatDate = (day: number) => {
    const month = date.getMonth() + 1 // getMonth() returns 0-based month
    return `${day}/${month}`
  }

  // handle form submit
  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    console.log(formData)
    console.log("submit")

    if (selectedDay !== null) {
      toggleDay(selectedDay)
    }

    // reset form data
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      comment: "",
    })
  }

  // update date in form data when selected day changes
  useEffect(() => {
    if (selectedDay !== null) {
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const formattedDate = `${selectedDay}/${month}/${year}`

      setFormData((prevFormData) => ({
        ...prevFormData,
        date: formattedDate,
      }))
    }
  }, [selectedDay])

  // create array of days in month
  const days: number[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="flex space-x-4">
        <button onClick={changeToPreviusMonth}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">{month}</h1>
        <button onClick={changeToNextMonth}>
          <ArrowRight size={24} />
        </button>
      </div>

      {days.map((day, index) => (
        <div
          key={index}
          className="my-3 w-[50%] bg-gray-200 flex flex-col rounded-sm"
        >
          <div className="relative">
            <button
              className="flex justify-between items-center pl-3 pr-3 h-12 w-full"
              onClick={() => toggleDay(day)}
            >
              <p>{formatDate(day)}</p>
              <PlusCircle size={24} />
            </button>
          </div>
          {selectedDay === day && (
            <div className="bg-gray-100 w-full h-full flex justify-center py-3">
              <form
                onSubmit={handleOnSubmit}
                action=""
                className="flex flex-col space-y-3"
              >
                <label htmlFor="default">Start Work Day</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
                <label htmlFor="default">End Work Day</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
                <label htmlFor="">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
                <Button type="submit" className="bg-blue-400">
                  submit
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
