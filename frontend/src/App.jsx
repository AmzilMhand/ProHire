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
            <Route path="/recruiter/auth" element={<RecruiterAuth />} />
            <Route path="/candidate/auth" element={<CandidateAuth />} />
            
            {/* Email verification and password reset */}
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/candidate/reset-password/:token" element={<ResetPassword />} />
            <Route path="/recruiter/reset-password/:token" element={<ResetPassword />} />
            
            {/* Protected Routes - Candidate */}
            <Route 
              path="/candidate/dashboard" 
              element={
                <PrivateRoute requiredRole="candidate">
                  <CandidateDashboard />
                </PrivateRoute>
              } 
            />
            
            {/* Protected Routes - Recruiter */}
            <Route 
              path="/recruiter/dashboard" 
              element={
                <PrivateRoute requiredRole="recruiter">
                  <RecruiterDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;