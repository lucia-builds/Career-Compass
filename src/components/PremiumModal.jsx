import React from "react";

export default function PremiumModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={()=>onClose()}>
      <div className="modal" style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={()=>onClose()}>✕</button>
        <div style={{fontSize:"2.5rem",marginBottom:"12px",textAlign:"center"}}>✦</div>
        <h2 style={{textAlign:"center"}}>Unlock Career Compass Premium</h2>
        <p style={{textAlign:"center"}}>Get full access to mentors, smart alerts, and premium courses.</p>
        <div style={{display:"grid",gap:"10px",marginBottom:"24px"}}>
          {[
            "✅ Face-to-face video counselling with expert mentors",
            "✅ Smart personalised exam & deadline notifications",
            "✅ Full internship calendar with company-level alerts",
            "✅ 30+ premium subject courses & learning paths",
            "✅ Personalised career roadmap PDF after counselling",
            "✅ College shortlisting service based on your profile",
            "✅ WhatsApp & SMS alerts for urgent deadlines",
          ].map((f,i)=><div key={i} style={{fontSize:"0.875rem",color:"var(--text)",padding:"10px 14px",background:"var(--surface2)",borderRadius:"8px"}}>{f}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"}}>
          {[
            {plan:"Monthly",price:"₹499",per:"/month",color:"var(--accent)"},
            {plan:"Annual",price:"₹3,499",per:"/year",color:"var(--gold)",note:"Save 42%"},
          ].map((p,i)=>(
            <div key={i} style={{padding:"18px",border:`2px solid ${p.color}`,borderRadius:"12px",textAlign:"center",cursor:"pointer",background:`${p.color}10`}}>
              {p.note && <div style={{fontSize:"0.72rem",fontWeight:700,color:p.color,marginBottom:"4px"}}>{p.note}</div>}
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.1rem"}}>{p.plan}</div>
              <div style={{fontSize:"1.6rem",fontWeight:800,color:p.color,fontFamily:"'Syne',sans-serif"}}>{p.price}</div>
              <div style={{fontSize:"0.78rem",color:"var(--muted)"}}>{p.per}</div>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{width:"100%",padding:"14px",fontSize:"1rem"}}>Get Premium Now →</button>
        <div style={{textAlign:"center",marginTop:"10px",fontSize:"0.78rem",color:"var(--muted)"}}>Cancel anytime • Secure payment via Razorpay</div>
      </div>
    </div>
  );
}