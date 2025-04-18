
import { Progress } from "@/components/ui/progress";

interface AgentStepProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Define Agent" },
  { id: 2, name: "Specify Tasks" },
  { id: 3, name: "Select Domain" },
  { id: 4, name: "Configure Tools" },
  { id: 5, name: "Add Knowledge" },
  { id: 6, name: "Review & Deploy" }
];

export function AgentStep({ currentStep }: AgentStepProps) {
  const progress = Math.min(((currentStep - 1) / (steps.length - 1)) * 100, 100);
  
  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">
          Step {currentStep}: {steps[currentStep - 1]?.name}
        </span>
        <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}
