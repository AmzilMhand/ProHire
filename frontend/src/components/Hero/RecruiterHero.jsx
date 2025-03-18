import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";

import "./RecruiterHero.css";
import { Link } from "react-router-dom";
export default function RecruiterHero() {
  return (
    <div className="hero">
          <section className="hero-section">
            <div className="hero-panel recruiter-panel">
              <div className="panel-content">
                <span className="role-badge recruiter-badge">Hiring Manager</span>
                <h1 className="panel-heading">Discover Top Talent Faster</h1>
                <p className="panel-subtitle">
                Advanced recruiter matching and AI-powered recruitment tools for smart hiring decisions.
                </p>
                <div className="panel-cta-group">
                <Link to="/login" className="cta-button recruiter-cta">
                Post a Job
                  </Link>
                </div>
              </div>
              <div className="right-part">
                <DotLottiePlayer  src="reqruiter.lottie" autoplay loop />
              </div>
            </div>
          </section>
        </div>
  );
}
