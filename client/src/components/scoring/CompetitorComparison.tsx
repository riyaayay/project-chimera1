import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus, Trophy, Target } from "lucide-react";

interface CompetitorComparisonProps {
  proposedDrug: string;
  proposedScore: number;
  competitorDrug: string;
  competitorScore: number;
}

export function CompetitorComparison({
  proposedDrug,
  proposedScore,
  competitorDrug,
  competitorScore,
}: CompetitorComparisonProps) {
  const difference = proposedScore - competitorScore;
  const percentageGain = Math.round((difference / competitorScore) * 100);

  const getDifferenceIcon = () => {
    if (difference > 0) return <ArrowUp className="w-4 h-4" />;
    if (difference < 0) return <ArrowDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getDifferenceColor = () => {
    if (difference > 0) return "text-emerald-500 bg-emerald-500/10";
    if (difference < 0) return "text-red-500 bg-red-500/10";
    return "text-muted-foreground bg-muted";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-muted-foreground" />
          <CardTitle className="text-lg">Competitor Comparison</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Proposed Asset
              </span>
            </div>
            <p className="font-semibold mb-2">{proposedDrug}</p>
            <div className="text-4xl font-bold text-primary tabular-nums">
              {proposedScore}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Standard of Care
              </span>
            </div>
            <p className="font-semibold mb-2">{competitorDrug}</p>
            <div className="text-4xl font-bold text-muted-foreground tabular-nums">
              {competitorScore}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg border border-border flex items-center justify-center gap-3">
          <Badge className={getDifferenceColor()}>
            {getDifferenceIcon()}
            <span className="ml-1">
              {difference > 0 ? "+" : ""}{difference} points
            </span>
          </Badge>
          <span className="text-sm text-muted-foreground">
            {difference > 0 
              ? `${percentageGain}% improvement over current standard`
              : difference < 0
              ? `${Math.abs(percentageGain)}% below current standard`
              : "Equal to current standard"
            }
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
