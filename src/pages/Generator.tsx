import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowLeft, Copy, Download, Check, Loader2, Search, Cpu, Code2, FileDown, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

const ANALYSIS_STEPS = [
  { label: "Fetching repository data", icon: Search },
  { label: "Scanning project structure", icon: Code2 },
  { label: "Detecting technologies", icon: Cpu },
  { label: "Generating documentation", icon: Sparkles },
  { label: "Building README file", icon: FileDown },
];

const generateMockReadme = (repoUrl: string) => {
  const parts = repoUrl.replace("https://github.com/", "").split("/");
  const owner = parts[0] || "user";
  const repo = parts[1] || "repository";
  const repoName = repo.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return `# ${repoName}

> ${repoName} — A modern, scalable project built with cutting-edge technologies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/${owner}/${repo})
![Last commit](https://img.shields.io/github/last-commit/${owner}/${repo})
![Build](https://img.shields.io/badge/build-passing-brightgreen)

## 📖 Description

${repoName} is an open-source project designed to deliver a high-quality developer experience. It leverages modern frameworks and best practices to ensure maintainability and performance.

## ✨ Features

- ⚡ **Lightning-fast performance** — Optimized build pipeline
- 🔒 **Secure by default** — Built-in security best practices
- 📱 **Responsive design** — Works on all devices
- 🧩 **Modular architecture** — Easy to extend and customize
- 🌍 **Internationalization** — Multi-language support ready
- 📊 **Analytics integration** — Track usage and performance

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React, TypeScript, TailwindCSS |
| Backend | Node.js, Express |
| Database | PostgreSQL, Redis |
| DevOps | Docker, GitHub Actions |
| Testing | Vitest, Playwright |

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/${owner}/${repo}.git

# Navigate to the project directory
cd ${repo}

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev
\`\`\`

## 🚀 Usage

\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
\`\`\`

## 📁 Project Structure

\`\`\`
${repo}/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── tests/             # Test files
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## 🔌 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/health\` | Health check |
| GET | \`/api/users\` | Fetch all users |
| POST | \`/api/users\` | Create a new user |
| GET | \`/api/users/:id\` | Get user by ID |
| PUT | \`/api/users/:id\` | Update user |
| DELETE | \`/api/users/:id\` | Delete user |

### Example Request

\`\`\`bash
curl -X GET https://api.example.com/api/users \\
  -H "Authorization: Bearer <token>"
\`\`\`

## 🏗️ Architecture

\`\`\`
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Server  │────▶│ Database │
│  (React) │     │ (Node.js)│     │ (Postgres)│
└──────────┘     └────┬─────┘     └──────────┘
                      │
                 ┌────▼─────┐
                 │  Cache   │
                 │ (Redis)  │
                 └──────────┘
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Built with [React](https://react.dev) and [TypeScript](https://typescriptlang.org)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/${owner}">${owner}</a>
</p>
`;
};

const Generator = () => {
  const [searchParams] = useSearchParams();
  const [repoUrl, setRepoUrl] = useState(searchParams.get("repo") || "");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [readme, setReadme] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"markdown" | "preview">("preview");

  const runAnalysis = useCallback(async () => {
    if (!repoUrl.trim()) {
      toast.error("Please enter a GitHub repository URL");
      return;
    }

    setIsAnalyzing(true);
    setReadme("");
    setCurrentStep(0);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    }

    const generatedReadme = generateMockReadme(repoUrl.trim());
    setReadme(generatedReadme);
    setIsAnalyzing(false);
    setCurrentStep(-1);
    toast.success("README generated successfully!");
  }, [repoUrl]);

  useEffect(() => {
    if (searchParams.get("repo")) {
      runAnalysis();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("README.md downloaded!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border" style={{ background: "hsl(0 0% 6% / 0.8)", backdropFilter: "blur(16px)" }}>
        <div className="container mx-auto flex items-center justify-between h-14 px-6">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-bold gradient-text">RepoScribe</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="https://github.com/user/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runAnalysis()}
            disabled={isAnalyzing}
            className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm disabled:opacity-50"
          />
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="glow-button px-6 py-3 rounded-lg font-semibold text-primary-foreground flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze Repository
              </>
            )}
          </button>
        </div>

        {/* Analysis Steps */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="terminal-panel p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 70% 50%)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 70% 50%)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(120 70% 40%)" }} />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">analysis — running</span>
                </div>
                <div className="space-y-3">
                  {ANALYSIS_STEPS.map((step, i) => {
                    const StepIcon = step.icon;
                    const isActive = i === currentStep;
                    const isDone = i < currentStep;
                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
                        className="flex items-center gap-3 font-mono text-sm"
                      >
                        {isDone ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                        ) : (
                          <StepIcon className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={isDone ? "text-green-400" : isActive ? "text-primary" : "text-muted-foreground"}>
                          {step.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output */}
        {readme && !isAnalyzing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1 p-1 rounded-lg bg-secondary">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "preview" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("markdown")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "markdown" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Markdown
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors bg-secondary">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors bg-secondary">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="glass-card p-1">
              <div className="terminal-panel">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 70% 50%)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 70% 50%)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(120 70% 40%)" }} />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">README.md — {activeTab}</span>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {activeTab === "preview" ? (
                    <div className="markdown-preview">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
                    </div>
                  ) : (
                    <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {readme}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {!readme && !isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-border" style={{ background: "var(--gradient-surface)" }}>
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to generate</h3>
            <p className="text-muted-foreground max-w-md">
              Paste a GitHub repository URL above and click "Analyze Repository" to generate a professional README.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
