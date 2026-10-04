import React, { useState } from "react";
import { courses } from "../data/careerData";

export default function Courses({ setShowPremiumModal }) {
  const [courseFilter, setCourseFilter] = useState("all");

  const filteredCourses = courses.filter(c =>
    courseFilter === "all" ? true :
    courseFilter === "free" ? c.type === "free" :
    courseFilter === "premium" ? c.type === "premium" : true
  );

  return (
    <div className="page">
      <div className="page-title">Learning Resources</div>
      <div className="page-sub">Handpicked free and premium courses from top providers to help every student excel in their subjects and build career skills.</div>

      <div className="tabs">
        {[["all","All Courses"],["free","Free Courses"],["premium","Premium Courses"]].map(([v,l],i)=>(
          <button key={i} className={`tab ${courseFilter===v?"active":""}`} onClick={()=>setCourseFilter(v)}>{l}</button>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.map((c,i)=>(
          <div key={i} className="course-card">
            <div className="course-thumb" style={{background:c.color}}>{c.emoji}</div>
            <div className="course-body">
              {c.type==="premium" && <div className="premium-badge">✦ Premium</div>}
              <div className="course-provider">{c.provider}</div>
              <div className="course-title">{c.title}</div>
              <div className="course-meta">
                <span>⏱ {c.duration}</span>
                <span>📚 {c.level}</span>
              </div>
              <div className="course-footer">
                <span className="course-level" style={{background:c.levelColor,color:c.levelTextColor}}>{c.level}</span>
                <button
                  className={`course-btn ${c.type==="premium"?"premium-btn":""}`}
                  onClick={()=>c.type==="premium"?setShowPremiumModal(true):null}
                >
                  {c.type==="premium"?"Unlock":"Enroll Free"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}