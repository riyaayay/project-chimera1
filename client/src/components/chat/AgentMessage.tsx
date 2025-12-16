import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Beaker, BarChart3, Scale, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export type AgentType = "bioinformatics" | "market" | "patent" | "system";

interface EvidenceLink {
  label: string;
  url: string;
  type: "pubmed" | "patent" | "clinical" | "market";
}

interface AgentMessageProps {
  agent: AgentType;
  content: string;
  timestamp?: string;
  evidenceLinks?: EvidenceLink[];
  isLoading?: boolean;
}

const agentConfig = {
  bioinformatics: {
    name: "Bioinformatics Expert",
    icon: Beaker,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-l-teal-500",
  },
  market: {
    name: "Market Analyst",
    icon: BarChart3,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-l-amber-500",
  },
  patent: {
    name: "IP/Patent Lawyer",
    icon: Scale,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-l-purple-500",
  },
  system: {
    name: "Chimera AI",
    icon: Bot,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-l-primary",
  },
};

export function AgentMessage({ 
  agent, 
  content, 
  timestamp, 
  evidenceLinks = [],
  isLoading = false 
}: AgentMessageProps) {
  const config = agentConfig[agent];
  const Icon = config.icon;

  return (
    <Card className={cn("border-l-4 border-t-0 border-r-0 border-b-0 rounded-l-none", config.borderColor)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", config.bgColor)}>
            <Icon className={cn("w-4 h-4", config.color)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm">{config.name}</span>
              {timestamp && (
                <span className="text-xs text-muted-foreground">{timestamp}</span>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-sm text-muted-foreground">Analyzing...</span>
              </div>
            ) : (
              <>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {content}
                </p>
                
                {evidenceLinks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {evidenceLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                        data-testid={`link-evidence-${link.type}-${index}`}
                      >
                        <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-muted">
                          <ExternalLink className="w-3 h-3" />
                          {link.label}
                        </Badge>
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
