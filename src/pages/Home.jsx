import React from "react";

export default function Home({ setPage, setShowPremiumModal }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge"><span className="hero-badge-dot"/>India's #1 Student Career Platform</div>
          <h1>Find Your <em>Perfect</em><br/>Career <span className="hl2">Path</span></h1>
          <p>Psychometric tests, expert mentors, exam notifications, college guides, and free courses — everything a student from Class 9 to College needs in one place.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>setPage("psychometric")}>Take Career Test →</button>
            <button className="btn-secondary" onClick={()=>setPage("counselling")}>Talk to Mentor</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">1.2M+</div><div className="stat-label">Students Guided</div></div>
            <div className="stat"><div className="stat-num">200+</div><div className="stat-label">Expert Mentors</div></div>
            <div className="stat"><div className="stat-num">98%</div><div className="stat-label">Satisfaction Rate</div></div>
            <div className="stat"><div className="stat-num">50+</div><div className="stat-label">Free Courses</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orbit-ring"><div className="orbit-dot"/></div>
          <div className="orbit-ring"><div className="orbit-dot"/></div>
          <div className="orbit-ring"><div className="orbit-dot"/></div>
          <div className="orbit-center">🎯</div>
        </div>
      </section>

      {/* Features */}
      <section className="page" style={{paddingTop:"40px"}}>
        <div className="section">
          <div className="section-label">What We Offer</div>
          <div className="section-title">Everything You Need<br/>to Succeed</div>
          <div className="section-sub">From discovering your strengths to landing your dream internship — Career Compass has you covered at every stage.</div>
          <div className="cards-grid">
            {[
              {icon:"🧠",title:"Psychometric Test",desc:"Science-backed assessments to discover your personality type and best-fit careers based on your strengths.",page:"psychometric"},
              {icon:"👨‍💼",title:"Face-to-Face Counselling",desc:"Connect live with experienced career mentors who guide you personally. Premium feature with real impact.",page:"counselling",premium:true},
              {icon:"🔔",title:"Exam Notifications",desc:"Never miss a deadline. Real-time alerts for JEE, NEET, CLAT, CAT and 50+ other competitive exams.",page:"notifications"},
              {icon:"🎓",title:"College Guide",desc:"Discover top colleges by stream, get rankings, and know when to apply for the best chances of selection.",page:"college"},
              {icon:"💼",title:"Internship Alerts",desc:"Smart month-by-month internship calendar showing the best windows to apply and which companies are hiring.",page:"college",premium:true},
              {icon:"📚",title:"Free Courses",desc:"Curated learning paths from top providers. Subject-specific courses from Class 9 through College.",page:"courses"},
            ].map((f,i) => (
              <div key={i} className="card" onClick={()=>f.premium ? setShowPremiumModal(true) : setPage(f.page)}>
                {f.premium && <div className="premium-badge">✦ Premium</div>}
                <div className="card-icon">{f.icon}</div>
                <div className="card-title">{f.title}</div>
                <div className="card-desc">{f.desc}</div>
                <div className="card-arrow">{f.premium?"⭐":"→"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* For whom */}
        <div className="section">
          <div className="section-label">Designed For</div>
          <div className="section-title">Students at Every Stage</div>
          <div className="cards-grid-3">
            {[
              {icon:"📓",title:"Class 9 & 10 Students",desc:"Explore career streams early. Understand your interests with our beginner-friendly psychometric tests and build a foundation.",bg:"rgba(108,99,255,0.06)"},
              {icon:"📗",title:"Class 11 & 12 Students",desc:"Choose the right stream, prepare for entrance exams, and get notified about JEE, NEET, CLAT and 50+ entrance tests.",bg:"rgba(67,229,200,0.05)"},
              {icon:"🏫",title:"College Students",desc:"Get internship timing alerts, college suggestions, exam notifications for CAT/UPSC/GATE, and premium premium courses.",bg:"rgba(247,201,72,0.05)"},
            ].map((s,i)=>(
              <div key={i} className="card" style={{background:`var(--surface)`,borderColor:"var(--border)"}}>
                <div className="card-icon" style={{background:s.bg,fontSize:"1.8rem"}}>{s.icon}</div>
                <div className="card-title">{s.title}</div>
                <div className="card-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <div style={{background:"linear-gradient(135deg, rgba(108,99,255,0.12), rgba(67,229,200,0.06))", border:"1px solid rgba(108,99,255,0.25)", borderRadius:"20px", padding:"44px", textAlign:"center"}}>
          <div className="premium-badge" style={{justifyContent:"center",display:"inline-flex"}}>✦ Premium Membership</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.5rem,3vw,2.2rem)",letterSpacing:"-1px",marginBottom:"10px"}}>Unlock Your Full Potential</h2>
          <p style={{color:"var(--muted)",marginBottom:"28px",maxWidth:"480px",margin:"0 auto 28px"}}>Face-to-face counselling, internship alerts, premium courses, and personalized roadmaps — all for one price.</p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-primary" onClick={()=>setShowPremiumModal(true)}>Get Premium — ₹499/month</button>
            <button className="btn-secondary" onClick={()=>setShowPremiumModal(true)}>See All Features</button>
          </div>
        </div>
      </section>
    </div>
  );
}