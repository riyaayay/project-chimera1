import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentMessage, type AgentType } from "./AgentMessage";
import { ChatInput } from "./ChatInput";
import { MCDAScorecard } from "@/components/scoring/MCDAScorecard";
import { CompetitorComparison } from "@/components/scoring/CompetitorComparison";

interface Message {
  id: string;
  agent: AgentType;
  content: string;
  timestamp: string;
  evidenceLinks?: Array<{
    label: string;
    url: string;
    type: "pubmed" | "patent" | "clinical" | "market";
  }>;
}

// todo: remove mock functionality
const mockMessages: Message[] = [
  {
    id: "1",
    agent: "system",
    content: "Welcome to Project Chimera. I'm your AI-powered drug repurposing analyst. Describe a drug or indication you'd like to explore, and I'll coordinate our expert agents to evaluate the opportunity.",
    timestamp: "10:30 AM",
  },
];

// todo: remove mock functionality
const mockAnalysisMessages: Message[] = [
  {
    id: "2",
    agent: "bioinformatics",
    content: "Analyzing Metformin for glioblastoma...\n\nMetformin demonstrates strong mechanistic rationale through AMPK activation, which inhibits mTOR signaling—a pathway frequently dysregulated in glioblastoma. Additionally, metformin crosses the blood-brain barrier and has shown anti-proliferative effects in GBM cell lines at clinically achievable concentrations.\n\nScientific Plausibility Score: 78/100",
    timestamp: "10:31 AM",
    evidenceLinks: [
      { label: "PMID: 34567890", url: "https://pubmed.ncbi.nlm.nih.gov/34567890/", type: "pubmed" },
      { label: "NCT04567890", url: "https://clinicaltrials.gov/study/NCT04567890", type: "clinical" },
    ],
  },
  {
    id: "3",
    agent: "market",
    content: "Market analysis for Metformin in glioblastoma:\n\nThe global glioblastoma market is valued at $3.2B with a 7.2% CAGR. Current standard of care (Temozolomide) is priced at $15K/year with significant unmet need—median survival remains under 15 months.\n\nMetformin's generic status enables competitive pricing while maintaining healthy margins. Estimated addressable market: $180M annually in the US alone.\n\nCommercial Profitability Score: 82/100",
    timestamp: "10:32 AM",
    evidenceLinks: [
      { label: "IQVIA Market Report 2024", url: "https://www.iqvia.com/insights", type: "market" },
      { label: "GlobalData Oncology", url: "https://www.globaldata.com/store/report/glioblastoma-market-analysis/", type: "market" },
    ],
  },
  {
    id: "4",
    agent: "patent",
    content: "IP landscape assessment:\n\nMetformin's base compound patent (US4,080,472) expired in 2002. However, method-of-use patent opportunities exist for oncology indications. Key considerations:\n\n• No active patents blocking GBM indication\n• Orphan Drug designation pathway available (7-year exclusivity)\n• Potential for formulation patents (extended-release CNS-targeting)\n\nFreedom to operate: CONFIRMED\n\nIP Defensibility Score: 85/100",
    timestamp: "10:33 AM",
    evidenceLinks: [
      { label: "USPTO: US4080472", url: "https://patents.google.com/patent/US4080472", type: "patent" },
      { label: "FDA Orphan Drug List", url: "https://www.accessdata.fda.gov/scripts/opdlisting/oopd/", type: "patent" },
    ],
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<AgentType | null>(null);

  // todo: remove mock functionality - replace with actual API call
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      agent: "system",
      content: `Analyzing: "${content}"\n\nInitiating multi-agent analysis...`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsAnalyzing(true);

    // Simulate agent responses
    const agents: AgentType[] = ["bioinformatics", "market", "patent"];
    
    for (let i = 0; i < agents.length; i++) {
      setCurrentAgent(agents[i]);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessages((prev) => [...prev, { ...mockAnalysisMessages[i], id: `${Date.now()}-${i}` }]);
    }
    
    setCurrentAgent(null);
    setIsAnalyzing(false);
    setShowScorecard(true);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <AgentMessage
              key={message.id}
              agent={message.agent}
              content={message.content}
              timestamp={message.timestamp}
              evidenceLinks={message.evidenceLinks}
            />
          ))}
          
          {currentAgent && (
            <AgentMessage
              agent={currentAgent}
              content=""
              isLoading={true}
            />
          )}
          
          {showScorecard && (
            <div className="space-y-4 mt-6">
              <MCDAScorecard
                drugName="Metformin"
                indication="Glioblastoma"
                plausibility={78}
                profitability={82}
                defensibility={85}
              />
              <CompetitorComparison
                proposedDrug="Metformin"
                proposedScore={82}
                competitorDrug="Temozolomide"
                competitorScore={60}
              />
            </div>
          )}
        </div>
      </ScrollArea>
      
      <ChatInput onSend={handleSendMessage} isLoading={isAnalyzing} />
    </div>
  );
}
