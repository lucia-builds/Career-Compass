import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Psychometric from "./pages/Psychometric";
   import Counselling from "./pages/Counselling";
      import Notifications from "./pages/Notifications";
         import Courses from "./pages/Courses";
           import College from "./pages/College";
           import Navbar from "./components/Navbar";
import PremiumModal from "./components/PremiumModal";
   import {
     psychoQuestions, careerProfiles, profileOrder, scoreColors,
     notifications, mentors, courses, colleges,
     internMonths, internTimeline,
   } from "./data/careerData";

const PAGES = ["home", "psychometric", "counselling", "notifications", "courses", "college"];
  //  console.log("types:", typeof Navbar, typeof PremiumModal, typeof Home, typeof Psychometric, typeof Counselling, typeof Notifications, typeof Courses, typeof College);
export default function App() {
    const location = useLocation();
   const navigate = useNavigate();
   const page = location.pathname === "/" ? "home" : location.pathname.slice(1);
   const setPage = (p) => navigate(p === "home" ? "/" : "/" + p);
  const [activeTab, setActiveTab] = useState(0);
  const [courseFilter, setCourseFilter] = useState("all");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => { window.scrollTo(0,0); }, [page]);

  return (
    <div className="app">
      {/* <style>{style}</style> */}

      {/* NAV */}
 <Navbar page={page} setPage={setPage} setShowPremiumModal={setShowPremiumModal} />

      {/* HOME */}
       {page === "home" && <Home setPage={setPage} setShowPremiumModal={setShowPremiumModal} />}

      {/* PSYCHOMETRIC */}
       {page === "psychometric" && <Psychometric setPage={setPage} />}

      {/* COUNSELLING */}
         {page === "counselling" && <Counselling setShowPremiumModal={setShowPremiumModal} setSelectedMentor={setSelectedMentor} />}

      {/* NOTIFICATIONS */}
       {page === "notifications" && <Notifications setShowPremiumModal={setShowPremiumModal} />}

      {/* COURSES */}
       {page === "courses" && <Courses setShowPremiumModal={setShowPremiumModal} />}

      {/* COLLEGE GUIDE */}
         {page === "college" && <College setShowPremiumModal={setShowPremiumModal} />}

      {/* PREMIUM MODAL */}
     {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
    </div>
  );
}
