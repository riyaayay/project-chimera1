import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowUpDown, FileText, MoreHorizontal, Eye } from "lucide-react";

interface Opportunity {
  id: string;
  drug: string;
  indication: string;
  overallScore: number;
  plausibility: number;
  profitability: number;
  defensibility: number;
  status: "new" | "in_review" | "approved" | "rejected";
  createdAt: string;
}

// todo: remove mock functionality
const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    drug: "Metformin",
    indication: "Glioblastoma",
    overallScore: 82,
    plausibility: 78,
    profitability: 82,
    defensibility: 85,
    status: "in_review",
    createdAt: "2024-12-14",
  },
  {
    id: "2",
    drug: "Aspirin",
    indication: "Colorectal Cancer Prevention",
    overallScore: 76,
    plausibility: 85,
    profitability: 70,
    defensibility: 72,
    status: "approved",
    createdAt: "2024-12-13",
  },
  {
    id: "3",
    drug: "Propranolol",
    indication: "Infantile Hemangioma",
    overallScore: 89,
    plausibility: 92,
    profitability: 85,
    defensibility: 90,
    status: "approved",
    createdAt: "2024-12-12",
  },
  {
    id: "4",
    drug: "Thalidomide",
    indication: "Multiple Myeloma",
    overallScore: 94,
    plausibility: 95,
    profitability: 92,
    defensibility: 95,
    status: "approved",
    createdAt: "2024-12-11",
  },
  {
    id: "5",
    drug: "Sildenafil",
    indication: "Pulmonary Hypertension",
    overallScore: 91,
    plausibility: 90,
    profitability: 88,
    defensibility: 95,
    status: "new",
    createdAt: "2024-12-10",
  },
];

interface OpportunityTableProps {
  onViewOpportunity: (id: string) => void;
  onGenerateReport: (id: string) => void;
}

export function OpportunityTable({ onViewOpportunity, onGenerateReport }: OpportunityTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof Opportunity>("overallScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredOpportunities = mockOpportunities
    .filter((opp) => {
      const matchesSearch = 
        opp.drug.toLowerCase().includes(search.toLowerCase()) ||
        opp.indication.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortOrder === "asc" 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  const getStatusBadge = (status: Opportunity["status"]) => {
    const variants: Record<Opportunity["status"], { label: string; className: string }> = {
      new: { label: "New", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
      in_review: { label: "In Review", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      approved: { label: "Approved", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
      rejected: { label: "Rejected", className: "bg-red-500/10 text-red-500 border-red-500/20" },
    };
    return variants[status];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-xl">Opportunities Pipeline</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drugs or indications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                data-testid="input-opportunity-search"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32" data-testid="select-status-filter">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drug / Indication</TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (sortBy === "overallScore") {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("overallScore");
                        setSortOrder("desc");
                      }
                    }}
                    className="gap-1"
                  >
                    Score
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-center hidden md:table-cell">Plausibility</TableHead>
                <TableHead className="text-center hidden md:table-cell">Profitability</TableHead>
                <TableHead className="text-center hidden lg:table-cell">Defensibility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opp) => {
                const statusInfo = getStatusBadge(opp.status);
                return (
                  <TableRow key={opp.id} data-testid={`row-opportunity-${opp.id}`}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{opp.drug}</p>
                        <p className="text-sm text-muted-foreground">{opp.indication}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-xl font-bold tabular-nums ${getScoreColor(opp.overallScore)}`}>
                        {opp.overallScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <span className={`font-medium tabular-nums ${getScoreColor(opp.plausibility)}`}>
                        {opp.plausibility}
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <span className={`font-medium tabular-nums ${getScoreColor(opp.profitability)}`}>
                        {opp.profitability}
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      <span className={`font-medium tabular-nums ${getScoreColor(opp.defensibility)}`}>
                        {opp.defensibility}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusInfo.className}>
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onViewOpportunity(opp.id)}
                          data-testid={`button-view-${opp.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onGenerateReport(opp.id)}
                          data-testid={`button-report-${opp.id}`}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
