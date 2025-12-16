import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, Bell, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  onNewAnalysis: () => void;
}

export function DashboardHeader({ onNewAnalysis }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline">Chimera</span>
        </div>
        
        <div className="relative max-w-md flex-1 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities, drugs, indications..."
            className="pl-10"
            data-testid="input-dashboard-search"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button onClick={onNewAnalysis} data-testid="button-new-analysis">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">New Analysis</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>
        
        <ThemeToggle />
      </div>
    </header>
  );
}
