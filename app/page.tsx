"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"
import { UpdateScoresDialog } from "./components/update-scores-dialog"

const distributionData = [
  { percentile: 0, count: 2 },
  { percentile: 10, count: 3 },
  { percentile: 20, count: 4 },
  { percentile: 30, count: 6 },
  { percentile: 40, count: 8 },
  { percentile: 50, count: 12 },
  { percentile: 60, count: 15 },
  { percentile: 70, count: 10 },
  { percentile: 80, count: 6 },
  { percentile: 90, count: 4 },
  { percentile: 100, count: 2 },
]

const syllabusData = [
  { topic: "HTML Tools, Forms, History", progress: 80 },
  { topic: "Tags & References in HTML", progress: 60 },
  { topic: "Tables & References in HTML", progress: 24 },
  { topic: "Tables & CSS Basics", progress: 96 },
]

export default function AssessmentDashboard() {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [scores, setScores] = useState({
    rank: 1,
    percentile: 30,
    score: 10,
  })

  const handleUpdateScores = (newScores: { rank: number; percentile: number; score: number }) => {
    setScores(newScores)
  }

  // Calculate the stroke dashoffset for the circular progress
  const radius = 45
  const circumference = radius * 2 * Math.PI
  const progressOffset = circumference - (scores.score / 15) * circumference

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <Image src="/placeholder.svg" alt="HTML5 Logo" width={48} height={48} className="h-12 w-12" />
              <div>
                <h1 className="text-xl font-bold">Hyper Text Markup Language</h1>
                <p className="text-sm text-gray-500">
                  Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsUpdateDialogOpen(true)}
              className="rounded-md bg-blue-700 px-6 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Update
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Quick Stats and Graph */}
          <div className="space-y-8 lg:col-span-2">
            {/* Quick Statistics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-yellow-400"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scores.rank}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Percentile</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-gray-400"
                  >
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scores.percentile}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-green-400"
                  >
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" />
                    <path d="M22 4L12 14.01L9 11.01" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scores.score}/15</div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Comparison Graph</CardTitle>
                <p className="text-sm text-gray-500">
                  You scored {scores.percentile}% percentile which is lower than the average percentile 72% of all the
                  engineers who took this assessment
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={distributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="percentile" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analysis */}
          <div className="space-y-8">
            {/* Syllabus Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Syllabus Wise Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {syllabusData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.topic}</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Question Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Question Analysis</span>
                  <span className="text-blue-600">{scores.score}/15</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="stroke-current text-gray-200"
                        strokeWidth="10"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="stroke-current text-blue-600"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={progressOffset}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-12 w-12 text-red-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    You scored {scores.score} questions correct out of 15. However it still needs some improvements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <UpdateScoresDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onUpdate={handleUpdateScores}
        currentValues={scores}
      />
    </div>
  )
}

