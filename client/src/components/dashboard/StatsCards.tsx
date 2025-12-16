import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, FileText, Target, Clock } from "lucide-react";

// todo: remove mock functionality
const stats = [
  {
    title: "Total Opportunities",
    value: "47",
    change: "+12 this month",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "Avg. Score",
    value: "78.5",
    change: "+3.2 from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Reports Generated",
    value: "23",
    change: "8 pending review",
    changeType: "neutral" as const,
    icon: FileText,
  },
  {
    title: "Avg. Analysis Time",
    value: "2.4m",
    change: "-45s improvement",
    changeType: "positive" as const,
    icon: Clock,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{stat.value}</div>
            <p className={`text-xs mt-1 ${
              stat.changeType === "positive" 
                ? "text-emerald-500" 
                : "text-muted-foreground"
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
