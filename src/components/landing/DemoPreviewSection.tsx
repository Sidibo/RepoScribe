import { motion } from "framer-motion";

const DEMO_MARKDOWN = `# 🚀 My Awesome Project

> A modern full-stack application built with React and Node.js

![License](https://img.shields.io/badge/license-MIT-blue)
![Stars](https://img.shields.io/github/stars/user/repo)

## Features

- ⚡ Lightning-fast performance
- 🔒 Built-in authentication
- 📊 Real-time analytics dashboard
- 🎨 Customizable themes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Deploy | Docker, AWS |

## Installation

\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
npm run dev
\`\`\``;

const DemoPreviewSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See it in <span className="gradient-text">action</span>
          </h2>
          <p className="text-muted-foreground text-lg">A preview of what RepoScribe generates</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-1"
        >
          <div className="terminal-panel">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 70% 50%)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 70% 50%)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(120 70% 40%)" }} />
              <span className="ml-2 text-xs text-muted-foreground font-mono">README.md — preview</span>
            </div>
            <pre className="p-6 text-sm font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {DEMO_MARKDOWN}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoPreviewSection;
