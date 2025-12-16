import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { AgentShowcase } from "@/components/landing/AgentShowcase";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/dashboard");
  };

  const handleWatchDemo = () => {
    console.log("Watch demo clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-lg">Chimera</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Technology
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setLocation("/dashboard")} data-testid="button-login">
              Login
            </Button>
            <Button size="sm" onClick={handleGetStarted} data-testid="button-header-start">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Hero onGetStarted={handleGetStarted} onWatchDemo={handleWatchDemo} />
        <div id="features">
          <Features />
        </div>
        <div id="agents">
          <AgentShowcase />
        </div>
        <CTASection onGetStarted={handleGetStarted} />
      </main>

      <Footer />
    </div>
  );
}
