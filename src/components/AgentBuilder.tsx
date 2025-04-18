
import { useState } from "react";
import { Chat } from "./conversation/Chat";
import { ToolsSection } from "./agent/ToolsSection";
import { KnowledgeUpload } from "./agent/KnowledgeUpload";
import { WorkflowPreview } from "./agent/WorkflowPreview";
import { PromptTemplates } from "./agent/PromptTemplates";
import { MessageType } from "./conversation/ChatMessage";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AgentBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const { toast } = useToast();
  
  const initialMessages: MessageType[] = [
    {
      id: "welcome",
      content: "Hi there! I'm your AI Agent Builder. Tell me about the AI agent you want to create, and I'll guide you through the process.",
      role: "assistant",
      timestamp: new Date(),
    },
  ];
  
  const handleStepComplete = (step: number) => {
    // Move to the next step after a short delay
    setTimeout(() => {
      if (step < 6) {
        setCurrentStep(step + 1);
      }
    }, 1000);
  };
  
  const handleToolsSelected = (toolIds: string[]) => {
    setSelectedTools(toolIds);
  };
  
  const handleDeployAgent = () => {
    toast({
      title: "Agent Deployed",
      description: "Your AI agent has been successfully deployed and is ready to use!",
    });
  };
  
  // Show different content based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 4: // Tool selection step
        return <ToolsSection onToolsSelected={handleToolsSelected} />;
      case 5: // Knowledge base step
        return <KnowledgeUpload />;
      case 6: // Final review step
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <WorkflowPreview />
            <PromptTemplates />
            <div className="md:col-span-2 flex justify-center mt-4">
              <Button size="lg" onClick={handleDeployAgent} className="gap-2">
                <Rocket className="h-5 w-5" />
                Deploy Agent
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex-1">
        <Chat 
          initialMessages={initialMessages} 
          currentStep={currentStep} 
          onStepComplete={handleStepComplete} 
        />
      </div>
      
      {renderStepContent()}
    </div>
  );
}
