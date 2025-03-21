"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats] = useState([
    {
      title: "Active Jobs",
      value: "12",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      color: "bg-blue-100 text-blue-700",
      change: "+2 this week",
      positive: true,
    },
    {
      title: "Total Candidates",
      value: "248",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      color: "bg-green-100 text-green-700",
      change: "+18 this month",
      positive: true,
    },
    {
      title: "Interviews This Week",
      value: "18",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      color: "bg-purple-100 text-purple-700",
      change: "+5 from last week",
      positive: true,
    },
    {
      title: "Hiring Rate",
      value: "68%",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      color: "bg-amber-100 text-amber-700",
      change: "-2% from last month",
      positive: false,
    },
  ])

  const [activities] = useState([
    {
      id: 1,
      type: "application",
      title: "Sarah Johnson applied for Senior UX Designer",
      time: "2 hours ago",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      color: "bg-blue-100 text-blue-700",
      link: "/candidates/sarah-johnson",
    },
    {
      id: 2,
      type: "hired",
      title: "Michael Brown was hired for Frontend Developer",
      time: "Yesterday",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      color: "bg-green-100 text-green-700",
      link: "/candidates/michael-brown",
    },
    {
      id: 3,
      type: "interview",
      title: "Interview scheduled with David Wilson for Product Manager",
      time: "2 days ago",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      color: "bg-purple-100 text-purple-700",
      link: "/interviews/david-wilson",
    },
    {
      id: 4,
      type: "job",
      title: "New job posted: Marketing Specialist",
      time: "3 days ago",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      color: "bg-amber-100 text-amber-700",
      link: "/jobs/marketing-specialist",
    },
  ])

  const [upcomingInterviews] = useState([
    {
      id: 1,
      candidate: "Emily Parker",
      position: "UX Designer",
      date: "Today",
      time: "2:00 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EP",
    },
    {
      id: 2,
      candidate: "James Wilson",
      position: "Frontend Developer",
      date: "Tomorrow",
      time: "10:30 AM",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
    },
    {
      id: 3,
      candidate: "Sophia Lee",
      position: "Product Manager",
      date: "May 25, 2023",
      time: "3:15 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SL",
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your recruiter dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <div className={`rounded-full p-2 ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={`ml-2 text-xs ${stat.positive ? "text-green-600" : "text-red-600"}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h2 className="font-semibold">Recent Activity</h2>
            <button
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              onClick={() => navigate("/activity")}
            >
              View all
            </button>
          </div>
          <div className="divide-y">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-4 transition-colors hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(activity.link)}
              >
                <div className={`mt-0.5 rounded-full p-2 ${activity.color}`}>{activity.icon}</div>
                <div>
                  <p className="text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h2 className="font-semibold">Upcoming Interviews</h2>
            <button
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              onClick={() => navigate("/interviews")}
            >
              View all
            </button>
          </div>
          <div className="divide-y">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview.id}
                className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/interviews/${interview.id}`)}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                  {interview.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{interview.candidate}</p>
                    <div className="flex items-center gap-1">
                      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">{interview.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{interview.position}</p>
                    <p className="text-xs font-medium">{interview.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

