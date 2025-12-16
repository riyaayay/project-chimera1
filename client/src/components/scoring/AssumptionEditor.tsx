import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Assumptions {
  marketSize: number;
  rdCost: number;
  patentStrength: number;
  competitorCount: number;
}

interface AssumptionEditorProps {
  assumptions: Assumptions;
  onChange: (assumptions: Assumptions) => void;
}

const defaultAssumptions = {
  marketSize: 3200,
  rdCost: 50,
  patentStrength: 85,
  competitorCount: 3,
};

export function AssumptionEditor({ assumptions, onChange }: AssumptionEditorProps) {
  const handleChange = (key: keyof Assumptions, value: number[]) => {
    onChange({ ...assumptions, [key]: value[0] });
  };

  const handleReset = () => {
    onChange(defaultAssumptions);
  };

  return (
    <Card className="bg-muted/30 border-dashed">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium">Adjust Assumptions</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            data-testid="button-reset-assumptions"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Modify inputs to see how they affect the overall score in real-time
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm">Market Size</Label>
            <span className="text-sm font-medium tabular-nums text-muted-foreground">
              ${assumptions.marketSize}M
            </span>
          </div>
          <Slider
            value={[assumptions.marketSize]}
            onValueChange={(value) => handleChange("marketSize", value)}
            min={500}
            max={10000}
            step={100}
            data-testid="slider-market-size"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$500M</span>
            <span>$10B</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm">R&D Cost Estimate</Label>
            <span className="text-sm font-medium tabular-nums text-muted-foreground">
              ${assumptions.rdCost}M
            </span>
          </div>
          <Slider
            value={[assumptions.rdCost]}
            onValueChange={(value) => handleChange("rdCost", value)}
            min={10}
            max={200}
            step={5}
            data-testid="slider-rd-cost"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$10M</span>
            <span>$200M</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm">Patent Strength</Label>
            <span className="text-sm font-medium tabular-nums text-muted-foreground">
              {assumptions.patentStrength}%
            </span>
          </div>
          <Slider
            value={[assumptions.patentStrength]}
            onValueChange={(value) => handleChange("patentStrength", value)}
            min={0}
            max={100}
            step={5}
            data-testid="slider-patent-strength"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Weak</span>
            <span>Strong</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm">Competitor Count</Label>
            <span className="text-sm font-medium tabular-nums text-muted-foreground">
              {assumptions.competitorCount} competitors
            </span>
          </div>
          <Slider
            value={[assumptions.competitorCount]}
            onValueChange={(value) => handleChange("competitorCount", value)}
            min={0}
            max={10}
            step={1}
            data-testid="slider-competitor-count"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>None</span>
            <span>Many</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
