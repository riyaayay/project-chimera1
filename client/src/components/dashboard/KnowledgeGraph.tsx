import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, RefreshCw } from "lucide-react";
import { useState } from "react";

// todo: remove mock functionality - This is a simplified visual representation
// In production, use a proper graph visualization library like D3.js or vis.js

interface GraphNode {
  id: string;
  label: string;
  type: "drug" | "target" | "indication" | "patent" | "mechanism";
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

const mockNodes: GraphNode[] = [
  { id: "1", label: "Metformin", type: "drug", x: 200, y: 150 },
  { id: "2", label: "AMPK", type: "target", x: 350, y: 80 },
  { id: "3", label: "mTOR", type: "mechanism", x: 350, y: 220 },
  { id: "4", label: "Glioblastoma", type: "indication", x: 500, y: 150 },
  { id: "5", label: "US4080472", type: "patent", x: 100, y: 80 },
  { id: "6", label: "Type 2 Diabetes", type: "indication", x: 100, y: 220 },
];

const mockEdges: GraphEdge[] = [
  { from: "1", to: "2", label: "activates" },
  { from: "1", to: "3", label: "inhibits" },
  { from: "2", to: "4", label: "pathway to" },
  { from: "3", to: "4", label: "implicated in" },
  { from: "5", to: "1", label: "protects" },
  { from: "1", to: "6", label: "treats" },
];

const nodeColors: Record<GraphNode["type"], string> = {
  drug: "#3b82f6",
  target: "#14b8a6",
  indication: "#f59e0b",
  patent: "#8b5cf6",
  mechanism: "#ec4899",
};

export function KnowledgeGraph() {
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setSelectedNode(null);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Knowledge Graph</CardTitle>
            <Badge variant="secondary">Metformin Network</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleZoomIn} data-testid="button-zoom-in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleZoomOut} data-testid="button-zoom-out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} data-testid="button-reset-graph">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-fullscreen">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-muted/30 rounded-lg overflow-hidden border border-border">
          <svg
            className="w-full h-full"
            viewBox="0 0 600 300"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
          >
            {mockEdges.map((edge, index) => {
              const fromNode = mockNodes.find((n) => n.id === edge.from);
              const toNode = mockNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <g key={index}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 5}
                    fontSize="8"
                    fill="currentColor"
                    textAnchor="middle"
                    className="text-muted-foreground"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}
            
            {mockNodes.map((node) => (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                className="cursor-pointer"
                data-testid={`node-${node.id}`}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={selectedNode === node.id ? 28 : 24}
                  fill={nodeColors[node.type]}
                  opacity={selectedNode && selectedNode !== node.id ? 0.4 : 1}
                  className="transition-all duration-200"
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  fontSize="9"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {node.label.length > 10 ? node.label.slice(0, 10) + "..." : node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(nodeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
