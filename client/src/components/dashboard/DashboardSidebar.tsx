import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Database, 
  Settings,
  ChevronRight,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
  { icon: MessageSquare, label: "AI Analysis", path: "analysis", badge: 2 },
  { icon: FileText, label: "Reports", path: "reports" },
  { icon: Database, label: "Knowledge Graph", path: "knowledge-graph" },
  { icon: Settings, label: "Settings", path: "settings" },
];

interface DashboardSidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

export function DashboardSidebar({ activePath, onNavigate }: DashboardSidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-sidebar h-full flex flex-col">
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => onNavigate(item.path)}
              className={cn(
                "w-full justify-start gap-3 px-3",
                activePath === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              data-testid={`nav-${item.path}`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {activePath === item.path && (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-sm font-medium mb-1">Analysis Credits</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>47 / 100 remaining</span>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
              Upgrade
            </Button>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[47%] bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  );
}
