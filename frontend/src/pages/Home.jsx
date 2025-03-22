"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

const Home = () => {
  // Slider functionality
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef(null)

  // Pricing toggle state
  const [billingCycle, setBillingCycle] = useState("annually")

  // Slider data
  const slides = [
    {
      id: 1,
      title: "Find Your Dream Job",
      subtitle: "Connect with top employers looking for talent like you",
      userType: "candidate",
      svg: (
        <div className="relative z-30 hidden md:block">
          {/* Person looking at job listings */}
          <svg width="400" height="300" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="100" y="80" width="200" height="240" rx="10" fill="#f0f4ff" />
            <rect x="120" y="110" width="160" height="20" rx="4" fill="#d1dafe" />
            <rect x="120" y="140" width="160" height="20" rx="4" fill="#d1dafe" />
            <rect x="120" y="170" width="160" height="20" rx="4" fill="#d1dafe" />
            <rect x="120" y="200" width="160" height="20" rx="4" fill="#d1dafe" />
            <rect x="120" y="230" width="160" height="20" rx="4" fill="#d1dafe" />
            <rect x="120" y="260" width="160" height="20" rx="4" fill="#d1dafe" />

            {/* Person */}
            <circle cx="400" cy="180" r="50" fill="#6366f1" />
            <rect x="380" y="240" width="40" height="80" rx="10" fill="#6366f1" />
            <rect x="350" y="260" width="30" height="10" rx="5" fill="#6366f1" transform="rotate(-30 350 260)" />
            <rect x="420" y="260" width="30" height="10" rx="5" fill="#6366f1" transform="rotate(30 420 260)" />

            {/* Magnifying glass */}
            <circle cx="330" cy="150" r="25" stroke="#4f46e5" strokeWidth="8" fill="none" />
            <line x1="350" y1="170" x2="370" y2="190" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      ),
      background: (
        <div className="absolute inset-0 z-0">
          {/* Gradient background with animated particles */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800"></div>

          {/* Animated particles/circles */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div
              className="absolute h-32 w-32 rounded-full bg-blue-400 blur-xl animate-float"
              style={{ top: "15%", left: "10%", animationDelay: "0s" }}
            ></div>
            <div
              className="absolute h-48 w-48 rounded-full bg-indigo-500 blur-xl animate-float"
              style={{ top: "50%", left: "15%", animationDelay: "1s" }}
            ></div>
            <div
              className="absolute h-36 w-36 rounded-full bg-purple-400 blur-xl animate-float"
              style={{ top: "25%", right: "15%", animationDelay: "2s" }}
            ></div>
            <div
              className="absolute h-24 w-24 rounded-full bg-pink-400 blur-xl animate-float"
              style={{ bottom: "20%", right: "20%", animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yIDJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Hire Top Talent",
      subtitle: "Find the perfect candidates for your open positions",
      userType: "recruiter",
      svg: (
        <div className="relative z-30 hidden md:block">
          {/* Resume/CV documents */}
          <svg width="400" height="300" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="120" y="80" width="150" height="200" rx="10" fill="#f0f4ff" />
            <rect x="140" y="100" width="110" height="15" rx="4" fill="#d1dafe" />
            <rect x="140" y="125" width="110" height="10" rx="4" fill="#d1dafe" />
            <rect x="140" y="145" width="110" height="10" rx="4" fill="#d1dafe" />
            <rect x="140" y="165" width="110" height="10" rx="4" fill="#d1dafe" />
            <rect x="140" y="185" width="110" height="10" rx="4" fill="#d1dafe" />
            <rect x="140" y="205" width="110" height="10" rx="4" fill="#d1dafe" />
            <rect x="140" y="225" width="110" height="10" rx="4" fill="#d1dafe" />
            <rect x="140" y="245" width="110" height="10" rx="4" fill="#d1dafe" />

            {/* Second resume slightly offset */}
            <rect x="150" y="100" width="150" height="200" rx="10" fill="#e0e7ff" />
            <rect x="170" y="120" width="110" height="15" rx="4" fill="#c7d2fe" />
            <rect x="170" y="145" width="110" height="10" rx="4" fill="#c7d2fe" />
            <rect x="170" y="165" width="110" height="10" rx="4" fill="#c7d2fe" />
            <rect x="170" y="185" width="110" height="10" rx="4" fill="#c7d2fe" />
            <rect x="170" y="205" width="110" height="10" rx="4" fill="#c7d2fe" />
            <rect x="170" y="225" width="110" height="10" rx="4" fill="#c7d2fe" />
            <rect x="170" y="245" width="110" height="10" rx="4" fill="#c7d2fe" />
            <rect x="170" y="265" width="110" height="10" rx="4" fill="#c7d2fe" />

            {/* Recruiter figure */}
            <circle cx="400" cy="180" r="50" fill="#6366f1" />
            <rect x="380" y="240" width="40" height="80" rx="10" fill="#6366f1" />
            <rect x="350" y="260" width="30" height="10" rx="5" fill="#6366f1" transform="rotate(-30 350 260)" />
            <rect x="420" y="260" width="30" height="10" rx="5" fill="#6366f1" transform="rotate(30 420 260)" />

            {/* Checkmark/selection */}
            <circle cx="350" cy="130" r="25" fill="#4f46e5" />
            <path
              d="M340 130 L350 140 L370 120"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
      background: (
        <div className="absolute inset-0 z-0">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900"></div>

          {/* Geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <polygon points="0,100 100,0 100,100" fill="url(#grad1)" />
              <circle cx="80" cy="20" r="15" fill="#a78bfa" fillOpacity="0.1" />
              <circle cx="15" cy="85" r="25" fill="#8b5cf6" fillOpacity="0.1" />
            </svg>
          </div>

          {/* Animated dots */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-white opacity-30 animate-pulse"></div>
            <div
              className="absolute top-1/3 left-1/2 h-2 w-2 rounded-full bg-white opacity-30 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-2/3 left-1/3 h-2 w-2 rounded-full bg-white opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-3/4 h-2 w-2 rounded-full bg-white opacity-30 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-3/4 left-1/5 h-2 w-2 rounded-full bg-white opacity-30 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] opacity-10"></div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Streamlined Hiring Process",
      subtitle: "Our platform makes recruitment simple and efficient",
      userType: "both",
      svg: (
        <div className="relative z-30 hidden md:block">
          {/* Process flow diagram */}
          <svg width="400" height="300" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="200" r="40" fill="#e0e7ff" stroke="#6366f1" strokeWidth="4" />
            <circle cx="300" cy="200" r="40" fill="#e0e7ff" stroke="#6366f1" strokeWidth="4" />
            <circle cx="450" cy="200" r="40" fill="#e0e7ff" stroke="#6366f1" strokeWidth="4" />

            {/* Connecting arrows */}
            <path d="M190 200 L260 200" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            <path d="M340 200 L410 200" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            <path
              d="M255 190 L260 200 L255 210"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M405 190 L410 200 L405 210"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Icons inside circles */}
            <rect x="135" y="185" width="30" height="30" rx="5" fill="#6366f1" />
            <path d="M290 190 L310 210 M290 210 L310 190" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            <path d="M440 190 L460 210 M440 210 L460 190" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />

            {/* Document with checkmark */}
            <rect x="250" y="100" width="100" height="120" rx="10" fill="#f0f4ff" />
            <rect x="270" y="120" width="60" height="10" rx="4" fill="#d1dafe" />
            <rect x="270" y="140" width="60" height="10" rx="4" fill="#d1dafe" />
            <rect x="270" y="160" width="60" height="10" rx="4" fill="#d1dafe" />
            <rect x="270" y="180" width="60" height="10" rx="4" fill="#d1dafe" />

            {/* Efficiency gear */}
            <circle cx="400" cy="120" r="30" fill="#4f46e5" />
            <circle cx="400" cy="120" r="15" fill="#e0e7ff" />
            <path
              d="M400 90 L400 95 M428 120 L423 120 M400 150 L400 145 M372 120 L377 120 M421 99 L417 103 M421 141 L417 137 M379 141 L383 137 M379 99 L383 103"
              stroke="#e0e7ff"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
      background: (
        <div className="absolute inset-0 z-0">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>

          {/* Flowing wave pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="rgba(59, 130, 246, 0.2)"
                fillOpacity="0.2"
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
              <path
                fill="rgba(59, 130, 246, 0.2)"
                fillOpacity="0.1"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,176C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          {/* Connected dots pattern */}
          <div className="absolute inset-0">
            <svg className="absolute h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="connectGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="white" />
                  <circle cx="0" cy="50" r="1" fill="white" />
                  <circle cx="100" cy="50" r="1" fill="white" />
                  <circle cx="50" cy="0" r="1" fill="white" />
                  <circle cx="50" cy="100" r="1" fill="white" />
                  <line x1="50" y1="50" x2="0" y2="50" stroke="white" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="0" stroke="white" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#connectGrid)" />
            </svg>
          </div>

          {/* Subtle radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-blue-900/30"></div>
        </div>
      ),
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    // Auto-advance slides
    slideInterval.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [currentSlide])

  // How it works data
  const howItWorks = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up as a recruiter or candidate in just a few minutes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
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
    },
    {
      id: 2,
      title: "Post or Find Jobs",
      description: "Recruiters post jobs, candidates find opportunities that match their skills",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
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
    },
    {
      id: 3,
      title: "Connect & Interview",
      description: "Schedule interviews and communicate directly through our platform",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Hire & Get Hired",
      description: "Complete the hiring process and start your new professional journey",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
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
    },
  ]

  // Why choose us data
  const whyChooseUs = [
    {
      id: 1,
      title: "Smart Matching Algorithm",
      description: "Our AI-powered system connects the right candidates with the right jobs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Verified Employers",
      description: "All companies on our platform are thoroughly vetted for legitimacy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
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
    },
    {
      id: 3,
      title: "Dedicated Support",
      description: "Our team is available 24/7 to assist with any questions or issues",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security measures",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Transparent Process",
      description: "Clear communication and updates throughout the hiring journey",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Global Opportunities",
      description: "Access to jobs and talent from around the world",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
    },
  ]

  // Stats data
  const stats = [
    { id: 1, value: "10K+", label: "Jobs Posted" },
    { id: 2, value: "25K+", label: "Candidates" },
    { id: 3, value: "5K+", label: "Companies" },
    { id: 4, value: "95%", label: "Success Rate" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Background blur elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
        <div className="absolute top-20 right-20 h-80 w-80 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 h-60 w-60 rounded-full bg-pink-200 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/3 h-60 w-60 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
      </div>

      <Header />

      {/* Hero Slider */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background */}
            {slide.background}

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{slide.title}</h1>
                    <p className="mb-8 text-base md:text-lg text-gray-200">{slide.subtitle}</p>
                    <div className="flex flex-wrap gap-4">
                      {slide.userType === "candidate" || slide.userType === "both" ? (
                        <Link
                          to="/candidate/auth"
                          className="group relative overflow-hidden rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl"
                        >
                          <span className="relative z-10">Find Jobs</span>
                          <span className="absolute bottom-0 left-0 h-full w-0 bg-indigo-800 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      ) : null}
                      {slide.userType === "recruiter" || slide.userType === "both" ? (
                        <Link
                          to="/recruiter/auth"
                          className="group relative overflow-hidden rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
                        >
                          <span className="relative z-10">Post Jobs</span>
                          <span className="absolute bottom-0 right-0 h-full w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  {/* SVG Illustration */}
                  <div className="hidden md:flex justify-center items-center ">{slide.svg}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <button
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
          onClick={prevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
          onClick={nextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider indicators */}
        <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-10 bg-indigo-500" : "w-3 bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
          <div className="relative z-10 -mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/10 transition-transform duration-300 group-hover:scale-150"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-indigo-600 md:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">How It Works</h2>
            <div className="mx-auto h-1.5 w-20 rounded-full bg-indigo-600"></div>
            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600">
              Our platform makes the recruitment process simple and efficient for both employers and job seekers
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-indigo-100 md:block"></div>

            <div className="grid gap-12 md:grid-cols-2">
              {howItWorks.map((step, index) => (
                <div key={step.id} className={`relative ${index % 2 === 1 ? "md:mt-32" : ""}`}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/5 transition-transform duration-300 group-hover:scale-150"></div>
                    <div className="relative">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                        {step.icon}
                      </div>
                      <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <div className="absolute -left-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                      {step.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="absolute inset-0 skew-y-6 transform bg-indigo-600/5"></div>
        <div className="relative mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Why Choose ProHire</h2>
            <div className="mx-auto h-1.5 w-20 rounded-full bg-indigo-600"></div>
            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600">
              We're committed to providing the best experience for both recruiters and candidates
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((feature) => (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/5 transition-transform duration-300 group-hover:scale-150"></div>
                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
          <div className="text-center">
            <div className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
              Transparent pricing
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">Plans and Pricing</h2>
            <p className="mt-4 text-gray-600">Receive unlimited credits when you pay yearly and save on your plan.</p>
          </div>

          {/* Billing toggle */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-gray-100 p-1">
              <button
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                  billingCycle === "annually" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setBillingCycle("annually")}
              >
                Bill annually
              </button>
              <button
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                  billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Bill monthly
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Free Plan */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
              <p className="mt-1 text-sm text-gray-500">Great for occasional recruiting</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">$0</span>
                <span className="text-sm text-gray-500">{billingCycle === "annually" ? "/year" : "/month"}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Free forever</p>
              <div className="mt-6">
                <Link
                  to="/signup"
                  className="block w-full rounded-lg border border-indigo-600 bg-white px-4 py-2 text-center text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                >
                  Get started
                </Link>
              </div>
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium text-gray-900">What's included:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>1 job posting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Basic candidate search</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Email support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Basic Plan */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Basic</h3>
              <p className="mt-1 text-sm text-gray-500">For small businesses and startups</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">${billingCycle === "annually" ? "83" : "99"}</span>
                <span className="text-sm text-gray-500">{billingCycle === "annually" ? "/year" : "/month"}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {billingCycle === "annually" ? "Billed at $996 per year" : "Billed monthly"}
              </p>
              <div className="mt-6">
                <Link
                  to="/signup"
                  className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </div>
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium text-gray-900">What's included:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>5 job postings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Advanced candidate matching</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Resume export tools</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Email & chat support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="relative rounded-2xl border-2 border-indigo-600 bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Premium</h3>
              <p className="mt-1 text-sm text-gray-500">For growing businesses and teams</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">${billingCycle === "annually" ? "166" : "199"}</span>
                <span className="text-sm text-gray-500">{billingCycle === "annually" ? "/year" : "/month"}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {billingCycle === "annually" ? "Billed at $1992 per year" : "Billed monthly"}
              </p>
              <div className="mt-6">
                <Link
                  to="/signup"
                  className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </div>
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium text-gray-900">What's included:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Unlimited job postings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>AI-powered candidate matching</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Priority 24/7 support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
          <p className="mb-8 text-center text-sm font-medium text-gray-500">
          Trusted by 100+ companies to power modern recruitment and unlock exceptional talent
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg?height=30&width=120"
              alt="LinkedIn"
              className="h-8 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Indeed_logo.svg?height=30&width=120"
              alt="Indeed"
              className="h-8 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Glassdoor_Logo_2023.svg?height=30&width=120"
              alt="Glassdoor"
              className="h-8 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Monster.com_Logo_2019.svg?height=30&width=120"
              alt="Monster"
              className="h-8 object-contain"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-indigo-50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
            Start your hiring journey
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Join for free today</h2>
          <p className="mt-4 text-gray-600">
            Connect with top talent or find your dream job with our powerful platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <svg className="mr-2 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Free trial available</span>
            </div>
            <div className="flex items-center">
              <svg className="mr-2 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center">
              <svg className="mr-2 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to="/recruiter/auth"
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
            >
              For Recruiters
            </Link>
            <Link
              to="/candidate/auth"
              className="w-full rounded-lg border border-indigo-600 bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50 sm:w-auto"
            >
              For Candidates
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home

