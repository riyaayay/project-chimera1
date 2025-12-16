import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beaker, BarChart3, Scale, ExternalLink } from "lucide-react";

const agents = [
  {
    name: "Bioinformatics Expert",
    icon: Beaker,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-l-teal-500",
    description: "Analyzes scientific plausibility of drug-indication pairings using mechanism of action, target biology, and clinical evidence.",
    sampleOutput: "Metformin shows strong mechanistic rationale for glioblastoma via AMPK activation and mTOR inhibition pathway.",
    sources: ["PubMed: PMID 34567890", "ClinicalTrials: NCT04567890"],
  },
  {
    name: "Market Analyst",
    icon: BarChart3,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-l-amber-500",
    description: "Evaluates commercial viability including market size, competitive landscape, pricing potential, and reimbursement pathways.",
    sampleOutput: "Glioblastoma market: $3.2B globally. Current SOC Temozolomide at $15K/year. Premium pricing potential: $45K/year.",
    sources: ["IQVIA Market Report 2024", "GlobalData Oncology"],
  },
  {
    name: "IP/Patent Lawyer",
    icon: Scale,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-l-purple-500",
    description: "Assesses patent landscape, exclusivity opportunities, and legal defensibility of method-of-use claims.",
    sampleOutput: "Base patent expired 2002. Method-of-use claim opportunity for oncology indication. Freedom to operate confirmed.",
    sources: ["USPTO: US10234567", "EPO: EP2345678"],
  },
];

export function AgentShowcase() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Multi-Agent System</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Three Experts. One Decision.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each opportunity is evaluated by specialized AI agents that collaborate 
            to produce a comprehensive, auditable assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.name} className={`border-l-4 ${agent.borderColor} border-t-0 border-r-0 border-b-0 rounded-l-none`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${agent.bgColor} flex items-center justify-center`}>
                    <agent.icon className={`w-5 h-5 ${agent.color}`} />
                  </div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
                
                <div className="p-3 rounded-md bg-muted/50 border border-border/50">
                  <p className="text-sm font-medium mb-2">Sample Analysis:</p>
                  <p className="text-sm text-muted-foreground italic">
                    "{agent.sampleOutput}"
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Evidence Sources:
                  </p>
                  {agent.sources.map((source) => (
                    <a
                      key={source}
                      href="#"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                      data-testid={`link-source-${source.split(':')[0].toLowerCase()}`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      {source}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
