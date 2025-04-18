
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Copy, Check } from "lucide-react";
import { useState } from "react";

export function PromptTemplates() {
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied({...copied, [type]: true});
    setTimeout(() => {
      setCopied({...copied, [type]: false});
    }, 2000);
  };
  
  const plannerPrompt = `You are an expert planner for the AI agent. Your job is to:
1. Analyze the user's request carefully
2. Determine what tools and information are needed
3. Break down the request into a sequence of steps
4. Provide clear instructions for each step

FORMAT:
- UNDERSTANDING: [Restate the user's request in your own words]
- REQUIRED TOOLS: [List tools needed]
- KNOWLEDGE NEEDED: [What information is required]
- STEPS:
  1. [First step with instructions]
  2. [Second step with instructions]
  ...
- VALIDATION: [How to check if the response meets requirements]`;

  const generatorPrompt = `You are an expert response generator for the AI agent. Your job is to:
1. Take in the outputs from the planning stage and tools
2. Synthesize all information into a coherent, helpful response
3. Format the response appropriately for the user
4. Ensure the response fully addresses the original request

The response should be:
- Clear and concise
- Well-structured and readable
- Accurate based on the tools' outputs
- Complete, addressing all aspects of the request
- Natural and conversational in tone

If you don't have enough information, acknowledge limitations transparently.`;

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Prompt Templates</CardTitle>
        <CardDescription>
          Customize how your agent processes requests and generates responses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="planner">
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="planner">Planner Prompt</TabsTrigger>
            <TabsTrigger value="generator">Generator Prompt</TabsTrigger>
          </TabsList>
          
          <TabsContent value="planner" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="planner-prompt">Planner Prompt Template</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => handleCopy(plannerPrompt, "planner")}
                  >
                    {copied["planner"] ? (
                      <><Check className="mr-1 h-3 w-3" /> Copied</>
                    ) : (
                      <><Copy className="mr-1 h-3 w-3" /> Copy</>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    <ArrowDownToLine className="mr-1 h-3 w-3" /> Reset
                  </Button>
                </div>
              </div>
              <Textarea
                id="planner-prompt"
                value={plannerPrompt}
                className="min-h-32 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                This prompt guides how your agent plans the steps to fulfill a request
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="generator" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="generator-prompt">Generator Prompt Template</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => handleCopy(generatorPrompt, "generator")}
                  >
                    {copied["generator"] ? (
                      <><Check className="mr-1 h-3 w-3" /> Copied</>
                    ) : (
                      <><Copy className="mr-1 h-3 w-3" /> Copy</>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    <ArrowDownToLine className="mr-1 h-3 w-3" /> Reset
                  </Button>
                </div>
              </div>
              <Textarea
                id="generator-prompt"
                value={generatorPrompt}
                className="min-h-32 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                This prompt guides how your agent generates the final response
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
