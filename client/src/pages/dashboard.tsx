import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OpportunityTable } from "@/components/dashboard/OpportunityTable";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { KnowledgeGraph } from "@/components/dashboard/KnowledgeGraph";
import { useToast } from "@/hooks/use-toast";

type ActiveView = "dashboard" | "analysis" | "reports" | "knowledge-graph" | "settings";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const { toast } = useToast();

  const handleNewAnalysis = () => {
    setActiveView("analysis");
  };

  const handleViewOpportunity = (id: string) => {
    toast({
      title: "Opening Opportunity",
      description: `Viewing analysis for opportunity ${id}`,
    });
    setActiveView("analysis");
  };

  const handleGenerateReport = (id: string) => {
    toast({
      title: "Generating Report",
      description: `Creating investment report for opportunity ${id}`,
    });
  };

  const renderContent = () => {
    switch (activeView) {
      case "analysis":
        return <ChatInterface />;
      case "knowledge-graph":
        return (
          <div className="p-6">
            <KnowledgeGraph />
          </div>
        );
      case "reports":
        return (
          <div className="p-6">
            <OpportunityTable
              onViewOpportunity={handleViewOpportunity}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
              <p className="text-muted-foreground">
                Configure your Project Chimera preferences and API integrations.
              </p>
            </div>
          </div>
        );
      case "dashboard":
      default:
        return (
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
              <p className="text-muted-foreground">
                Here's an overview of your drug repurposing pipeline
              </p>
            </div>
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OpportunityTable
                onViewOpportunity={handleViewOpportunity}
                onGenerateReport={handleGenerateReport}
              />
              <KnowledgeGraph />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader onNewAnalysis={handleNewAnalysis} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activePath={activeView} onNavigate={(path) => setActiveView(path as ActiveView)} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
