import React, { useState } from "react";
import { notifications } from "../data/careerData";

export default function Notifications({ setShowPremiumModal }) {
  const [notifFilter, setNotifFilter] = useState("all");

  const filteredNotifs = notifications.filter(n =>
    notifFilter === "all" ? true :
    notifFilter === "exam" ? n.type === "exam" :
    notifFilter === "intern" ? n.type === "intern" : true
  );

  return (
    <div className="page">
      <div className="page-title">Exam & Internship Alerts</div>
      <div className="page-sub">Stay ahead with real-time notifications for competitive exams, application deadlines, and internship opportunities.</div>

      <div className="tabs">
        {[["all","All Alerts"],["exam","Entrance Exams"],["intern","Internship Alerts"]].map(([v,l],i)=>(
          <button key={i} className={`tab ${notifFilter===v?"active":""}`} onClick={()=>setNotifFilter(v)}>{l}</button>
        ))}
      </div>

      <div className="notif-list">
        {filteredNotifs.map((n,i)=>(
          <div key={i} className="notif-item">
            <div className="notif-icon" style={{background: n.type==="intern"?"rgba(67,229,200,0.1)":n.urgent?"rgba(255,101,132,0.1)":"rgba(108,99,255,0.1)"}}>
              {n.icon}
            </div>
            <div className="notif-content">
              <div className="notif-title">{n.title}</div>
              <div className="notif-desc">{n.desc}</div>
              <div className="notif-meta">
                {n.tags.map((t,j)=><span key={j} className={`notif-tag ${n.type==="intern"?"tag-intern":n.urgent?"tag-urgent":"tag-exam"}`}>{t}</span>)}
                {n.urgent && <span className="notif-tag tag-urgent">⚡ Urgent</span>}
                <span className="notif-date">📅 {n.date}</span>
              </div>
            </div>
            <button className="btn-secondary" style={{padding:"8px 16px",fontSize:"0.8rem",flexShrink:0}} onClick={()=>setShowPremiumModal(true)}>Remind Me</button>
          </div>
        ))}
      </div>

      <div style={{marginTop:"36px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"16px",padding:"28px",textAlign:"center"}}>
        <div style={{fontSize:"2rem",marginBottom:"12px"}}>🔔</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.2rem",marginBottom:"8px"}}>Never Miss a Deadline</div>
        <div style={{color:"var(--muted)",fontSize:"0.9rem",marginBottom:"20px"}}>Get personalised alerts based on your stream, class, and preferred career fields. Premium members get SMS + WhatsApp notifications.</div>
        <button className="btn-primary" onClick={()=>setShowPremiumModal(true)}>Enable Smart Alerts — Premium</button>
      </div>
    </div>
  );
}