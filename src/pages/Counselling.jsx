import React, { useState } from "react";
import { mentors } from "../data/careerData";

export default function Counselling({ setShowPremiumModal, setSelectedMentor }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page">
      <div className="premium-badge">✦ Premium Feature</div>
      <div className="page-title">Face-to-Face Career Counselling</div>
      <div className="page-sub">Connect with India's top career mentors for live 1-on-1 video sessions. Get personalized guidance beyond what any test can offer.</div>

      <div style={{background:"linear-gradient(135deg, rgba(247,201,72,0.08), rgba(247,201,72,0.02))", border:"1px solid rgba(247,201,72,0.2)", borderRadius:"16px", padding:"24px", marginBottom:"36px", display:"flex", gap:"20px", alignItems:"flex-start", flexWrap:"wrap"}}>
        <div style={{fontSize:"2rem"}}>🌟</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:"6px"}}>Why Choose 1-on-1 Counselling?</div>
          <div style={{color:"var(--muted)",fontSize:"0.9rem",lineHeight:1.6}}>Sometimes a psychometric test isn't enough. Our mentors understand your individual story, family background, budget constraints, and aspirations to give you truly personalized advice. Available via video call, chat, or phone.</div>
        </div>
      </div>

      <div className="tabs">
        {["All Mentors","Engineering & Tech","Medical","Arts & Design","Commerce & Law","Research"].map((t,i)=>(
          <button key={i} className={`tab ${activeTab===i?"active":""}`} onClick={()=>setActiveTab(i)}>{t}</button>
        ))}
      </div>

      <div className="mentors-grid">
        {mentors.map((m,i)=>(
          <div key={i} className="mentor-card">
            <div className="premium-badge">✦ Premium</div>
            <div className="mentor-avatar">{m.avatar}</div>
            <div className="mentor-name">{m.name}</div>
            <div className="mentor-role">{m.role}</div>
            <div className="mentor-exp">{m.exp}</div>
            <div className="mentor-tags">{m.tags.map((t,j)=><span key={j} className="mentor-tag">{t}</span>)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
              <div className="college-rating">★ {m.rating}</div>
              <span style={{fontSize:"0.8rem",color:"var(--accent3)"}}>{m.slots} slots left</span>
            </div>
            <button className="mentor-btn" onClick={()=>{setSelectedMentor(m);setShowPremiumModal(true);}}>Book Session — ₹799</button>
          </div>
        ))}
      </div>

      <div style={{marginTop:"40px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"16px",padding:"28px"}}>
        <div className="section-label">How It Works</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px",marginTop:"16px"}}>
          {[
            {n:"1",title:"Choose Your Mentor",desc:"Browse profiles, read reviews, and pick the mentor best suited to your career questions."},
            {n:"2",title:"Book a Slot",desc:"Select a date & time that works for you. Sessions are 45 minutes each."},
            {n:"3",title:"Attend Video Session",desc:"Join via our secure video platform. No downloads needed — works in browser."},
            {n:"4",title:"Get Your Roadmap",desc:"Receive a personalised PDF roadmap with action steps after your session."},
          ].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:"14px",alignItems:"flex-start"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"rgba(108,99,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,color:"var(--accent)",flexShrink:0}}>{s.n}</div>
              <div><div style={{fontWeight:600,marginBottom:"4px"}}>{s.title}</div><div style={{fontSize:"0.82rem",color:"var(--muted)",lineHeight:1.5}}>{s.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}