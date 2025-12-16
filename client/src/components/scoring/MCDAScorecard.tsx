import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Beaker, BarChart3, Scale, Settings2, Lock, Unlock } from "lucide-react";
import { AssumptionEditor } from "./AssumptionEditor";

interface Assumptions {
  marketSize: number;
  rdCost: number;
  patentStrength: number;
  competitorCount: number;
}

interface MCDAScorecardProps {
  drugName: string;
  indication: string;
  plausibility: number;
  profitability: number;
  defensibility: number;
  onAssumptionsChange?: (assumptions: Assumptions) => void;
}

export function MCDAScorecard({
  drugName,
  indication,
  plausibility: initialPlausibility,
  profitability: initialProfitability,
  defensibility: initialDefensibility,
  onAssumptionsChange,
}: MCDAScorecardProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [assumptions, setAssumptions] = useState({
    marketSize: 3200,
    rdCost: 50,
    patentStrength: 85,
    competitorCount: 3,
  });
  
  // Calculate adjusted scores based on assumptions
  const adjustedProfitability = Math.min(100, Math.max(0, 
    initialProfitability + (assumptions.marketSize - 3200) / 100 - (assumptions.rdCost - 50) / 2
  ));
  const adjustedDefensibility = Math.min(100, Math.max(0,
    (initialDefensibility * assumptions.patentStrength) / 85
  ));
  
  const plausibility = initialPlausibility;
  const profitability = Math.round(adjustedProfitability);
  const defensibility = Math.round(adjustedDefensibility);
  
  const overallScore = Math.round((plausibility + profitability + defensibility) / 3);

  const handleAssumptionsChange = (newAssumptions: Assumptions) => {
    setAssumptions(newAssumptions);
    onAssumptionsChange?.(newAssumptions);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">MCDA Scorecard</CardTitle>
            <Badge variant="secondary">{drugName}</Badge>
            <Badge variant="outline">{indication}</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEditor(!showEditor)}
            data-testid="button-edit-assumptions"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {showEditor ? "Hide" : "Edit"} Assumptions
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${overallScore * 2.51} 251`}
                className={getScoreColor(overallScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold tabular-nums ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
              <span className="text-xs text-muted-foreground">Overall</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Beaker className="w-4 h-4 text-teal-500" />
                <span className="text-sm font-medium">Scientific Plausibility</span>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${getScoreColor(plausibility)}`}>
                {plausibility}/100
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(plausibility)}`}
                style={{ width: `${plausibility}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium">Commercial Profitability</span>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${getScoreColor(profitability)}`}>
                {profitability}/100
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(profitability)}`}
                style={{ width: `${profitability}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">IP Defensibility</span>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${getScoreColor(defensibility)}`}>
                {defensibility}/100
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(defensibility)}`}
                style={{ width: `${defensibility}%` }}
              />
            </div>
          </div>
        </div>

        {showEditor && (
          <AssumptionEditor
            assumptions={assumptions}
            onChange={handleAssumptionsChange}
          />
        )}
      </CardContent>
    </Card>
  );
}
