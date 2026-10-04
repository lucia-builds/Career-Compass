import { profileOrder, psychoQuestions } from "../data/careerData";
import { careerMatches } from "../data/careers";

// answers: array of ratings (1 to 5), one per question, in the same order as psychoQuestions
export function scoreAnswers(answers) {
  const raw = {};
  const count = {};
  profileOrder.forEach((t) => { raw[t] = 0; count[t] = 0; });

  psychoQuestions.forEach((item, i) => {
    raw[item.type] += answers[i] || 3; // an unanswered question counts as neutral
    count[item.type] += 1;
  });

  // Convert each type's total into an interest level from 0 to 100
  const pct = {};
  profileOrder.forEach((t) => {
    const min = count[t];       // every answer = 1
    const max = count[t] * 5;   // every answer = 5
    pct[t] = Math.round(((raw[t] - min) / (max - min)) * 100);
  });

  // Highest first; ties keep the R-I-A-S-E-C order
  const ranked = [...profileOrder].sort(
    (a, b) => raw[b] - raw[a] || profileOrder.indexOf(a) - profileOrder.indexOf(b)
  );

  const values = profileOrder.map((t) => pct[t]);
  const broad = Math.max(...values) - Math.min(...values) < 20; // interests are spread evenly

  return { raw, pct, ranked, top: ranked[0], code: ranked.slice(0, 3).join(""), broad };
}

// Compare the student's 3-letter code with each career's code.
// Each of the student's letters earns points by its importance (3, 2, 1), reduced when the
// career has that letter in a different position. An identical code scores 100.
const WEIGHTS = [3, 2, 1];          // importance of the student's 1st, 2nd, 3rd letter
const CLOSENESS = [1, 2 / 3, 1 / 3]; // credit when the position differs by 0, 1, 2
const MAX_SCORE = 6;

export function matchLevel(fit) {
  if (fit >= 80) return "Excellent match";
  if (fit >= 55) return "Strong match";
  if (fit >= 35) return "Good match";
  return "Possible match";
}

export function matchCareers(studentCode, limit = 8) {
  return careerMatches
    .map((career) => {
      let score = 0;
      for (let i = 0; i < 3; i++) {
        const j = career.code.indexOf(studentCode[i]);
        if (j !== -1) score += WEIGHTS[i] * CLOSENESS[Math.abs(i - j)];
      }
      const fit = Math.round((score / MAX_SCORE) * 100);
      return { ...career, fit, level: matchLevel(fit) };
    })
    .filter((c) => c.fit >= 25)
    .sort((a, b) => b.fit - a.fit)
    .slice(0, limit);
}