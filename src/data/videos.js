// Video library shown on /videos and the homepage ticker.
// `yt` links point to the channel — swap them for each video's real URL.

export const SITE_YOUTUBE = "https://www.youtube.com/@uplearnera";

export const VIDEOS = [
  { id: "v1", title: "Python Setup for AI — VS Code, Anaconda & Jupyter in 20 Minutes", topic: "AI Basics", level: "Beginner", duration: "20:14", views: 48200, date: "2025-11-02", grad: "g1", yt: SITE_YOUTUBE },
  { id: "v2", title: "NumPy Crash Course — Arrays, Indexing & Vectorisation", topic: "AI Basics", level: "Beginner", duration: "34:02", views: 39600, date: "2025-11-16", grad: "g2", yt: SITE_YOUTUBE },
  { id: "v3", title: "Pandas in One Video — Cleaning Data Like a Pro", topic: "AI Basics", level: "Beginner", duration: "41:37", views: 44100, date: "2025-12-01", grad: "g2", yt: SITE_YOUTUBE },
  { id: "v4", title: "Linear Regression from Scratch (No scikit-learn)", topic: "Machine Learning", level: "Intermediate", duration: "28:45", views: 31500, date: "2025-12-18", grad: "g3", yt: SITE_YOUTUBE },
  { id: "v5", title: "How Neural Networks Learn — Backpropagation Visualised", topic: "Deep Learning", level: "Intermediate", duration: "37:12", views: 52800, date: "2026-01-06", badge: "Popular", grad: "g3", yt: SITE_YOUTUBE },
  { id: "v6", title: "Build Your First Classifier with scikit-learn", topic: "Machine Learning", level: "Beginner", duration: "25:09", views: 27400, date: "2026-01-20", grad: "g2", yt: SITE_YOUTUBE },
  { id: "v7", title: "Transformers Explained — Self-Attention in 15 Minutes", topic: "Deep Learning", level: "Intermediate", duration: "15:52", views: 61200, date: "2026-02-03", grad: "g5", yt: SITE_YOUTUBE },
  { id: "v8", title: "Build a RAG Chatbot Over Your College Notes", topic: "Generative AI", level: "Intermediate", duration: "52:40", views: 38900, date: "2026-02-21", badge: "New", grad: "g4", yt: SITE_YOUTUBE },
  { id: "v9", title: "Fine-tune a Small LLM With LoRA (Free Colab)", topic: "Generative AI", level: "Advanced", duration: "48:18", views: 22300, date: "2026-03-10", badge: "New", grad: "g5", yt: SITE_YOUTUBE },
  { id: "v10", title: "10 AI Tools Every B.Tech Student Should Use", topic: "AI Tools", level: "Beginner", duration: "18:26", views: 72100, date: "2026-03-24", grad: "g6", yt: SITE_YOUTUBE },
  { id: "v11", title: "Prompt Patterns That Actually Work", topic: "AI Tools", level: "Beginner", duration: "22:31", views: 53400, date: "2026-04-07", grad: "g6", yt: SITE_YOUTUBE },
  { id: "v12", title: "Final Year Project Demo — AI Attendance System", topic: "Projects", level: "Intermediate", duration: "31:55", views: 29500, date: "2026-04-25", grad: "g1", yt: SITE_YOUTUBE },
];

export const VIDEO_TOPICS = ["All", "AI Basics", "Machine Learning", "Deep Learning", "Generative AI", "AI Tools", "Projects"];
