import { motion } from "framer-motion";
import { FileText, Code2, Zap, BarChart3, Shield, GitBranch } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Auto README Generation",
    description: "Generates structured sections: title, description, installation, usage, API docs, and more.",
  },
  {
    icon: Code2,
    title: "Repository Analysis",
    description: "Scans dependencies, languages, frameworks, scripts, and code patterns from any repo.",
  },
  {
    icon: Zap,
    title: "API Documentation",
    description: "Automatically detects and documents API endpoints from backend services.",
  },
  {
    icon: BarChart3,
    title: "Architecture Diagrams",
    description: "Generates Mermaid.js system architecture diagrams from your codebase.",
  },
  {
    icon: Shield,
    title: "Badge Generator",
    description: "Auto-generates tech stack, license, stars, and build status badges.",
  },
  {
    icon: GitBranch,
    title: "Export & Commit",
    description: "Download, copy, or commit your README directly to the repository.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for <span className="gradient-text">perfect docs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            RepoScribe analyzes your entire repository and generates comprehensive, production-ready documentation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--gradient-glow)" }}>
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
