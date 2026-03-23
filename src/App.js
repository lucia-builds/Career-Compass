import { useState, useEffect, useRef } from "react";

const style = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

:root {
  --bg: #07080f;
  --surface: #0e1020;
  --surface2: #161828;
  --border: #ffffff0f;
  --accent: #6c63ff;
  --accent2: #ff6584;
  --accent3: #43e5c8;
  --gold: #f7c948;
  --text: #e8eaf6;
  --muted: #7b82a8;
  --card-glow: rgba(108,99,255,0.08);
}

* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  min-height: 100vh;
}

.app { min-height: 100vh; }

/* NAV */
.nav {
  position: fixed; top:0; left:0; right:0; z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding: 0 6%; height:72px;
  background: rgba(7,8,15,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1.35rem; letter-spacing:-0.5px; }
.nav-logo span { color: var(--accent); }
.nav-tabs { display:flex; gap:6px; }
.nav-tab {
  padding:8px 16px; border-radius:8px; border:none;
  background: transparent; color: var(--muted);
  font-family:'DM Sans',sans-serif; font-size:0.875rem; font-weight:500;
  cursor:pointer; transition:all 0.2s;
}
.nav-tab:hover, .nav-tab.active {
  background: rgba(108,99,255,0.15);
  color: var(--text);
}
.nav-tab.active { color: var(--accent); }
.nav-cta {
  padding:9px 22px; border-radius:10px;
  background: var(--accent); border:none; color:#fff;
  font-family:'DM Sans',sans-serif; font-size:0.875rem; font-weight:600;
  cursor:pointer; transition:all 0.2s;
  box-shadow: 0 0 20px rgba(108,99,255,0.35);
}
.nav-cta:hover { transform:translateY(-1px); box-shadow: 0 4px 28px rgba(108,99,255,0.5); }

/* HERO */
.hero {
  min-height:100vh; display:flex; align-items:center;
  padding: 100px 6% 60px;
  position: relative; overflow:hidden;
}
.hero-bg {
  position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 60% 60% at 70% 50%, rgba(108,99,255,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 20% 80%, rgba(67,229,200,0.07) 0%, transparent 50%),
    radial-gradient(ellipse 30% 30% at 80% 20%, rgba(255,101,132,0.07) 0%, transparent 50%);
}
.hero-grid {
  position:absolute; inset:0; pointer-events:none;
  background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
}
.hero-content { position:relative; max-width:700px; }
.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  padding:6px 14px; border-radius:20px;
  background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.25);
  font-size:0.8rem; font-weight:500; color:var(--accent);
  margin-bottom:28px;
}
.hero-badge-dot {
  width:7px; height:7px; border-radius:50%;
  background:var(--accent); animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
.hero h1 {
  font-family:'Syne',sans-serif; font-weight:800;
  font-size:clamp(2.4rem, 5.5vw, 4.2rem);
  line-height:1.08; letter-spacing:-2px;
  margin-bottom:20px;
}
.hero h1 em { font-style:normal; color:var(--accent); }
.hero h1 .hl2 { color:var(--accent3); }
.hero p { font-size:1.1rem; color:var(--muted); line-height:1.7; max-width:520px; margin-bottom:36px; }
.hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
.btn-primary {
  padding:14px 30px; border-radius:12px;
  background: var(--accent); border:none; color:#fff;
  font-family:'DM Sans',sans-serif; font-size:1rem; font-weight:600;
  cursor:pointer; transition:all 0.25s;
  box-shadow: 0 0 30px rgba(108,99,255,0.4);
}
.btn-primary:hover { transform:translateY(-2px); box-shadow: 0 8px 40px rgba(108,99,255,0.55); }
.btn-secondary {
  padding:14px 30px; border-radius:12px;
  background: transparent; border:1.5px solid var(--border); color:var(--text);
  font-family:'DM Sans',sans-serif; font-size:1rem; font-weight:500;
  cursor:pointer; transition:all 0.25s;
}
.btn-secondary:hover { border-color:rgba(108,99,255,0.4); color:var(--accent); }
.hero-stats { display:flex; gap:40px; margin-top:50px; flex-wrap:wrap; }
.stat { }
.stat-num { font-family:'Syne',sans-serif; font-weight:800; font-size:2rem; color:var(--text); }
.stat-label { font-size:0.82rem; color:var(--muted); margin-top:2px; }
.hero-visual {
  position:absolute; right:6%; top:50%; transform:translateY(-50%);
  width:min(480px, 40vw); height:min(480px, 40vw);
  pointer-events:none;
}
.orbit-ring {
  position:absolute; border-radius:50%;
  border:1px solid rgba(108,99,255,0.2);
}
.orbit-ring:nth-child(1) { inset:0; animation: spin 30s linear infinite; }
.orbit-ring:nth-child(2) { inset:12%; border-color: rgba(67,229,200,0.15); animation: spin 20s linear infinite reverse; }
.orbit-ring:nth-child(3) { inset:28%; border-color: rgba(255,101,132,0.12); animation: spin 15s linear infinite; }
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.orbit-dot {
  position:absolute; top:50%; left:100%;
  transform:translate(-50%,-50%);
  width:10px; height:10px; border-radius:50%;
  background:var(--accent);
  box-shadow: 0 0 12px var(--accent);
}
.orbit-ring:nth-child(2) .orbit-dot { background:var(--accent3); box-shadow: 0 0 12px var(--accent3); top:0; left:50%; }
.orbit-ring:nth-child(3) .orbit-dot { background:var(--accent2); box-shadow: 0 0 12px var(--accent2); top:50%; left:0; }
.orbit-center {
  position:absolute; inset:38%;
  background: radial-gradient(circle, rgba(108,99,255,0.3), rgba(108,99,255,0.05));
  border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:2.2rem;
  box-shadow: 0 0 60px rgba(108,99,255,0.2);
}

/* PAGE */
.page { padding: 100px 6% 60px; }
.page-title {
  font-family:'Syne',sans-serif; font-weight:800;
  font-size:clamp(1.8rem, 3.5vw, 2.8rem);
  letter-spacing:-1px; margin-bottom:8px;
}
.page-sub { color:var(--muted); font-size:1.05rem; margin-bottom:40px; }

/* SECTION */
.section { margin-bottom:72px; }
.section-label {
  font-size:0.75rem; font-weight:600; letter-spacing:2px;
  text-transform:uppercase; color:var(--accent); margin-bottom:12px;
}
.section-title {
  font-family:'Syne',sans-serif; font-weight:800;
  font-size:clamp(1.6rem, 3vw, 2.5rem);
  letter-spacing:-1px; margin-bottom:10px;
}
.section-sub { color:var(--muted); font-size:1rem; line-height:1.6; max-width:560px; margin-bottom:36px; }

/* CARDS GRID */
.cards-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
.cards-grid-3 { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:20px; }

.card {
  background: var(--surface);
  border:1px solid var(--border); border-radius:16px;
  padding:24px; cursor:pointer;
  transition:all 0.3s; position:relative; overflow:hidden;
}
.card:hover {
  border-color: rgba(108,99,255,0.35);
  transform:translateY(-3px);
  box-shadow: 0 8px 40px rgba(108,99,255,0.12);
}
.card::before {
  content:''; position:absolute; inset:0;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(108,99,255,0.08), transparent 60%);
  opacity:0; transition:opacity 0.3s; pointer-events:none;
}
.card:hover::before { opacity:1; }
.card-icon {
  font-size:2rem; margin-bottom:14px;
  width:52px; height:52px; border-radius:14px;
  background: rgba(108,99,255,0.1);
  display:flex; align-items:center; justify-content:center;
}
.card-title { font-family:'Syne',sans-serif; font-weight:700; font-size:1.1rem; margin-bottom:8px; }
.card-desc { font-size:0.875rem; color:var(--muted); line-height:1.6; }
.card-arrow {
  position:absolute; bottom:20px; right:20px;
  width:32px; height:32px; border-radius:8px;
  background:rgba(108,99,255,0.1); display:flex; align-items:center; justify-content:center;
  font-size:1rem; color:var(--accent);
  transition:all 0.2s;
}
.card:hover .card-arrow { background:var(--accent); color:#fff; transform:translate(2px,-2px); }

/* PREMIUM BADGE */
.premium-badge {
  display:inline-flex; align-items:center; gap:5px;
  padding:3px 10px; border-radius:20px;
  background: linear-gradient(135deg, rgba(247,201,72,0.2), rgba(247,201,72,0.08));
  border:1px solid rgba(247,201,72,0.3);
  font-size:0.72rem; font-weight:600; color:var(--gold);
  letter-spacing:0.5px; margin-bottom:10px;
}

/* PSYCHOMETRIC TEST */
.test-container { max-width:720px; margin:0 auto; }
.test-progress-bar {
  height:4px; background:var(--surface2); border-radius:4px; margin-bottom:40px; overflow:hidden;
}
.test-progress-fill {
  height:100%; background:linear-gradient(90deg, var(--accent), var(--accent3));
  border-radius:4px; transition:width 0.4s ease;
}
.test-question {
  font-family:'Syne',sans-serif; font-weight:700;
  font-size:1.4rem; line-height:1.4; margin-bottom:28px;
}
.test-options { display:grid; gap:12px; }
.test-option {
  padding:16px 20px; border-radius:12px;
  border:1.5px solid var(--border); background:var(--surface);
  cursor:pointer; transition:all 0.2s;
  text-align:left; color:var(--text);
  font-family:'DM Sans',sans-serif; font-size:0.95rem;
}
.test-option:hover { border-color:rgba(108,99,255,0.4); background:rgba(108,99,255,0.06); }
.test-option.selected { border-color:var(--accent); background:rgba(108,99,255,0.12); color:var(--accent); }
.test-nav { display:flex; justify-content:space-between; align-items:center; margin-top:30px; }
.test-step { font-size:0.85rem; color:var(--muted); }
.result-card {
  background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:36px;
}
.result-type {
  font-family:'Syne',sans-serif; font-weight:800;
  font-size:2rem; color:var(--accent); margin-bottom:8px;
}
.result-desc { color:var(--muted); line-height:1.7; margin-bottom:24px; }
.career-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px; }
.career-tag {
  padding:6px 14px; border-radius:20px;
  background:rgba(108,99,255,0.1); border:1px solid rgba(108,99,255,0.2);
  font-size:0.82rem; color:var(--accent); font-weight:500;
}
.score-bars { display:grid; gap:12px; margin-bottom:24px; }
.score-bar-row { }
.score-bar-label { display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px; }
.score-bar-track { height:8px; background:var(--surface2); border-radius:8px; overflow:hidden; }
.score-bar-fill { height:100%; border-radius:8px; transition:width 1s ease; }

/* COUNSELLING */
.mentors-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
.mentor-card {
  background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:24px;
  transition:all 0.3s;
}
.mentor-card:hover { border-color:rgba(247,201,72,0.3); transform:translateY(-3px); }
.mentor-avatar {
  width:64px; height:64px; border-radius:50%;
  font-size:1.8rem; display:flex; align-items:center; justify-content:center;
  margin-bottom:14px;
  background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(67,229,200,0.1));
  border:2px solid rgba(108,99,255,0.2);
}
.mentor-name { font-family:'Syne',sans-serif; font-weight:700; font-size:1.05rem; margin-bottom:4px; }
.mentor-role { font-size:0.82rem; color:var(--accent3); margin-bottom:8px; }
.mentor-exp { font-size:0.8rem; color:var(--muted); margin-bottom:12px; }
.mentor-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; }
.mentor-tag {
  padding:3px 10px; border-radius:20px;
  background:rgba(67,229,200,0.08); border:1px solid rgba(67,229,200,0.15);
  font-size:0.75rem; color:var(--accent3);
}
.mentor-btn {
  width:100%; padding:10px; border-radius:10px;
  background:rgba(247,201,72,0.1); border:1px solid rgba(247,201,72,0.25);
  color:var(--gold); font-family:'DM Sans',sans-serif; font-weight:600; font-size:0.875rem;
  cursor:pointer; transition:all 0.2s;
}
.mentor-btn:hover { background:rgba(247,201,72,0.2); }

/* NOTIFICATIONS */
.notif-list { display:grid; gap:14px; }
.notif-item {
  background:var(--surface); border:1px solid var(--border); border-radius:14px;
  padding:20px 22px; display:flex; gap:16px; align-items:flex-start;
  transition:all 0.2s;
}
.notif-item:hover { border-color:rgba(108,99,255,0.25); }
.notif-icon {
  width:44px; height:44px; flex-shrink:0; border-radius:12px;
  display:flex; align-items:center; justify-content:center; font-size:1.3rem;
}
.notif-content { flex:1; }
.notif-title { font-weight:600; font-size:0.95rem; margin-bottom:4px; }
.notif-desc { font-size:0.82rem; color:var(--muted); line-height:1.5; margin-bottom:8px; }
.notif-meta { display:flex; gap:10px; flex-wrap:wrap; }
.notif-tag {
  padding:3px 10px; border-radius:20px;
  font-size:0.75rem; font-weight:500;
}
.notif-date { font-size:0.75rem; color:var(--muted); display:flex; align-items:center; gap:4px; }
.tag-exam { background:rgba(108,99,255,0.12); color:var(--accent); }
.tag-urgent { background:rgba(255,101,132,0.12); color:var(--accent2); }
.tag-intern { background:rgba(67,229,200,0.1); color:var(--accent3); }
.tag-info { background:rgba(247,201,72,0.1); color:var(--gold); }

/* COURSES */
.courses-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
.course-card {
  background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden;
  transition:all 0.3s;
}
.course-card:hover { border-color:rgba(108,99,255,0.3); transform:translateY(-3px); box-shadow:0 8px 30px rgba(0,0,0,0.2); }
.course-thumb {
  height:120px; display:flex; align-items:center; justify-content:center;
  font-size:3rem; position:relative; overflow:hidden;
}
.course-body { padding:18px 20px 20px; }
.course-provider { font-size:0.75rem; color:var(--muted); margin-bottom:6px; letter-spacing:0.5px; text-transform:uppercase; }
.course-title { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; margin-bottom:8px; line-height:1.3; }
.course-meta { display:flex; gap:12px; margin-bottom:12px; font-size:0.8rem; color:var(--muted); }
.course-footer { display:flex; align-items:center; justify-content:space-between; }
.course-level {
  padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:500;
}
.course-btn {
  padding:7px 16px; border-radius:8px; border:none;
  background:var(--accent); color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:0.8rem;
  cursor:pointer; transition:all 0.2s;
}
.course-btn:hover { opacity:0.85; }
.course-btn.premium-btn {
  background:linear-gradient(135deg, var(--gold), #e0a800);
  color:#1a1000;
}

/* COLLEGE GUIDE */
.timeline { position:relative; padding-left:32px; }
.timeline::before {
  content:''; position:absolute; left:8px; top:0; bottom:0;
  width:2px; background:linear-gradient(to bottom, var(--accent), var(--accent3));
}
.timeline-item { position:relative; margin-bottom:28px; }
.timeline-dot {
  position:absolute; left:-28px; top:4px;
  width:16px; height:16px; border-radius:50%;
  background:var(--accent); border:3px solid var(--bg);
  box-shadow: 0 0 10px var(--accent);
}
.timeline-dot.green { background:var(--accent3); box-shadow: 0 0 10px var(--accent3); }
.timeline-dot.red { background:var(--accent2); box-shadow: 0 0 10px var(--accent2); }
.timeline-month { font-size:0.75rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--accent); margin-bottom:4px; }
.timeline-title { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; margin-bottom:4px; }
.timeline-desc { font-size:0.85rem; color:var(--muted); line-height:1.5; }

/* TABS */
.tabs { display:flex; gap:6px; padding:6px; background:var(--surface); border-radius:14px; border:1px solid var(--border); margin-bottom:28px; flex-wrap:wrap; }
.tab {
  padding:9px 18px; border-radius:9px; border:none;
  background:transparent; color:var(--muted);
  font-family:'DM Sans',sans-serif; font-size:0.875rem; font-weight:500;
  cursor:pointer; transition:all 0.2s; white-space:nowrap;
}
.tab.active { background:var(--accent); color:#fff; }
.tab:hover:not(.active) { color:var(--text); }

/* MODAL */
.modal-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,0.75);
  backdrop-filter:blur(10px); z-index:200;
  display:flex; align-items:center; justify-content:center; padding:20px;
}
.modal {
  background:var(--surface); border:1px solid var(--border); border-radius:20px;
  padding:36px; max-width:520px; width:100%; max-height:85vh; overflow-y:auto;
}
.modal h2 { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; margin-bottom:8px; }
.modal p { color:var(--muted); font-size:0.9rem; line-height:1.6; margin-bottom:20px; }
.modal-close {
  position:absolute; top:16px; right:16px;
  background:var(--surface2); border:none; color:var(--muted);
  width:36px; height:36px; border-radius:8px;
  cursor:pointer; font-size:1.1rem;
}

/* INTERNSHIP CALENDAR */
.intern-months { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:28px; }
.intern-month {
  padding:14px; border-radius:12px; text-align:center;
  border:1.5px solid var(--border); background:var(--surface);
  transition:all 0.2s; cursor:pointer;
}
.intern-month.hot {
  border-color: rgba(67,229,200,0.4);
  background: rgba(67,229,200,0.05);
}
.intern-month.warm { border-color:rgba(247,201,72,0.3); background:rgba(247,201,72,0.04); }
.intern-month-name { font-family:'Syne',sans-serif; font-weight:700; font-size:0.9rem; margin-bottom:4px; }
.intern-month-temp { font-size:0.75rem; }
.temp-hot { color:var(--accent3); }
.temp-warm { color:var(--gold); }
.temp-cold { color:var(--muted); }

/* HERO FEATURES */
.features-row { display:flex; gap:28px; flex-wrap:wrap; margin-top:60px; }
.feature-pill {
  display:flex; align-items:center; gap:10px;
  padding:12px 18px; border-radius:12px;
  background:var(--surface); border:1px solid var(--border);
  font-size:0.875rem;
}
.feature-pill-icon { font-size:1.2rem; }

/* COLLEGE CARDS */
.college-card {
  background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px;
  transition:all 0.3s;
}
.college-card:hover { border-color:rgba(67,229,200,0.3); transform:translateY(-2px); }
.college-rank {
  font-family:'Syne',sans-serif; font-weight:800; font-size:2rem;
  color:var(--accent3); margin-bottom:4px;
}
.college-name { font-family:'Syne',sans-serif; font-weight:700; font-size:1.05rem; margin-bottom:4px; }
.college-loc { font-size:0.82rem; color:var(--muted); margin-bottom:10px; }
.college-streams { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px; }
.college-stream {
  padding:3px 10px; border-radius:20px;
  background:rgba(67,229,200,0.08); border:1px solid rgba(67,229,200,0.15);
  font-size:0.75rem; color:var(--accent3);
}
.college-rating { display:flex; align-items:center; gap:6px; font-size:0.85rem; color:var(--gold); }

/* SCROLLBAR */
::-webkit-scrollbar { width:6px; }
::-webkit-scrollbar-track { background:var(--bg); }
::-webkit-scrollbar-thumb { background:var(--surface2); border-radius:6px; }

@media(max-width:768px) {
  .hero-visual { display:none; }
  .nav-tabs { display:none; }
  .intern-months { grid-template-columns:repeat(3,1fr); }
}
`;

const PAGES = ["home", "psychometric", "counselling", "notifications", "courses", "college"];

const psychoQuestions = [
  {
    q: "When you're working on a project, what do you enjoy most?",
    opts: ["Designing creative visuals or ideas", "Solving logical puzzles and problems", "Helping and guiding others", "Organizing and planning tasks", "Analyzing data and finding patterns", "Building or fixing physical things"]
  },
  {
    q: "Which activity sounds most exciting to you?",
    opts: ["Writing stories or creating content", "Coding a new app or website", "Counselling a friend in trouble", "Managing a team or event", "Conducting a science experiment", "Drawing, painting or making crafts"]
  },
  {
    q: "How do you prefer to learn new things?",
    opts: ["By watching videos and visuals", "By reading books and manuals", "By discussing with others", "By following step-by-step guides", "By experimenting hands-on", "By listening to lectures"]
  },
  {
    q: "What kind of work environment appeals to you?",
    opts: ["Creative studio or media company", "Tech startup or IT firm", "Hospital or social service", "Corporate office or NGO", "Research lab or university", "Outdoor or fieldwork setup"]
  },
  {
    q: "What subject do you find easiest or most interesting?",
    opts: ["Arts, Language or Literature", "Mathematics or Computer Science", "Biology or Psychology", "Commerce or Economics", "Physics or Chemistry", "Vocational / Technical subjects"]
  },
  {
    q: "What does success mean to you?",
    opts: ["Creating something people admire", "Solving a complex problem", "Making a difference in lives", "Leading a successful organisation", "Discovering something new", "Building something with my hands"]
  },
  {
    q: "How do you handle pressure?",
    opts: ["By channeling it into creativity", "By breaking it into logical steps", "By talking it out with someone", "By making a plan and executing", "By researching solutions thoroughly", "By taking practical action immediately"]
  },
  {
    q: "Which of these is your dream achievement?",
    opts: ["Winning a national arts award", "Founding a tech unicorn", "Running a major hospital", "Leading a Fortune 500 company", "Publishing a research paper", "Building an engineering marvel"]
  }
];

const careerProfiles = {
  Creative: {
    type: "Creative Visionary",
    icon: "🎨",
    desc: "You thrive in creative environments where imagination is valued. Your ability to think visually and express ideas makes you a strong fit for design, media, arts, and communication careers.",
    careers: ["UX/UI Designer", "Graphic Designer", "Content Creator", "Film Director", "Fashion Designer", "Architect", "Advertising Creative"],
    streams: ["Arts & Humanities", "Fine Arts", "Mass Communication", "Architecture"]
  },
  Tech: {
    type: "Tech Innovator",
    icon: "💻",
    desc: "Your logical and analytical mind excels in problem-solving through technology. You're built for engineering, software, and data-driven fields.",
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst", "App Developer", "Product Manager"],
    streams: ["Computer Science", "Engineering", "Mathematics", "IT"]
  },
  Helping: {
    type: "Human-Centered Helper",
    icon: "❤️",
    desc: "You are driven by empathy and the desire to positively impact others' lives. Healthcare, education, counselling and social work call out to your nature.",
    careers: ["Doctor", "Psychologist", "Teacher", "Social Worker", "Nurse", "Career Counsellor", "HR Manager"],
    streams: ["Biology", "Psychology", "Education", "Social Work"]
  },
  Leadership: {
    type: "Strategic Leader",
    icon: "🚀",
    desc: "You excel in organizing, planning, and leading teams. Business, management, law, and policy are areas where your organizational instincts shine.",
    careers: ["Business Manager", "Entrepreneur", "Lawyer", "Policy Maker", "Financial Analyst", "Marketing Manager"],
    streams: ["Commerce", "Economics", "Business Administration", "Law"]
  },
  Science: {
    type: "Analytical Researcher",
    icon: "🔬",
    desc: "You have a deep curiosity about how the world works. Your love for research, experimentation, and discovery makes you well-suited for science and academia.",
    careers: ["Scientist", "Researcher", "Pharmacist", "Biotechnologist", "Environmental Scientist", "Mathematician"],
    streams: ["Physics", "Chemistry", "Biology", "Mathematics"]
  },
  Practical: {
    type: "Skilled Craftsperson",
    icon: "🔧",
    desc: "You are at your best when working with your hands and solving real-world problems practically. Technical and vocational fields are your calling.",
    careers: ["Civil Engineer", "Electrician", "Mechanical Engineer", "Chef", "Pilot", "Auto Engineer"],
    streams: ["Vocational", "Mechanical Engineering", "Civil Engineering", "Polytechnic"]
  }
};

const profileOrder = ["Creative", "Tech", "Helping", "Leadership", "Science", "Practical"];
const scoreColors = ["#6c63ff","#43e5c8","#ff6584","#f7c948","#a78bfa","#fb923c"];

const notifications = [
  { icon:"📝", type:"exam", title:"JEE Mains 2025 – Session 2", desc:"Application window open. Exam in April. 3.5 lakh+ seats across NITs and IITs. Don't miss the deadline.", tags:["JEE","Engineering"], date:"Deadline: Dec 15", urgent:false },
  { icon:"🏥", type:"exam", title:"NEET UG 2025 Registration Open", desc:"National Eligibility cum Entrance Test for MBBS/BDS/BAMS. Prepare with NCERT Biology deeply.", tags:["NEET","Medical"], date:"Deadline: Nov 30", urgent:true },
  { icon:"🏛️", type:"exam", title:"CLAT 2025 – Law Entrance", desc:"Common Law Admission Test for the top 24 NLUs. English, GK and Legal Reasoning key focus areas.", tags:["CLAT","Law"], date:"Deadline: Jan 10", urgent:false },
  { icon:"🎨", type:"exam", title:"NID DAT / NIFT Entrance 2025", desc:"Design aptitude tests for premier design institutes. Portfolio and creative thinking heavily tested.", tags:["Design","NID"], date:"Deadline: Jan 5", urgent:false },
  { icon:"💼", type:"intern", title:"Summer Internship Season Approaching", desc:"Jan–Feb is the best time to apply for May–July internships at top companies on Internshala, LinkedIn.", tags:["Internship","College"], date:"Best window: Jan–Feb", urgent:false },
  { icon:"🎓", type:"exam", title:"CAT 2025 – MBA Admissions", desc:"Common Admission Test for IIMs. Quant, VARC and DILR sections. 2-year college students should start prep now.", tags:["CAT","MBA"], date:"Exam: Nov 2025", urgent:false },
  { icon:"🌐", type:"exam", title:"UPSC Prelims 2025", desc:"Civil Services Examination preliminary round. General Studies Paper I and CSAT. Apply by February.", tags:["UPSC","Civil Services"], date:"Deadline: Feb 2025", urgent:false },
  { icon:"🖥️", type:"intern", title:"Tech Giant Internship Drives – March", desc:"Google, Microsoft, Amazon internship applications open in March for Summer batches. Prep DSA & LeetCode now.", tags:["Tech Intern","College"], date:"Opens: March", urgent:true },
];

const mentors = [
  { name:"Dr. Priya Sharma", role:"Career Counsellor & Psychologist", exp:"12 years experience", avatar:"👩‍💼", tags:["IIT/IIM","NEET","Psychology"], rating:4.9, slots:3 },
  { name:"Arjun Mehta", role:"IIT Alumni & Tech Career Coach", exp:"8 years in Tech Industry", avatar:"👨‍💻", tags:["Engineering","Startup","Coding"], rating:4.8, slots:5 },
  { name:"Ms. Rekha Iyer", role:"Arts & Humanities Specialist", exp:"10 years counselling", avatar:"👩‍🏫", tags:["Arts","Design","Literature"], rating:4.7, slots:2 },
  { name:"Prof. Sunil Das", role:"Medical Career Advisor", exp:"15 years in Medicine", avatar:"👨‍⚕️", tags:["NEET","MBBS","Allied Health"], rating:5.0, slots:1 },
  { name:"Deepa Nair", role:"Commerce & Law Career Guide", exp:"9 years MBA & Law track", avatar:"👩‍⚖️", tags:["CA","MBA","Law","CLAT"], rating:4.8, slots:4 },
  { name:"Rahul Verma", role:"Research & Academia Mentor", exp:"PhD, 7 years mentoring", avatar:"👨‍🔬", tags:["Science","Research","Abroad"], rating:4.9, slots:2 },
];

const courses = [
  { emoji:"🔢", color:"#6c63ff20", title:"Mathematics Foundation for JEE/NEET", provider:"Khan Academy", duration:"40 hrs", level:"Class 9–12", type:"free", levelColor:"rgba(108,99,255,0.1)", levelTextColor:"#6c63ff" },
  { emoji:"💻", color:"#43e5c820", title:"Python for Beginners – Full Course", provider:"Google Developers", duration:"20 hrs", level:"Beginner", type:"free", levelColor:"rgba(67,229,200,0.1)", levelTextColor:"#43e5c8" },
  { emoji:"🧬", color:"#ff658420", title:"Biology & Genetics – NEET Prep", provider:"Unacademy Free", duration:"35 hrs", level:"Class 11–12", type:"free", levelColor:"rgba(255,101,132,0.1)", levelTextColor:"#ff6584" },
  { emoji:"📊", color:"#f7c94820", title:"Financial Literacy & Economics Basics", provider:"NPTEL", duration:"18 hrs", level:"Class 9–12", type:"free", levelColor:"rgba(247,201,72,0.1)", levelTextColor:"#f7c948" },
  { emoji:"✍️", color:"#a78bfa20", title:"Creative Writing & Communication", provider:"Coursera Free", duration:"12 hrs", level:"All Classes", type:"free", levelColor:"rgba(167,139,250,0.1)", levelTextColor:"#a78bfa" },
  { emoji:"🔭", color:"#6c63ff20", title:"Physics – Motion, Laws & Beyond", provider:"BYJU'S Free", duration:"28 hrs", level:"Class 10–12", type:"free", levelColor:"rgba(108,99,255,0.1)", levelTextColor:"#6c63ff" },
  { emoji:"🧠", color:"#43e5c820", title:"AI/ML Crash Course for Students", provider:"Google ML", duration:"15 hrs", level:"College", type:"premium", levelColor:"rgba(247,201,72,0.1)", levelTextColor:"#f7c948" },
  { emoji:"📈", color:"#f7c94820", title:"Stock Market & Investment Basics", provider:"NSE India", duration:"10 hrs", level:"College", type:"premium", levelColor:"rgba(247,201,72,0.1)", levelTextColor:"#f7c948" },
  { emoji:"🎨", color:"#ff658420", title:"UI/UX Design Fundamentals", provider:"Figma Academy", duration:"25 hrs", level:"All", type:"premium", levelColor:"rgba(247,201,72,0.1)", levelTextColor:"#f7c948" },
];

const colleges = [
  { rank:"#1", name:"IIT Bombay", loc:"Mumbai, Maharashtra", streams:["Engineering","Computer Science","Design"], rating:"4.9", type:"Engineering" },
  { rank:"#2", name:"AIIMS New Delhi", loc:"New Delhi", streams:["Medicine","MBBS","Nursing","Research"], rating:"5.0", type:"Medical" },
  { rank:"#3", name:"NLU Delhi", loc:"New Delhi", streams:["Law","Legal Studies","LLB"], rating:"4.8", type:"Law" },
  { rank:"#4", name:"NID Ahmedabad", loc:"Ahmedabad, Gujarat", streams:["Product Design","Visual Comm","Film"], rating:"4.9", type:"Design" },
  { rank:"#5", name:"IIM Ahmedabad", loc:"Ahmedabad, Gujarat", streams:["MBA","Business","Finance","Marketing"], rating:"5.0", type:"Management" },
  { rank:"#6", name:"NIFT Delhi", loc:"New Delhi", streams:["Fashion Design","Textile","Apparel"], rating:"4.7", type:"Design" },
  { rank:"#7", name:"Jadavpur University", loc:"Kolkata, West Bengal", streams:["Engineering","Arts","Science"], rating:"4.7", type:"Engineering" },
  { rank:"#8", name:"St. Xavier's College", loc:"Kolkata, West Bengal", streams:["Commerce","Science","Arts"], rating:"4.8", type:"Arts & Science" },
];

const internMonths = [
  { m:"Jan", hot:true, desc:"Apply for summer internships" },
  { m:"Feb", hot:true, desc:"Best month to send applications" },
  { m:"Mar", hot:true, desc:"Tech company drives begin" },
  { m:"Apr", warm:true, desc:"Startups & NGOs open" },
  { m:"May", hot:true, desc:"Internship season peak" },
  { m:"Jun", hot:true, desc:"Most internships active" },
  { m:"Jul", warm:true, desc:"Post-summer applications" },
  { m:"Aug", cold:true, desc:"Relatively slow period" },
  { m:"Sep", warm:true, desc:"Winter internship prep" },
  { m:"Oct", warm:true, desc:"Campus placements begin" },
  { m:"Nov", cold:true, desc:"Exam & study season" },
  { m:"Dec", cold:true, desc:"Year-end holiday break" },
];

const internTimeline = [
  { month:"January–February", title:"Apply for Summer Internships", desc:"Best window to apply on Internshala, LinkedIn, AngelList. Top firms open applications 3–4 months in advance.", type:"hot" },
  { month:"March", title:"Tech Giant Application Season", desc:"Google STEP, Microsoft Engage, Amazon SDE Intern — applications open. Start now, prepare DSA & LeetCode.", type:"hot" },
  { month:"May–July", title:"Summer Internship Season", desc:"Most 2nd–3rd year students intern during these months. Work on live projects and build your portfolio.", type:"green" },
  { month:"August–September", title:"Start Winter Internship Applications", desc:"Apply early for Dec–Jan internships. Research & academic internships under professors are great here.", type:"warm" },
  { month:"October–November", title:"Campus Placement Season", desc:"Final year students should focus on placement preparation. Mock interviews and group discussions.", type:"urgent" },
  { month:"December", title:"Winter Internship Period", desc:"Short-term winter internships run for 4–8 weeks. Good for freshers to gain first experience.", type:"green" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [testStarted, setTestStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testDone, setTestDone] = useState(false);
  const [scores, setScores] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [notifFilter, setNotifFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => { window.scrollTo(0,0); }, [page]);

  const handleAnswer = (opt, idx) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = idx;
    setAnswers(newAnswers);
  };

  const computeResult = (ans) => {
    const sc = { Creative:0, Tech:0, Helping:0, Leadership:0, Science:0, Practical:0 };
    ans.forEach(a => { sc[profileOrder[a]] = (sc[profileOrder[a]] || 0) + 1; });
    const total = ans.length;
    const pct = {};
    profileOrder.forEach(k => pct[k] = Math.round((sc[k]||0)/total*100));
    return { sc, pct, top: profileOrder.reduce((a,b) => (sc[a]||0)>=(sc[b]||0)?a:b) };
  };

  const goNext = () => {
    if (answers[qIndex] === undefined) return;
    if (qIndex < psychoQuestions.length - 1) setQIndex(qIndex + 1);
    else { const r = computeResult(answers); setScores(r); setTestDone(true); }
  };

  const goPrev = () => { if (qIndex > 0) setQIndex(qIndex - 1); };

  const resetTest = () => { setTestStarted(false); setQIndex(0); setAnswers([]); setTestDone(false); setScores({}); };

  const filteredNotifs = notifications.filter(n =>
    notifFilter === "all" ? true :
    notifFilter === "exam" ? n.type === "exam" :
    notifFilter === "intern" ? n.type === "intern" : true
  );

  const filteredCourses = courses.filter(c =>
    courseFilter === "all" ? true :
    courseFilter === "free" ? c.type === "free" :
    courseFilter === "premium" ? c.type === "premium" : true
  );

  const filteredColleges = colleges.filter(c =>
    collegeFilter === "all" ? true : c.type === collegeFilter
  );

  return (
    <div className="app">
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Career<span>Compass</span></div>
        <div className="nav-tabs">
          {[["home","Home"],["psychometric","Psychometric"],["counselling","Counselling"],["notifications","Exams & Alerts"],["courses","Courses"],["college","College Guide"]].map(([p,l]) => (
            <button key={p} className={`nav-tab ${page===p?"active":""}`} onClick={()=>setPage(p)}>{l}</button>
          ))}
        </div>
        <button className="nav-cta" onClick={()=>setShowPremiumModal(true)}>✦ Go Premium</button>
      </nav>

      {/* HOME */}
      {page === "home" && (
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
      )}

      {/* PSYCHOMETRIC */}
      {page === "psychometric" && (
        <div className="page">
          <div className="page-title">Psychometric Test</div>
          <div className="page-sub">Discover your personality type and ideal career streams through science-backed assessment.</div>

          {!testStarted && !testDone && (
            <div>
              <div className="cards-grid" style={{marginBottom:"36px"}}>
                {[
                  {icon:"⏱️",label:"8 Questions",sub:"Takes only 5 minutes"},
                  {icon:"🔬",label:"Science-Based",sub:"Holland Code framework"},
                  {icon:"🎯",label:"6 Career Types",sub:"Detailed profile analysis"},
                  {icon:"📊",label:"Score Breakdown",sub:"Visual results & career map"},
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
                <p style={{color:"var(--muted)",marginBottom:"28px"}}>Answer 8 honest questions about your interests and preferences. No right or wrong answers!</p>
                <button className="btn-primary" style={{fontSize:"1.05rem",padding:"16px 40px"}} onClick={()=>setTestStarted(true)}>Start the Test →</button>
              </div>
            </div>
          )}

          {testStarted && !testDone && (
            <div className="test-container">
              <div className="test-progress-bar">
                <div className="test-progress-fill" style={{width:`${((qIndex+1)/psychoQuestions.length)*100}%`}}/>
              </div>
              <div style={{color:"var(--muted)",fontSize:"0.8rem",marginBottom:"20px"}}>Question {qIndex+1} of {psychoQuestions.length}</div>
              <div className="test-question">{psychoQuestions[qIndex].q}</div>
              <div className="test-options">
                {psychoQuestions[qIndex].opts.map((opt,idx)=>(
                  <button key={idx} className={`test-option ${answers[qIndex]===idx?"selected":""}`}
                    onClick={()=>handleAnswer(opt,idx)}>
                    <span style={{marginRight:"10px",opacity:0.4}}>{"ABCDEF"[idx]}</span>{opt}
                  </button>
                ))}
              </div>
              <div className="test-nav">
                <button className="btn-secondary" style={{padding:"10px 22px",fontSize:"0.9rem"}} onClick={goPrev} disabled={qIndex===0}>← Back</button>
                <span className="test-step">{qIndex+1}/{psychoQuestions.length}</span>
                <button className="btn-primary" style={{padding:"10px 22px",fontSize:"0.9rem"}} onClick={goNext} disabled={answers[qIndex]===undefined}>
                  {qIndex===psychoQuestions.length-1?"See Results →":"Next →"}
                </button>
              </div>
            </div>
          )}

          {testDone && scores.top && (
            <div className="test-container">
              <div style={{textAlign:"center",marginBottom:"32px"}}>
                <div style={{fontSize:"3rem",marginBottom:"10px"}}>{careerProfiles[scores.top].icon}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"var(--muted)",marginBottom:"4px"}}>Your Career Profile</div>
                <div className="result-type">{careerProfiles[scores.top].type}</div>
              </div>
              <div className="result-card">
                <p className="result-desc">{careerProfiles[scores.top].desc}</p>
                <div style={{marginBottom:"16px"}}>
                  <div style={{fontSize:"0.8rem",fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"10px"}}>Recommended Careers</div>
                  <div className="career-tags">
                    {careerProfiles[scores.top].careers.map((c,i)=><span key={i} className="career-tag">{c}</span>)}
                  </div>
                </div>
                <div style={{marginBottom:"20px"}}>
                  <div style={{fontSize:"0.8rem",fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"10px"}}>Best-Fit Streams</div>
                  <div className="career-tags">
                    {careerProfiles[scores.top].streams.map((s,i)=><span key={i} className="career-tag" style={{background:"rgba(67,229,200,0.08)",borderColor:"rgba(67,229,200,0.2)",color:"var(--accent3)"}}>{s}</span>)}
                  </div>
                </div>
                <div>
                  <div style={{fontSize:"0.8rem",fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"12px"}}>Personality Score Breakdown</div>
                  <div className="score-bars">
                    {profileOrder.map((k,i)=>(
                      <div key={k} className="score-bar-row">
                        <div className="score-bar-label"><span>{careerProfiles[k].type}</span><span style={{color:scoreColors[i],fontWeight:600}}>{scores.pct[k]}%</span></div>
                        <div className="score-bar-track"><div className="score-bar-fill" style={{width:`${scores.pct[k]}%`,background:scoreColors[i]}}/></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginTop:"24px",display:"flex",gap:"12px",flexWrap:"wrap"}}>
                  <button className="btn-primary" onClick={()=>setPage("counselling")}>Talk to a Mentor →</button>
                  <button className="btn-secondary" onClick={resetTest}>Retake Test</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* COUNSELLING */}
      {page === "counselling" && (
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
      )}

      {/* NOTIFICATIONS */}
      {page === "notifications" && (
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
      )}

      {/* COURSES */}
      {page === "courses" && (
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
      )}

      {/* COLLEGE GUIDE */}
      {page === "college" && (
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
      )}

      {/* PREMIUM MODAL */}
      {showPremiumModal && (
        <div className="modal-overlay" onClick={()=>setShowPremiumModal(false)}>
          <div className="modal" style={{position:"relative"}} onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setShowPremiumModal(false)}>✕</button>
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
      )}
    </div>
  );
}
