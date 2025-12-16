import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/pharma_molecular_network_visualization.png";

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/80 font-medium">Enterprise AI for Pharma R&D</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6">
          Transform Generic Drugs into
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            High-Value Opportunities
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          Project Chimera uses multi-agent AI to identify scientifically plausible, commercially profitable, 
          and legally defensible drug repurposing opportunities. Generate investment-grade reports in minutes, not months.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-8 py-6 text-lg bg-white text-slate-900 hover:bg-white/90"
            data-testid="button-get-started"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onWatchDemo}
            className="px-8 py-6 text-lg border-white/30 text-white backdrop-blur-sm bg-white/5"
            data-testid="button-watch-demo"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        
        <p className="mt-12 text-sm text-white/50">
          Trusted by leading pharmaceutical BD teams worldwide
        </p>
      </div>
    </section>
  );
}
