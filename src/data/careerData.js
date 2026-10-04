// ---------- Psychometric test: Holland RIASEC interest model ----------
// R = Realistic, I = Investigative, A = Artistic, S = Social, E = Enterprising, C = Conventional

export const profileOrder = ["R", "I", "A", "S", "E", "C"];
export const scoreColors = ["#fb923c", "#43e5c8", "#ff6584", "#f7c948", "#6c63ff", "#a78bfa"];

// Students rate every activity from 1 to 5
export const ratingLabels = ["Strongly dislike", "Dislike", "Neutral", "Like", "Strongly like"];

// 5 activities per type (30 in total)
const questionBank = {
  R: [
    "Fix or build something with your hands, like a bicycle, gadget or model",
    "Work outdoors, for example on a farm, in a garden or on a field",
    "Learn how machines, engines or electrical circuits work",
    "Play sports or go trekking and do other physical activities",
    "Use tools or equipment to make something useful",
  ],
  I: [
    "Solve tricky maths or logic puzzles",
    "Do science experiments to find out why things happen",
    "Read about new discoveries in science, space or technology",
    "Research a topic deeply until you fully understand it",
    "Look at data or patterns to work out what they mean",
  ],
  A: [
    "Draw, paint or design things",
    "Write stories, poems or blog posts",
    "Make videos, edit photos or create content",
    "Sing, dance, act or play a musical instrument",
    "Come up with original ideas instead of following fixed rules",
  ],
  S: [
    "Help a friend who is stressed or confused about something",
    "Teach or explain a topic to other students",
    "Volunteer for a cause or work with an NGO",
    "Work in a team and make sure everyone feels included",
    "Look after people who are sick, young or in need",
  ],
  E: [
    "Lead a team or run a school or college club",
    "Start a small business or sell something you made",
    "Debate or convince others to agree with your idea",
    "Organise a big event and take the important decisions",
    "Take a risk to reach a big goal",
  ],
  C: [
    "Keep your notes, files and schedule neat and organised",
    "Work with numbers, like budgets, accounts or spreadsheets",
    "Follow clear steps and rules to finish a task accurately",
    "Check details and correct small mistakes",
    "Plan and manage things like timetables, records or stock",
  ],
};

// Mix the types so similar questions never come one after another
export const psychoQuestions = Array.from({ length: 5 }).flatMap((_, n) =>
  profileOrder.map((type) => ({ type, q: questionBank[type][n] }))
);

export const careerProfiles = {
  R: {
    type: "Realistic",
    nickname: "The Doer",
    icon: "🛠️",
    desc: "You like hands-on work, real tools and visible results. You prefer doing and building over sitting and talking, and you often enjoy the outdoors, machines or sports.",
    careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Pilot", "Agriculture Scientist", "Defence Services Officer", "Sports Coach"],
    streams: ["Engineering (Mechanical, Civil, Electrical)", "Diploma / ITI", "Agriculture", "Defence (NDA)"],
  },
  I: {
    type: "Investigative",
    nickname: "The Thinker",
    icon: "🔬",
    desc: "You are curious and love working out how and why things happen. Puzzles, research, maths and science keep you engaged, and you like to understand a problem deeply before acting.",
    careers: ["Doctor", "Scientist / Researcher", "Data Scientist", "Software Developer", "Pharmacist", "Biotechnologist", "Statistician"],
    streams: ["Science (PCM / PCB)", "B.Sc / Integrated M.Sc", "Medicine (MBBS)", "Computer Science"],
  },
  A: {
    type: "Artistic",
    nickname: "The Creator",
    icon: "🎨",
    desc: "You are imaginative and expressive. You enjoy creating original things such as designs, stories, music or videos, and you prefer freedom over strict rules.",
    careers: ["UX/UI Designer", "Graphic Designer", "Architect", "Animator / Filmmaker", "Writer / Journalist", "Content Creator", "Fashion Designer"],
    streams: ["Design (UCEED, NID, NIFT)", "Architecture (NATA)", "Mass Communication", "Fine Arts / Humanities"],
  },
  S: {
    type: "Social",
    nickname: "The Helper",
    icon: "🤝",
    desc: "You care about people and enjoy teaching, supporting and working with others. You are patient, a good listener, and you feel rewarded when you make a difference in someone's life.",
    careers: ["Teacher / Professor", "Psychologist / Counsellor", "Nurse", "Social Worker", "HR Manager", "Doctor", "Physiotherapist"],
    streams: ["Psychology", "Education (B.Ed)", "Nursing / Healthcare", "Social Work"],
  },
  E: {
    type: "Enterprising",
    nickname: "The Leader",
    icon: "🚀",
    desc: "You are confident, persuasive and ambitious. You enjoy leading, taking risks and turning ideas into action, whether that is a team, a business or a campaign.",
    careers: ["Entrepreneur", "Business Manager", "Lawyer", "Civil Services Officer", "Marketing / Sales Manager", "Product Manager", "Public Policy Professional"],
    streams: ["Commerce", "BBA / MBA", "Law (CLAT)", "Civil Services (UPSC)"],
  },
  C: {
    type: "Conventional",
    nickname: "The Organiser",
    icon: "📊",
    desc: "You like order, accuracy and clear plans. You are careful with details and numbers, and people can depend on you to keep things running smoothly.",
    careers: ["Chartered Accountant", "Banker", "Company Secretary", "Data Analyst", "Financial Analyst", "Auditor", "Operations Manager"],
    streams: ["Commerce", "CA / CS / CMA", "Banking & Finance", "Statistics / Data"],
  },
};

export const notifications = [
  { icon:"📝", type:"exam", title:"JEE Mains 2025 – Session 2", desc:"Application window open. Exam in April. 3.5 lakh+ seats across NITs and IITs. Don't miss the deadline.", tags:["JEE","Engineering"], date:"Deadline: Dec 15", urgent:false },
  { icon:"🏥", type:"exam", title:"NEET UG 2025 Registration Open", desc:"National Eligibility cum Entrance Test for MBBS/BDS/BAMS. Prepare with NCERT Biology deeply.", tags:["NEET","Medical"], date:"Deadline: Nov 30", urgent:true },
  { icon:"🏛️", type:"exam", title:"CLAT 2025 – Law Entrance", desc:"Common Law Admission Test for the top 24 NLUs. English, GK and Legal Reasoning key focus areas.", tags:["CLAT","Law"], date:"Deadline: Jan 10", urgent:false },
  { icon:"🎨", type:"exam", title:"NID DAT / NIFT Entrance 2025", desc:"Design aptitude tests for premier design institutes. Portfolio and creative thinking heavily tested.", tags:["Design","NID"], date:"Deadline: Jan 5", urgent:false },
  { icon:"💼", type:"intern", title:"Summer Internship Season Approaching", desc:"Jan–Feb is the best time to apply for May–July internships at top companies on Internshala, LinkedIn.", tags:["Internship","College"], date:"Best window: Jan–Feb", urgent:false },
  { icon:"🎓", type:"exam", title:"CAT 2025 – MBA Admissions", desc:"Common Admission Test for IIMs. Quant, VARC and DILR sections. 2-year college students should start prep now.", tags:["CAT","MBA"], date:"Exam: Nov 2025", urgent:false },
  { icon:"🌐", type:"exam", title:"UPSC Prelims 2025", desc:"Civil Services Examination preliminary round. General Studies Paper I and CSAT. Apply by February.", tags:["UPSC","Civil Services"], date:"Deadline: Feb 2025", urgent:false },
  { icon:"🖥️", type:"intern", title:"Tech Giant Internship Drives – March", desc:"Google, Microsoft, Amazon internship applications open in March for Summer batches. Prep DSA & LeetCode now.", tags:["Tech Intern","College"], date:"Opens: March", urgent:true },
];

export const mentors = [
  { name:"Dr. Priya Sharma", role:"Career Counsellor & Psychologist", exp:"12 years experience", avatar:"👩‍💼", tags:["IIT/IIM","NEET","Psychology"], rating:4.9, slots:3 },
  { name:"Arjun Mehta", role:"IIT Alumni & Tech Career Coach", exp:"8 years in Tech Industry", avatar:"👨‍💻", tags:["Engineering","Startup","Coding"], rating:4.8, slots:5 },
  { name:"Ms. Rekha Iyer", role:"Arts & Humanities Specialist", exp:"10 years counselling", avatar:"👩‍🏫", tags:["Arts","Design","Literature"], rating:4.7, slots:2 },
  { name:"Prof. Sunil Das", role:"Medical Career Advisor", exp:"15 years in Medicine", avatar:"👨‍⚕️", tags:["NEET","MBBS","Allied Health"], rating:5.0, slots:1 },
  { name:"Deepa Nair", role:"Commerce & Law Career Guide", exp:"9 years MBA & Law track", avatar:"👩‍⚖️", tags:["CA","MBA","Law","CLAT"], rating:4.8, slots:4 },
  { name:"Rahul Verma", role:"Research & Academia Mentor", exp:"PhD, 7 years mentoring", avatar:"👨‍🔬", tags:["Science","Research","Abroad"], rating:4.9, slots:2 },
];

export const courses = [
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

export const colleges = [
  { rank:"#1", name:"IIT Bombay", loc:"Mumbai, Maharashtra", streams:["Engineering","Computer Science","Design"], rating:"4.9", type:"Engineering" },
  { rank:"#2", name:"AIIMS New Delhi", loc:"New Delhi", streams:["Medicine","MBBS","Nursing","Research"], rating:"5.0", type:"Medical" },
  { rank:"#3", name:"NLU Delhi", loc:"New Delhi", streams:["Law","Legal Studies","LLB"], rating:"4.8", type:"Law" },
  { rank:"#4", name:"NID Ahmedabad", loc:"Ahmedabad, Gujarat", streams:["Product Design","Visual Comm","Film"], rating:"4.9", type:"Design" },
  { rank:"#5", name:"IIM Ahmedabad", loc:"Ahmedabad, Gujarat", streams:["MBA","Business","Finance","Marketing"], rating:"5.0", type:"Management" },
  { rank:"#6", name:"NIFT Delhi", loc:"New Delhi", streams:["Fashion Design","Textile","Apparel"], rating:"4.7", type:"Design" },
  { rank:"#7", name:"Jadavpur University", loc:"Kolkata, West Bengal", streams:["Engineering","Arts","Science"], rating:"4.7", type:"Engineering" },
  { rank:"#8", name:"St. Xavier's College", loc:"Kolkata, West Bengal", streams:["Commerce","Science","Arts"], rating:"4.8", type:"Arts & Science" },
];

export const internMonths = [
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

export const internTimeline = [
  { month:"January–February", title:"Apply for Summer Internships", desc:"Best window to apply on Internshala, LinkedIn, AngelList. Top firms open applications 3–4 months in advance.", type:"hot" },
  { month:"March", title:"Tech Giant Application Season", desc:"Google STEP, Microsoft Engage, Amazon SDE Intern — applications open. Start now, prepare DSA & LeetCode.", type:"hot" },
  { month:"May–July", title:"Summer Internship Season", desc:"Most 2nd–3rd year students intern during these months. Work on live projects and build your portfolio.", type:"green" },
  { month:"August–September", title:"Start Winter Internship Applications", desc:"Apply early for Dec–Jan internships. Research & academic internships under professors are great here.", type:"warm" },
  { month:"October–November", title:"Campus Placement Season", desc:"Final year students should focus on placement preparation. Mock interviews and group discussions.", type:"urgent" },
  { month:"December", title:"Winter Internship Period", desc:"Short-term winter internships run for 4–8 weeks. Good for freshers to gain first experience.", type:"green" },
];