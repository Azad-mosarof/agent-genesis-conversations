
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LucideIcon, Settings, Bot, Search, Database, Zap } from "lucide-react";

export interface ToolInfo {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  popular?: boolean;
  selected?: boolean;
}

interface ToolCardProps {
  tool: ToolInfo;
  onToggle: (id: string) => void;
  onConfigure: (id: string) => void;
}

export function ToolCard({ tool, onToggle, onConfigure }: ToolCardProps) {
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${tool.selected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-muted p-2">
              <tool.icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">{tool.name}</CardTitle>
          </div>
          <Switch 
            checked={!!tool.selected} 
            onCheckedChange={() => onToggle(tool.id)} 
            className="data-[state=checked]:bg-primary"
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs">{tool.category}</Badge>
          {tool.popular && (
            <Badge className="bg-green-500/10 text-green-500 text-xs hover:bg-green-500/20">Popular</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-3 line-clamp-2">{tool.description}</CardDescription>
        {tool.selected && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs" 
            onClick={() => onConfigure(tool.id)}
          >
            <Settings className="mr-2 h-3 w-3" />
            Configure
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Predefined tools for demo
export const availableTools: ToolInfo[] = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the internet for real-time information and data.",
    icon: Search,
    category: "Data Retrieval",
    popular: true,
  },
  {
    id: "knowledge-base",
    name: "Knowledge Base",
    description: "Access and query your private document repository.",
    icon: Database,
    category: "Data Storage",
    popular: true,
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    description: "Delegate complex reasoning tasks to a specialized AI model.",
    icon: Bot,
    category: "AI & ML",
    popular: true,
  },
  {
    id: "function-call",
    name: "Function Calling",
    description: "Execute custom code or third-party API integrations.",
    icon: Zap,
    category: "Integration",
  },
];
