import { Link } from "react-router-dom";
import { Github, FileText, Zap, Code2, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DemoPreviewSection from "@/components/landing/DemoPreviewSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoPreviewSection />
      <Footer />
    </div>
  );
};

export default Landing;
