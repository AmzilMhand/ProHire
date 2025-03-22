import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 flex items-center md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white">
              <span className="font-bold">P</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">ProHire</span>
          </div>
          <div className="text-center text-sm text-gray-500 md:text-right">
            <p>The future of recruiting © 2025 ProHire</p>
            <p className="mt-1">"ProHire is a recruitment & talent acquisition platform."</p>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">For Recruiters</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/post-job" className="text-sm text-gray-600 hover:text-indigo-600">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/find-candidates" className="text-sm text-gray-600 hover:text-indigo-600">
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link to="/employer-branding" className="text-sm text-gray-600 hover:text-indigo-600">
                  Employer Branding
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-indigo-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-indigo-600">
                  Get a demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">For Candidates</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/find-jobs" className="text-sm text-gray-600 hover:text-indigo-600">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/career-resources" className="text-sm text-gray-600 hover:text-indigo-600">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-sm text-gray-600 hover:text-indigo-600">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/salary-guide" className="text-sm text-gray-600 hover:text-indigo-600">
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link to="/job-alerts" className="text-sm text-gray-600 hover:text-indigo-600">
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-indigo-600">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-indigo-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-indigo-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-indigo-600">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-indigo-600">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:hello@prohire.io" className="text-sm text-gray-600 hover:text-indigo-600">
                  contact@prohire.io
                </a>
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">123 Hay Lkhmaiss, LQLIAA, 80000</span>
              </li>
            </ul>

            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer

