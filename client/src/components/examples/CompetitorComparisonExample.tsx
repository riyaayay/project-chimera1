import { CompetitorComparison } from "@/components/scoring/CompetitorComparison";

export default function CompetitorComparisonExample() {
  return (
    <div className="max-w-lg">
      <CompetitorComparison
        proposedDrug="Metformin"
        proposedScore={82}
        competitorDrug="Temozolomide"
        competitorScore={60}
      />
    </div>
  );
}
