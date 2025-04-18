
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Braces, 
  BrainCircuit, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Database 
} from "lucide-react";

export function WorkflowPreview() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Agent Workflow</CardTitle>
        <CardDescription>
          The execution flow for processing user requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-2">
          {/* User Input */}
          <div className="w-full max-w-xs rounded-lg border bg-muted p-3 text-center">
            <span className="text-sm font-medium">User Request</span>
          </div>
          
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
          
          {/* Planner */}
          <div className="w-full max-w-xs rounded-lg border bg-primary/10 p-3 text-center">
            <div className="mb-1 flex items-center justify-center gap-1.5">
              <BrainCircuit className="h-4 w-4" />
              <span className="text-sm font-medium">Planner</span>
            </div>
            <p className="text-xs text-muted-foreground">Analyzes request and plans execution steps</p>
          </div>
          
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
          
          {/* Tools Section */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border bg-blue-500/10 p-2 text-center">
              <Search className="mx-auto h-4 w-4 text-blue-500 mb-1" />
              <span className="text-xs font-medium">Search</span>
            </div>
            <div className="rounded-lg border bg-amber-500/10 p-2 text-center">
              <Database className="mx-auto h-4 w-4 text-amber-500 mb-1" />
              <span className="text-xs font-medium">Knowledge</span>
            </div>
            <div className="rounded-lg border bg-violet-500/10 p-2 text-center">
              <Braces className="mx-auto h-4 w-4 text-violet-500 mb-1" />
              <span className="text-xs font-medium">Functions</span>
            </div>
          </div>
          
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
          
          {/* Generator */}
          <div className="w-full max-w-xs rounded-lg border bg-primary/10 p-3 text-center">
            <div className="mb-1 flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Generator</span>
            </div>
            <p className="text-xs text-muted-foreground">Produces the final response based on tool outputs</p>
          </div>
          
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
          
          {/* Response */}
          <div className="w-full max-w-xs rounded-lg border bg-muted p-3 text-center">
            <span className="text-sm font-medium">Agent Response</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
