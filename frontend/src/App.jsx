import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Components
import Header from "./components/Header/Header";
import RecruiterHero from "./components/Hero/RecruiterHero";
import CandidateHero from "./components/Hero/CandidateHero";
import HowItsWork from "./components/How Its Work/HowItsWork";

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
import GuestRoute from "./components/GuestRoute";
import JobDetailPage from "./pages/Recruiter/Jobs/[id]/page";
import Jobs from "./pages/Recruiter/Jobs/page";

function Home() {
  return (
    <>
      <Header />

      <Swiper
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, EffectFade]}
      >
        <SwiperSlide>
          <RecruiterHero />
        </SwiperSlide>
        <SwiperSlide>
          <CandidateHero />
        </SwiperSlide>
      </Swiper>
      <HowItsWork />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="background-image"></div>
          <div className="background-overly"></div>

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
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
            <Route
              path="/recruiter/"
              element={
                <PrivateRoute requiredRole="recruiter">
                  <RecruiterDashboard />
                </PrivateRoute>
              }
            >
              <Route path="jobs" element={<Jobs />} />
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
