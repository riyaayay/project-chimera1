import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Ready to Transform Your Pipeline?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
          Stop leaving value on the table. Let Project Chimera identify your next 
          high-value drug repurposing opportunity with enterprise-grade AI.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-8 py-6 text-lg bg-white text-primary hover:bg-white/90"
            data-testid="button-cta-start"
          >
            Start Free Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg border-white/30 text-white bg-transparent hover:bg-white/10"
            data-testid="button-schedule-demo"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
