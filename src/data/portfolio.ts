import type { Achievement, Chapter, Experience, Project, SkillDomain } from "@/types/portfolio";

export const chapters: Chapter[] = [
  { number: "01", label: "Introduction" },
  { number: "02", label: "The Engineer" },
  { number: "03", label: "Experience" },
  { number: "04", label: "Projects" },
  { number: "05", label: "Technical Library" },
  { number: "06", label: "Education" },
  { number: "07", label: "Achievements" },
  { number: "08", label: "Contact" },
];

export const profile = {
  name: "Arpit Singh",
  title: "Python Full Stack Developer",
  location: "Kolkata, India",
  degree: "B.Tech Computer Science & Engineering",
  cgpa: "8.80 / 10",
  email: "arpit.singh.dev@example.com",
  github: "github.com/arpit-singh",
  linkedin: "linkedin.com/in/arpit-singh",
  resume: "Resume.pdf",
};

export const experiences: Experience[] = [
  {
    company: "AI WALLAH",
    role: "GenAI / Data Science Intern",
    duration: "Jul 2025 — Aug 2025",
    description: "Explored practical GenAI workflows and data science foundations through applied experiments.",
    contributions: ["Prototyped prompt-led solutions", "Worked through data preparation flows", "Documented experiments and observations"],
    technologies: ["Python", "GenAI", "Pandas"],
  },
  {
    company: "VISHVENA AI",
    role: "Backend Developer / Data Engineering & AI Intern",
    duration: "Nov 2025 — Feb 2026",
    description: "Built backend and data engineering foundations for AI-oriented product work.",
    contributions: ["Shaped API-first backend flows", "Prepared and transformed data", "Connected model thinking to product requirements"],
    technologies: ["Python", "FastAPI", "MongoDB", "Data Pipelines"],
  },
];

export const projects: Project[] = [
  {
    number: "01",
    name: "CraftMyStory",
    slug: "craftmystory",
    category: "AI / Content Platform",
    description: "A thoughtful space for turning raw ideas into structured stories with an intelligent assist.",
    stack: ["Python", "FastAPI", "React", "Gemini"],
    problem: "Creative work often begins as scattered notes without a clear path from first thought to finished story.",
    idea: "Pair a calm writing surface with AI assistance that helps shape—not replace—the writer's point of view.",
    architecture: "A React client communicates with a FastAPI layer, which coordinates content workflows and AI requests.",
    built: ["Structured story creation flow", "Prompt-aware writing assistance", "Clear separation between draft and generated suggestions"],
    features: ["Story prompts", "Draft organization", "AI-assisted ideation"],
    result: "A focused project for exploring how intelligent tools can support a human creative process.",
    github: "github.com/arpit-singh/craftmystory",
  },
  {
    number: "02",
    name: "MedFed",
    slug: "medfed",
    category: "Federated Learning / Privacy",
    description: "A federated learning concept for collaborative medical model training without centralizing sensitive data.",
    stack: ["Python", "Machine Learning", "Federated Learning", "Blockchain"],
    problem: "Hospitals need to learn from collective signals while keeping patient data within their own walls.",
    idea: "Move the model instead of the data: local training, federated aggregation, and an auditable update trail.",
    architecture: "Hospital nodes train locally, send model updates to an aggregation layer, and record the resulting audit event.",
    built: ["Distributed hospital-node concept", "Federated aggregation flow", "Blockchain audit-log direction"],
    features: ["Privacy-preserving training", "Global model updates", "Auditable model history"],
    result: "A clear architecture study in the intersection of machine learning, privacy, and accountable systems.",
    github: "github.com/arpit-singh/medfed",
  },
  {
    number: "03",
    name: "AI Tutor Assistant",
    slug: "ai-tutor-assistant",
    category: "Education / AI",
    description: "An assistant designed to make technical learning more conversational, contextual, and approachable.",
    stack: ["Python", "React", "Gemini", "REST APIs"],
    problem: "Learners can find answers online but still struggle to ask the next useful question.",
    idea: "Create a patient, context-aware study companion that explains concepts and keeps the learner moving.",
    architecture: "A lightweight React interface routes study questions through a Python API and a model-backed response layer.",
    built: ["Conversational learning flow", "Prompt context handling", "A clear answer-first interface"],
    features: ["Concept explanations", "Follow-up questions", "Study-oriented prompts"],
    result: "A practical exploration of making AI feel useful in the small moments of learning.",
    github: "github.com/arpit-singh/ai-tutor-assistant",
  },
  {
    number: "04",
    name: "ZOLA",
    slug: "zola",
    category: "Full Stack Application",
    description: "A full-stack product experiment where a polished front end meets an API-first backend.",
    stack: ["React", "Python", "FastAPI", "PostgreSQL"],
    problem: "Good product ideas become difficult to use when the system beneath them is not designed with clarity.",
    idea: "Treat the interface, data model, and API as one connected product rather than separate implementation tasks.",
    architecture: "A component-led client consumes a small set of typed API resources backed by a relational data model.",
    built: ["Responsive product interface", "Resource-focused API design", "Reusable full-stack patterns"],
    features: ["Responsive flows", "Structured resources", "Backend-first thinking"],
    result: "A full-stack study in turning a product-shaped idea into a coherent, maintainable system.",
    github: "github.com/arpit-singh/zola",
  },
];

export const skillDomains: SkillDomain[] = [
  { label: "Languages", items: ["Python", "JavaScript", "SQL", "C++"] },
  { label: "Backend", items: ["FastAPI", "Flask", "Django", "REST APIs", "JWT Authentication"] },
  { label: "Frontend", items: ["React", "Next.js", "HTML", "CSS"] },
  { label: "Data Science / Machine Learning", items: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "EDA"] },
  { label: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"] },
  { label: "Data Engineering", items: ["ETL Pipelines", "Data Cleaning", "Data Transformation", "Data Pipelines"] },
  { label: "Tools", items: ["Git", "GitHub", "Linux", "Jupyter Notebook", "VS Code", "Postman", "Vercel", "Render", "Railway"] },
];

export const education = [
  { institution: "Sister Nivedita University", degree: "B.Tech", field: "Computer Science & Engineering", period: "2023 — Present", metric: "8.80 / 10", metricLabel: "CGPA" },
  { institution: "Crescent Public School", degree: "Higher Secondary", field: "Science", period: "Completed", metric: "92.6%", metricLabel: "Score" },
];

export const achievements: Achievement[] = [
  { value: "500+", label: "DSA problems solved", note: "Still suspicious of hard DP." },
  { value: "3×", label: "Smart India Hackathon participation", note: "Regional Round qualification" },
  { value: "RECKON 7.0", label: "National Hackathon Finalist Shortlist" },
];

export const certifications = ["Machine Learning & NLP — Edureka", "AI Application Developer — LearnQuest", "Advanced Data Structures & Algorithms"];
