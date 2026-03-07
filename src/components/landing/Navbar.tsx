import { Link } from "react-router-dom";
import { FileText, Github } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ background: "hsl(0 0% 6% / 0.8)", backdropFilter: "blur(16px)" }}>
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold gradient-text">RepoScribe</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <Link to="/generate" className="glow-button px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
