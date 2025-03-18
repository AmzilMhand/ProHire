import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";

import "./CandidateHero.css";
import { Link } from "react-router-dom";
export default function CandidateHero() {
  return (
    <div className="hero">
      <section className="hero-section">
        <div className="hero-panel candidate-panel">
          <div className="panel-content">
            <span className="role-badge candidate-badge">Job Seeker</span>
            <h1 className="panel-heading">Find Your Perfect Career Match</h1>
            <p className="panel-subtitle">
              Access curated job listings, salary insights, and growth
              opportunities tailored to your profile.
            </p>
            <div className="panel-cta-group">
              <Link to="/login" className="cta-button candidate-cta">
                Search Jobs
              </Link>
            </div>
          </div>
          <div className="right-part">
            <DotLottiePlayer  style={{ width: '350px', height: '350px' }} src="candidate.lottie" autoplay loop />
          </div>
        </div>
      </section>
    </div>
  );
}
