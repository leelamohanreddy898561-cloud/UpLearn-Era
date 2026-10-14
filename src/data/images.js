// Image gallery shown on /images.
// Thumbnails are CSS gradients so the site ships with zero binary assets —
// replace the `grad` values with real image URLs in `src` when ready.

export const IMAGES = [
  { id: "i1", title: "Python Basics Cheat Sheet", category: "Cheat Sheets", caption: "Syntax, data types and control flow on one printable page.", wide: true, grad: "g1" },
  { id: "i2", title: "NumPy Broadcasting Diagram", category: "Diagrams", caption: "How shapes line up during vectorised operations.", grad: "g2" },
  { id: "i3", title: "ML Project Pipeline Infographic", category: "Infographics", caption: "From raw data to a deployed model, step by step.", wide: true, grad: "g3" },
  { id: "i4", title: "Neural Network Poster", category: "Diagrams", caption: "Layers, activations and the forward pass, drawn cleanly.", grad: "g3" },
  { id: "i5", title: "scikit-learn Estimator Map", category: "Cheat Sheets", caption: "Pick the right model in under a minute.", grad: "g2" },
  { id: "i6", title: "Self-Attention Diagram", category: "Diagrams", caption: "Queries, keys and values in a single picture.", wide: true, grad: "g5" },
  { id: "i7", title: "Git & GitHub Workflow Map", category: "Diagrams", caption: "Branch, commit, PR, merge — the student version.", grad: "g6" },
  { id: "i8", title: "DSA Placement Sheet", category: "Cheat Sheets", caption: "450 problems organised by pattern, not by platform.", grad: "g4" },
  { id: "i9", title: "RAG Pipeline Infographic", category: "Infographics", caption: "Chunk, embed, retrieve, generate.", grad: "g4" },
  { id: "i10", title: "CNN Layers Explained", category: "Diagrams", caption: "Filters, feature maps and pooling, visualised.", grad: "g3" },
  { id: "i11", title: "AI Tools Landscape 2026", category: "Infographics", caption: "Every tool worth your time, sorted by job.", wide: true, grad: "g6" },
  { id: "i12", title: "Project Presentation Slides", category: "Slides", caption: "A clean template for your project review.", grad: "g5" },
];

export const IMAGE_CATEGORIES = ["All", "Cheat Sheets", "Diagrams", "Infographics", "Slides"];
