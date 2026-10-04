import React, { useState } from "react";
import { psychoQuestions, careerProfiles, profileOrder, scoreColors, ratingLabels } from "../data/careerData";
   import { scoreAnswers, matchCareers } from "../utils/scoring";

const labelStyle = {
  fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)",
  textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px",
};

export default function Psychometric({ setPage }) {
  const [testStarted, setTestStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const total = psychoQuestions.length;

  const handleAnswer = (value) => {
    const next = [...answers];
    next[qIndex] = value;
    setAnswers(next);
  };

  const goNext = () => {
    if (answers[qIndex] === undefined) return;
    if (qIndex < total - 1) setQIndex(qIndex + 1);
    else setResult(scoreAnswers(answers));
  };

  const goPrev = () => { if (qIndex > 0) setQIndex(qIndex - 1); };


  const resetTest = () => {
    setTestStarted(false); setQIndex(0); setAnswers([]); setResult(null);
  };
   const top = result ? careerProfiles[result.top] : null;
     const matches = result ? matchCareers(result.code) : [];

  return (
    <div className="page">
      <div className="page-title">Psychometric Test</div>
      <div className="page-sub">Find out what you enjoy and which careers fit it, using the Holland RIASEC interest model.</div>

      {/* INTRO */}
      {!testStarted && !result && (
        <div>
          <div className="cards-grid" style={{marginBottom:"36px"}}>
            {[
              {icon:"⏱️",label:"30 Questions",sub:"Takes about 8 minutes"},
              {icon:"🔬",label:"Holland RIASEC Model",sub:"A widely used career-interest framework"},
              {icon:"🎯",label:"Your 3-Letter Code",sub:"Your top three interest types"},
              {icon:"📊",label:"Score Breakdown",sub:"See your level for all 6 types"},
            ].map((f,i)=>(
              <div key={i} className="card" style={{cursor:"default"}}>
                <div className="card-icon" style={{fontSize:"1.6rem"}}>{f.icon}</div>
                <div className="card-title">{f.label}</div>
                <div className="card-desc">{f.sub}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div className="section-title" style={{marginBottom:"10px"}}>Ready to Discover Your Path?</div>
            <p style={{color:"var(--muted)",marginBottom:"28px"}}>You will see 30 activities. Rate how much you would enjoy each one. There are no right or wrong answers, so answer honestly.</p>
            <button className="btn-primary" style={{fontSize:"1.05rem",padding:"16px 40px"}} onClick={()=>setTestStarted(true)}>Start the Test →</button>
          </div>
        </div>
      )}

      {/* QUESTIONS */}
      {testStarted && !result && (
        <div className="test-container">
          <div className="test-progress-bar">
            <div className="test-progress-fill" style={{width:`${((qIndex+1)/total)*100}%`}}/>
          </div>
          <div style={{color:"var(--muted)",fontSize:"0.8rem",marginBottom:"20px"}}>Question {qIndex+1} of {total}</div>
          <div style={{color:"var(--muted)",fontSize:"0.9rem",marginBottom:"8px"}}>How much would you enjoy this?</div>
          <div className="test-question">{psychoQuestions[qIndex].q}</div>
          <div className="test-options">
            {ratingLabels.map((label, idx)=>(
              <button key={idx} className={`test-option ${answers[qIndex]===idx+1?"selected":""}`}
                onClick={()=>handleAnswer(idx+1)}>
                <span style={{marginRight:"10px",opacity:0.4}}>{idx+1}</span>{label}
              </button>
            ))}
          </div>
          <div className="test-nav">
            <button className="btn-secondary" style={{padding:"10px 22px",fontSize:"0.9rem"}} onClick={goPrev} disabled={qIndex===0}>← Back</button>
            <span className="test-step">{qIndex+1}/{total}</span>
            <button className="btn-primary" style={{padding:"10px 22px",fontSize:"0.9rem"}} onClick={goNext} disabled={answers[qIndex]===undefined}>
              {qIndex===total-1?"See Results →":"Next →"}
            </button>
          </div>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="test-container">
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{fontSize:"3rem",marginBottom:"10px"}}>{top.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"var(--muted)",marginBottom:"4px"}}>Your Interest Code</div>
            <div className="result-type" style={{letterSpacing:"6px"}}>{result.code}</div>
            <div style={{color:"var(--muted)",fontSize:"0.9rem",marginTop:"6px"}}>
              {result.broad
                ? "Your scores are close together, so treat this code as a rough guide"
                : result.ranked.slice(0,3).map(k=>careerProfiles[k].type).join(" · ")}
            </div>
          </div>

          <div className="result-card">
            {result.broad && (
              <div style={{background:"rgba(247,201,72,0.08)",border:"1px solid rgba(247,201,72,0.25)",borderRadius:"12px",padding:"14px 16px",marginBottom:"20px",fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.6}}>
                Your interests are spread fairly evenly across the types, so no single one stands out. That is common. Use the careers below as ideas to explore, and talk to a mentor or counsellor to narrow them down.
              </div>
            )}

            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.15rem",marginBottom:"8px"}}>
              Strongest type: {top.type} <span style={{color:"var(--muted)",fontWeight:500}}>({top.nickname})</span>
            </div>
            <p className="result-desc">{top.desc}</p>
   <div style={{marginBottom:"24px"}}>
     <div style={labelStyle}>Best Career Matches for {result.code}</div>
     <div className="score-bars">
       {matches.map((m)=>(
         <div key={m.name} className="score-bar-row">
           <div className="score-bar-label">
             <span>{m.name} <span style={{opacity:0.5,fontSize:"0.75rem"}}>{m.code}</span></span>
             <span style={{color:"var(--accent3)",fontWeight:600,fontSize:"0.8rem"}}>{m.level}</span>
           </div>
           <div className="score-bar-track"><div className="score-bar-fill" style={{width:`${m.fit}%`,background:"var(--accent3)"}}/></div>
         </div>
       ))}
     </div>
     <div style={{fontSize:"0.75rem",color:"var(--muted)",marginTop:"10px",lineHeight:1.5}}>
       Matches compare your three letters with the typical interest code of each career. The codes are approximate, so treat this as a starting list to explore.
     </div>
   </div>

            <div style={{marginBottom:"24px"}}>
              <div style={labelStyle}>Best-Fit Streams</div>
              <div className="career-tags">
                {top.streams.map((s,i)=><span key={i} className="career-tag" style={{background:"rgba(67,229,200,0.08)",borderColor:"rgba(67,229,200,0.3)",color:"var(--accent3)"}}>{s}</span>)}
              </div>
            </div>

            {result.ranked.slice(1,3).map((k)=>(
              <div key={k} style={{marginBottom:"20px",paddingTop:"16px",borderTop:"1px solid var(--border)"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:"4px"}}>
                  {careerProfiles[k].icon} Also strong: {careerProfiles[k].type} <span style={{color:"var(--muted)",fontWeight:500}}>({careerProfiles[k].nickname})</span>
                </div>
                <div style={{fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.6,marginBottom:"10px"}}>{careerProfiles[k].desc}</div>
                <div className="career-tags">
                  {careerProfiles[k].careers.slice(0,4).map((c,i)=><span key={i} className="career-tag">{c}</span>)}
                </div>
              </div>
            ))}

            <div style={{marginTop:"8px"}}>
              <div style={{...labelStyle, marginBottom:"12px"}}>Your Interest Level by Type</div>
              <div className="score-bars">
                {result.ranked.map((k)=>{
                  const color = scoreColors[profileOrder.indexOf(k)];
                  return (
                    <div key={k} className="score-bar-row">
                      <div className="score-bar-label"><span>{careerProfiles[k].type}</span><span style={{color,fontWeight:600}}>{result.pct[k]}%</span></div>
                      <div className="score-bar-track"><div className="score-bar-fill" style={{width:`${result.pct[k]}%`,background:color}}/></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{marginTop:"24px",fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.6}}>
              This test shows what you enjoy, not what you are good at or what you must choose. Use it to explore options, and talk to a parent, teacher or counsellor before making big decisions.
            </div>

            <div style={{marginTop:"24px",display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <button className="btn-primary" onClick={()=>setPage("counselling")}>Talk to a Mentor →</button>
              <button className="btn-secondary" onClick={resetTest}>Retake Test</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}