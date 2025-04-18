
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ToolCard, availableTools, ToolInfo } from "./ToolCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ToolsSectionProps {
  onToolsSelected: (tools: string[]) => void;
}

export function ToolsSection({ onToolsSelected }: ToolsSectionProps) {
  const [tools, setTools] = useState<ToolInfo[]>(availableTools);
  const [searchQuery, setSearchQuery] = useState("");
  const [configuringTool, setConfiguringTool] = useState<ToolInfo | null>(null);
  
  const categories = ["All", ...new Set(tools.map(tool => tool.category))];
  
  const handleToggleTool = (id: string) => {
    setTools(prev => 
      prev.map(tool => 
        tool.id === id ? { ...tool, selected: !tool.selected } : tool
      )
    );
    
    const selectedTools = tools
      .filter(tool => (tool.id === id ? !tool.selected : !!tool.selected))
      .map(tool => tool.id);
    
    onToolsSelected(selectedTools);
  };
  
  const handleConfigureTool = (id: string) => {
    const tool = tools.find(t => t.id === id);
    if (tool) setConfiguringTool(tool);
  };
  
  const filteredTools = (category: string) => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "All" || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Tool Marketplace</CardTitle>
        <CardDescription>
          Select and configure the tools your agent will use to accomplish tasks.
        </CardDescription>
        
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for tools..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="All">
          <TabsList className="mb-4 grid grid-cols-4 h-auto">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs py-1.5"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTools(category).map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onToggle={handleToggleTool}
                    onConfigure={handleConfigureTool}
                  />
                ))}
              </div>
              
              {filteredTools(category).length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No tools found matching your search.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      
      {/* Tool Configuration Dialog */}
      <Dialog open={!!configuringTool} onOpenChange={(open) => !open && setConfiguringTool(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configure {configuringTool?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" placeholder="Enter API key..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-results">Max Results</Label>
              <Input id="max-results" type="number" defaultValue={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeout">Timeout (seconds)</Label>
              <Input id="timeout" type="number" defaultValue={10} />
            </div>
          </div>
          <Button variant="default" onClick={() => setConfiguringTool(null)}>
            Save Configuration
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
