import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Components

// Auth Pages
import RecruiterAuth from "./pages/Auth/RecruiterAuth";
import CandidateAuth from "./pages/Auth/CandidateAuth";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";

// Dashboard Pages (you'll need to create these)
import CandidateDashboard from "./pages/Dashboards/CandidateDashboard";
import RecruiterDashboard from "./pages/Dashboards/RecruiterDashboard";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import HomePage from "./pages/Home";
import GuestRoute from "./components/GuestRoute";
import JobDetailPage from "./pages/Recruiter/Jobs/jobDetails/page";
import Jobs from "./pages/Recruiter/Jobs/page";
import DashboardPage from "./pages/Recruiter/dashboard/page";
import RecruiterLayout from "./components/DashboardLayout/RecruiterLayout";
import Candidates from "./pages/Recruiter/candidates/Candidates";
import Interviews from "./pages/Recruiter/interviews/Interviews";
import Analytics from "./pages/Recruiter/analytics/Analytics";
import Reports from "./pages/Recruiter/reports/Reports";
import Settings from "./pages/Recruiter/settings/Settings";
import Help from "./pages/Recruiter/help/Help";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <div className="background-image"></div>
          <div className="background-overly"></div> */}

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            
            {/* Auth Routes */}
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Guest Routes */}
            <Route
              path="/recruiter/auth"
              element={
                <GuestRoute>
                  <RecruiterAuth />
                </GuestRoute>
              }
            />
            <Route
              path="/candidate/auth"
              element={
                <GuestRoute>
                  <CandidateAuth />
                </GuestRoute>
              }
            />

            {/* Recruiter Dashboard Routes */}
            <Route element={
          <PrivateRoute requiredRole="recruiter">
            <RecruiterLayout />
          </PrivateRoute>
        }>
          <Route path="/recruiter/dashboard" element={<DashboardPage />} />
            <Route path="/recruiter/jobs" element={<Jobs />} />
            <Route path="/recruiter/candidates" element={<Candidates />} />
            <Route path="/recruiter/interviews" element={<Interviews />} />
            <Route path="/recruiter/analytics" element={<Analytics />} />
            <Route path="/recruiter/reports" element={<Reports />} />
            <Route path="/recruiter/settings" element={<Settings />} />
            <Route path="/recruiter/help" element={<Help />} />
            <Route path="/recruiter/jobs/:id" element={<JobDetailPage />} />
           
            </Route>

            {/* Candidate Dashboard Routes */}
            <Route
              path="/candidate/dashboard"
              element={
                <PrivateRoute requiredRole="candidate">
                  <CandidateDashboard />
                </PrivateRoute>
              }
            >
             
            </Route>

        <Route path="/recruiter/*" element={<RecruiterDashboard />} /> 
            <Route path="/candidate/*" element={<CandidateDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
