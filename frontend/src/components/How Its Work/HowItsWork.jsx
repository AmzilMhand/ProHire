import React from "react";
import { FaFilePdf, FaSearchengin } from "react-icons/fa6";
import { VscGitStashApply } from "react-icons/vsc";
import { GiDiscussion } from "react-icons/gi";
import { TbProgressCheck } from "react-icons/tb";

import "./HowItsWork.css";
export default function HowItsWork() {
  return (
    <div className="how-it-works">
      <div className="title">
        <h2>How Its Work</h2>
        <p>Your Path to Success in 4 Simple Steps</p>
      </div>
      <div className="steps">
        <div className="step">
          <h3>Find Jobs</h3>
          <p>
            Explore thousands of roles tailored to your skills and preferences.
          </p>
          <FaSearchengin />
        </div>
        <div className="step">
          <h3>Apply & Upload CV</h3>
          <p>
            Upload your CV or create a profile to apply in just a few clicks.
          </p>
          <VscGitStashApply />
        </div>
        <div className="step">
          <h3>Take Interviews </h3>
          <p>
            Schedule and attend interviews with top employers directly on
            ProHire.
          </p>
          <GiDiscussion />
        </div>
        <div className="step">
          <h3>Track Progress </h3>
          <p>Monitor your application status and receive real-time updates.</p>
          <TbProgressCheck />
        </div>
      </div>
    </div>
  );
}
