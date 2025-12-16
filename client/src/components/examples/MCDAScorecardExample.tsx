import { MCDAScorecard } from "@/components/scoring/MCDAScorecard";

export default function MCDAScorecardExample() {
  return (
    <div className="max-w-lg">
      <MCDAScorecard
        drugName="Metformin"
        indication="Glioblastoma"
        plausibility={78}
        profitability={82}
        defensibility={85}
      />
    </div>
  );
}
