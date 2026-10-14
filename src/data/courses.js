// Courses shown on /courses and the homepage.
// price: 0 means Free. Replace the placeholder copy with your real syllabi.

export const COURSES = [
  {
    id: "python-for-ai",
    title: "Python for AI & Data Science",
    track: "Python",
    level: "Beginner",
    lessons: 26,
    hours: "11h 20m",
    price: 0,
    oldPrice: 0,
    rating: 4.9,
    learners: "12.4K",
    tag: "Free",
    grad: "g1",
    summary:
      "Start from zero — Python, NumPy, Pandas and Matplotlib, taught through tiny AI examples instead of boring exercises.",
    outcomes: [
      "Write clean Python without copying code",
      "Load and clean real datasets with NumPy & Pandas",
      "Plot data and explain what it shows",
      "Ship a mini project end-to-end",
    ],
    curriculum: [
      {
        module: "Getting started",
        items: ["Installing VS Code & Python", "Jupyter notebooks for AI", "Variables, types and f-strings", "Practice: unit converter"],
      },
      {
        module: "Python fundamentals",
        items: ["Lists, tuples, sets and dicts", "Loops that don't feel awkward", "Functions and scope", "File handling", "Practice: marks analyser"],
      },
      {
        module: "NumPy & Pandas",
        items: ["Arrays and vectorisation", "Indexing & broadcasting", "DataFrames and cleaning", "Group-by and merges", "Practice: IPL dataset"],
      },
      {
        module: "Mini project",
        items: ["Matplotlib basics", "Exploratory analysis", "Building a small report", "Publishing your code"],
      },
    ],
  },
  {
    id: "machine-learning-foundations",
    title: "Machine Learning Foundations",
    track: "Machine Learning",
    level: "Intermediate",
    lessons: 34,
    hours: "16h 05m",
    price: 499,
    oldPrice: 999,
    rating: 4.8,
    learners: "8.9K",
    tag: "Bestseller",
    grad: "g2",
    summary:
      "Regression to ensembles — the algorithms interviewers actually ask about, implemented twice: from scratch, then with scikit-learn.",
    outcomes: [
      "Implement core ML algorithms from scratch",
      "Build clean scikit-learn pipelines",
      "Evaluate models honestly (bias–variance, leakage)",
      "Explain any algorithm with a diagram",
    ],
    curriculum: [
      {
        module: "Foundations",
        items: ["What learning means", "Linear regression from scratch", "Gradient descent", "Logistic regression", "Train/validation splits"],
      },
      {
        module: "Supervised learning",
        items: ["k-NN and decision trees", "Random forests & boosting", "SVMs with intuition", "Naive Bayes for text", "Hands-on: spam classifier"],
      },
      {
        module: "Unsupervised & ensembles",
        items: ["K-means and PCA", "Clustering a real dataset", "Bagging vs boosting", "Feature importance"],
      },
      {
        module: "Evaluation & deployment",
        items: ["Metrics that matter", "Cross-validation", "Saving models with joblib", "Building a predict API"],
      },
    ],
  },
  {
    id: "deep-learning-essentials",
    title: "Deep Learning Essentials",
    track: "Deep Learning",
    level: "Intermediate",
    lessons: 30,
    hours: "14h 45m",
    price: 699,
    oldPrice: 1299,
    rating: 4.8,
    learners: "6.2K",
    tag: "Popular",
    grad: "g3",
    summary:
      "Neural networks, CNNs and sequence models in PyTorch, with every forward pass drawn before it is coded.",
    outcomes: [
      "Train networks confidently in PyTorch",
      "Read and modify any CNN architecture",
      "Debug training that won't converge",
      "Fine-tune a pretrained model",
    ],
    curriculum: [
      {
        module: "PyTorch basics",
        items: ["Tensors and autograd", "Your first nn.Module", "DataLoaders", "Training loop anatomy"],
      },
      {
        module: "Training deep nets",
        items: ["Losses and optimisers", "Initialisation and vanishing gradients", "Batch norm & dropout", "Regularisation patterns"],
      },
      {
        module: "CNNs for vision",
        items: ["Convolution intuition", "Building a small ResNet", "Transfer learning", "Hands-on: plant disease detector"],
      },
      {
        module: "Sequences & embeddings",
        items: ["RNNs and LSTMs", "Attention step by step", "Embedding spaces", "Hands-on: next-word model"],
      },
    ],
  },
  {
    id: "generative-ai-llms",
    title: "Generative AI with LLMs",
    track: "Generative AI",
    level: "Intermediate",
    lessons: 28,
    hours: "13h 30m",
    price: 799,
    oldPrice: 1499,
    rating: 4.9,
    learners: "5.1K",
    tag: "New",
    grad: "g5",
    summary:
      "Prompting, RAG, fine-tuning and evaluation — how to build real products on top of LLMs, not just demo chatbots.",
    outcomes: [
      "Design prompts that survive real users",
      "Build a RAG system over private documents",
      "Know when to fine-tune vs retrieve",
      "Evaluate quality with real metrics",
    ],
    curriculum: [
      {
        module: "How LLMs work",
        items: ["Tokens and context windows", "Sampling and temperature", "Why models hallucinate", "Cost and latency basics"],
      },
      {
        module: "Prompting patterns",
        items: ["Structure and constraints", "Few-shot examples", "Chain-of-thought safely", "Tool and function calling"],
      },
      {
        module: "RAG end-to-end",
        items: ["Chunking strategies", "Embeddings & vector stores", "Retrieval pipelines", "Hands-on: notes chatbot"],
      },
      {
        module: "Fine-tuning & evals",
        items: ["LoRA on a small model", "Dataset preparation", "Building an eval set", "Shipping a small app"],
      },
    ],
  },
  {
    id: "ai-agents-automation",
    title: "AI Agents & Automation",
    track: "AI Agents",
    level: "Advanced",
    lessons: 24,
    hours: "12h 10m",
    price: 899,
    oldPrice: 1699,
    rating: 4.7,
    learners: "3.4K",
    tag: "Advanced",
    grad: "g6",
    summary:
      "Agents that plan, use tools and automate your college workflow — built with Python, APIs and a little discipline.",
    outcomes: [
      "Design agent loops with tools and memory",
      "Orchestrate multi-step automations",
      "Handle failures and guardrails",
      "Ship an agent you use daily",
    ],
    curriculum: [
      {
        module: "Agent fundamentals",
        items: ["The agent loop", "Tools as functions", "Planning strategies", "Failure modes"],
      },
      {
        module: "Tool use & memory",
        items: ["Calling real APIs", "Structured outputs", "Short vs long-term memory", "Browser automation"],
      },
      {
        module: "Multi-agent patterns",
        items: ["Router and orchestrator", "Critic–writer loops", "Parallel agents", "Cost control"],
      },
      {
        module: "Capstone",
        items: ["Scoping your study-agent", "Building the pipeline", "Testing and guardrails", "Demo and write-up"],
      },
    ],
  },
  {
    id: "btech-projects-lab",
    title: "B.Tech Projects Lab",
    track: "Projects",
    level: "Intermediate",
    lessons: 22,
    hours: "12h 40m",
    price: 599,
    oldPrice: 1199,
    rating: 4.9,
    learners: "7.3K",
    tag: "Career",
    grad: "g4",
    summary:
      "Six final-year-style projects with code, report structure and viva questions — from an attendance system to a RAG assistant.",
    outcomes: [
      "Pick a project that scores well",
      "Write reports that examiners accept",
      "Answer viva questions confidently",
      "Present a demo that stands out",
    ],
    curriculum: [
      {
        module: "Choosing a project",
        items: ["What reviewers look for", "Scoping in 2 weeks", "Stack selection", "Setting up GitHub"],
      },
      {
        module: "Data projects",
        items: ["Attendance system", "Notes digitizer", "Report writing"],
      },
      {
        module: "ML projects",
        items: ["Resume screener", "Stock price predictor", "Backtesting honestly"],
      },
      {
        module: "AI app projects",
        items: ["RAG assistant", "Study-planner agent", "Documentation & viva prep"],
      },
    ],
  },
];

export const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
export const TRACKS = ["All", "Python", "Machine Learning", "Deep Learning", "Generative AI", "AI Agents", "Projects"];

export function getCourse(id) {
  return COURSES.find((c) => c.id === id);
}
