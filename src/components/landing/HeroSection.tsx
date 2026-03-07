import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (repoUrl.trim()) {
      navigate(`/generate?repo=${encodeURIComponent(repoUrl.trim())}`);
    } else {
      navigate("/generate");
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-6">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, hsl(270 80% 60% / 0.12), transparent 70%)", animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-8" style={{ background: "hsl(0 0% 100% / 0.03)" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Documentation
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="gradient-text">RepoScribe</span>
            <br />
            <span className="text-foreground">AI Documentation for</span>
            <br />
            <span className="text-foreground">Your Repositories</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Generate beautiful README files instantly from any GitHub repository. Your AI scribe for perfect repository documentation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="https://github.com/user/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className="w-full px-4 py-3.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            />
          </div>
          <button onClick={handleGenerate} className="glow-button px-6 py-3.5 rounded-lg font-semibold text-primary-foreground flex items-center justify-center gap-2 whitespace-nowrap">
            Generate README
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Floating terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-card p-1 max-w-3xl mx-auto"
        >
          <div className="terminal-panel p-4">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 70% 50%)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 70% 50%)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(120 70% 40%)" }} />
              <span className="ml-2 text-xs text-muted-foreground font-mono">reposcribe — analysis</span>
            </div>
            <div className="space-y-1.5 text-left">
              <p className="font-mono text-xs"><span className="text-primary">$</span> <span className="text-muted-foreground">reposcribe analyze https://github.com/facebook/react</span></p>
              <p className="font-mono text-xs text-green-400">✓ Repository fetched successfully</p>
              <p className="font-mono text-xs text-green-400">✓ Detected: JavaScript, TypeScript</p>
              <p className="font-mono text-xs text-green-400">✓ Framework: React 18.x</p>
              <p className="font-mono text-xs text-green-400">✓ License: MIT</p>
              <p className="font-mono text-xs text-primary">⟩ Generating README.md...</p>
              <p className="font-mono text-xs text-accent">✨ README generated — 847 lines of documentation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
