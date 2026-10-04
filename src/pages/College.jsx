import React, { useState } from "react";
import { colleges, internMonths, internTimeline } from "../data/careerData";

export default function College({ setShowPremiumModal }) {
  const [collegeFilter, setCollegeFilter] = useState("all");

  const filteredColleges = colleges.filter(c =>
    collegeFilter === "all" ? true : c.type === collegeFilter
  );

  return (
    <div className="page">
      <div className="page-title">College Guide & Internship Planner</div>
      <div className="page-sub">Discover the best colleges by stream, track internship windows, and get year-wise college tips.</div>

      <div className="tabs">
        {[["all","Top Colleges"],["Engineering","Engineering"],["Medical","Medical"],["Design","Design"],["Management","Management"],["Law","Law"]].map(([v,l],i)=>(
          <button key={i} className={`tab ${collegeFilter===v?"active":""}`} onClick={()=>setCollegeFilter(v)}>{l}</button>
        ))}
      </div>

      <div className="cards-grid" style={{marginBottom:"56px"}}>
        {filteredColleges.map((c,i)=>(
          <div key={i} className="college-card">
            <div className="college-rank">{c.rank}</div>
            <div className="college-name">{c.name}</div>
            <div className="college-loc">📍 {c.loc}</div>
            <div className="college-streams">{c.streams.map((s,j)=><span key={j} className="college-stream">{s}</span>)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div className="college-rating">★ {c.rating} / 5.0</div>
              <button className="btn-secondary" style={{padding:"7px 14px",fontSize:"0.8rem"}} onClick={()=>setShowPremiumModal(true)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Internship Section */}
      <div className="section">
        <div className="premium-badge">✦ Premium Feature</div>
        <div className="section-title">Internship Opportunity Calendar</div>
        <div className="section-sub">Know exactly when to apply for internships each year — broken down by month and opportunity type.</div>

        <div className="intern-months">
          {internMonths.map((m,i)=>(
            <div key={i} className={`intern-month ${m.hot?"hot":m.warm?"warm":""}`}>
              <div className="intern-month-name">{m.m}</div>
              <div className={`intern-month-temp ${m.hot?"temp-hot":m.warm?"temp-warm":"temp-cold"}`}>
                {m.hot?"🔥 HOT":m.warm?"✨ GOOD":"❄️ SLOW"}
              </div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"24px"}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:"16px"}}>Month-by-Month Guide</div>
            <div className="timeline">
              {internTimeline.map((item,i)=>(
                <div key={i} className="timeline-item">
                  <div className={`timeline-dot ${item.type==="green"?"green":item.type==="urgent"?"red":""}`}/>
                  <div className="timeline-month">{item.month}</div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:"16px"}}>Year-Wise Tips for College Students</div>
            {[
              {year:"1st Year",icon:"🌱",tips:["Focus on academics and GPA","Explore clubs, hackathons, events","Build your first GitHub profile","Take 1–2 free online courses"]},
              {year:"2nd Year",icon:"🚀",tips:["Apply for summer internships (Jan–Feb)","Start competitive programming","Attend college tech fests","Begin GATE/CAT/GRE prep research"]},
              {year:"3rd Year",icon:"💼",tips:["Apply for competitive paid internships","Contribute to open source","Build a project portfolio","Attend industry networking events"]},
              {year:"Final Year",icon:"🎓",tips:["Focus on placements (Oct–Dec)","Apply for MBA/MS/PhD abroad","Clear backlogs","Update LinkedIn and resume"]},
            ].map((yr,i)=>(
              <div key={i} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"12px",padding:"18px",marginBottom:"12px"}}>
                <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"10px"}}>
                  <span style={{fontSize:"1.4rem"}}>{yr.icon}</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700}}>{yr.year}</span>
                </div>
                <ul style={{listStyle:"none",display:"grid",gap:"6px"}}>
                  {yr.tips.map((t,j)=><li key={j} style={{fontSize:"0.83rem",color:"var(--muted)",display:"flex",gap:"8px"}}><span style={{color:"var(--accent)"}}>→</span>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}