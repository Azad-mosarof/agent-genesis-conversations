import { AgentBuilder } from "@/components/AgentBuilder";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/90 text-white grid place-items-center font-bold">
              AB
            </div>
            <h1 className="text-xl font-bold">AI Agent Builder</h1>
          </div>
        </div>
      </header>
      
      <main>
        <AgentBuilder />
      </main>
    </div>
  );
};

export default Index;
