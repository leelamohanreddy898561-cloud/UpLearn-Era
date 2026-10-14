// Prompt library shown on /prompts. {braces} mark the parts to fill in.

export const PROMPTS = [
  {
    id: "pr1",
    title: "Exam Revision Planner",
    category: "Study",
    tags: ["planning", "exams"],
    text: "Act as my study coach. I have {n} days to prepare for {subject}, covering {topics}. Create a day-by-day plan that alternates theory, practice problems and active recall. End each day with a 5-question self-check and a short list of what to revise tomorrow.",
  },
  {
    id: "pr2",
    title: "Notes → Flashcards",
    category: "Study",
    tags: ["anki", "revision"],
    text: "Convert the notes below into Anki-style flashcards. One fact per card, question on the front, answer on the back. Keep answers under 25 words and mark any card that needs a diagram.\n\nNotes:\n{paste notes}",
  },
  {
    id: "pr3",
    title: "Explain This Code Line by Line",
    category: "Coding",
    tags: ["learning", "debugging"],
    text: "Explain the code below line by line, as if I know Python basics but not this library. After the explanation, give me one 3-line practice task that uses the same idea.\n\nCode:\n{paste code}",
  },
  {
    id: "pr4",
    title: "Debug Like a Senior Dev",
    category: "Coding",
    tags: ["debugging"],
    text: "Here is my error and my code. Do not give me the full corrected file. First list the three most likely causes, then ask me the one diagnostic question that would confirm which one it is.\n\nError:\n{error}\nCode:\n{paste code}",
  },
  {
    id: "pr5",
    title: "Final Year Idea Generator",
    category: "Projects",
    tags: ["btech", "ideation"],
    text: "Suggest 5 final-year project ideas for a {branch} student who knows {skills} and has {weeks} weeks. For each idea give: the problem, the dataset or API needed, the ML/AI component, a stretch feature, and the viva questions a reviewer would ask.",
  },
  {
    id: "pr6",
    title: "Project Report Builder",
    category: "Projects",
    tags: ["documentation"],
    text: "Help me structure my project report for {project title}. Give me a chapter-by-chapter outline with the diagrams to include in each, and write the abstract (150 words) from the details below.\n\nDetails:\n{paste details}",
  },
  {
    id: "pr7",
    title: "Resume Bullet Rewriter",
    category: "Career",
    tags: ["resume", "placements"],
    text: "Rewrite these resume bullets for a {role} internship. Use the 'did X by doing Y, measured by Z' pattern, start each with a strong verb, keep each under 20 words, and flag any bullet that has no measurable impact.\n\nBullets:\n{paste bullets}",
  },
  {
    id: "pr8",
    title: "Mock Interviewer (DSA + ML)",
    category: "Career",
    tags: ["interview"],
    text: "Run a mock interview for a {role} role. Ask me one question at a time: start with a {topic} DSA problem, wait for my answer, critique it, then ask one ML concept question. After 5 questions, give me a scorecard with three things to fix.",
  },
];

export const PROMPT_CATEGORIES = ["All", "Study", "Coding", "Projects", "Career"];
