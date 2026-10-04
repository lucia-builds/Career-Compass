import React, { useState } from "react";

const LINKS = [
  ["home", "Home"],
  ["psychometric", "Psychometric"],
  ["counselling", "Counselling"],
  ["notifications", "Exams & Alerts"],
  ["courses", "Courses"],
  ["college", "College Guide"],
];

export default function Navbar({ page, setPage, setShowPremiumModal }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">Career<span>Compass</span></div>

      <div className={`nav-tabs ${menuOpen ? "open" : ""}`}>
        {LINKS.map(([p, l]) => (
          <button key={p} className={`nav-tab ${page === p ? "active" : ""}`} onClick={() => go(p)}>{l}</button>
        ))}
      </div>

      <div className="nav-right">
        <button className="nav-cta" onClick={() => setShowPremiumModal(true)}>✦ Go Premium</button>
        <button
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}