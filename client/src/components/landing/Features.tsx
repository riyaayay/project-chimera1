import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  FileText, 
  GitBranch, 
  Search,
  type LucideIcon 
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "Multi-Agent AI Analysis",
    description: "Three specialized AI agents collaborate: Bioinformatics Expert, Market Analyst, and IP/Patent Lawyer work together to evaluate opportunities.",
  },
  {
    icon: TrendingUp,
    title: "MCDA Scoring Framework",
    description: "Quantitative scoring on three axes: Scientific Plausibility, Commercial Profitability, and IP Defensibility with transparent methodology.",
  },
  {
    icon: Shield,
    title: "IP Defensibility Assessment",
    description: "Automated patent landscape analysis with links to USPTO, Google Patents, and EPO for every claim made.",
  },
  {
    icon: FileText,
    title: "Investment-Ready Reports",
    description: "Generate professional BD reports with executive summaries, evidence citations, and actionable recommendations.",
  },
  {
    icon: GitBranch,
    title: "Knowledge Graph Reasoning",
    description: "Traverse relationships between drugs, targets, indications, and patents using our Pharma-Commercial Knowledge Graph.",
  },
  {
    icon: Search,
    title: "Live Evidence Sourcing",
    description: "Every claim linked to PubMed, ClinicalTrials.gov, and patent databases. No hallucinations, only verified facts.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Enterprise-Grade AI Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for pharmaceutical BD teams making high-stakes investment decisions. 
            Not a chatbot—a complete R&D deal team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
