import { motion } from "framer-motion";
import { Link2, Search, Cpu, FileDown } from "lucide-react";

const steps = [
  { icon: Link2, title: "Paste URL", description: "Enter your GitHub repository URL" },
  { icon: Search, title: "Analyze", description: "AI scans structure, deps, and patterns" },
  { icon: Cpu, title: "Generate", description: "AI generates comprehensive documentation" },
  { icon: FileDown, title: "Export", description: "Download, copy, or commit to GitHub" },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, transparent, hsl(0 0% 4%), transparent)" }}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">RepoScribe</span> works
          </h2>
          <p className="text-muted-foreground text-lg">Four simple steps to perfect documentation</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-border" style={{ background: "var(--gradient-surface)" }}>
                <step.icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center glow-button text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
