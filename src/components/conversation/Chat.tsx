
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { ChatInput } from "./ChatInput";
import { ChatMessage, MessageType } from "./ChatMessage";
import { AgentStep } from "../agent/AgentStep";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

interface ChatProps {
  initialMessages?: MessageType[];
  currentStep: number;
  onStepComplete: (step: number) => void;
}

export function Chat({ initialMessages = [], currentStep, onStepComplete }: ChatProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // When a new message comes in, check if we need to show the scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (!messagesEndRef.current) return;
      
      const container = messagesEndRef.current.parentElement;
      if (!container) return;
      
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      setShowScrollButton(!isAtBottom);
    };

    const container = messagesEndRef.current?.parentElement;
    container?.addEventListener("scroll", handleScroll);
    
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  // For demo purposes, hard-coded assistant responses based on the current step
  const getStepResponse = (userMessage: string, step: number): string => {
    switch (step) {
      case 1: // Initial agent description
        return "Great! I'd like to understand more about this agent. What specific tasks do you want your agent to perform?";
      case 2: // Tasks clarification
        return "Thanks for the details. What industry or domain will this agent be primarily working with? This helps me find the right tools and knowledge sources.";
      case 3: // Domain specification
        return "I've searched for relevant tools in our marketplace. I found these options that might work for your agent. Would you like to configure them now?";
      case 4: // Tool selection
        return "Perfect! Now we need to build your agent's knowledge base. You can upload documents or point to data sources. What kind of knowledge will your agent need?";
      case 5: // Knowledge base
        return "I've created the prompt templates and workflow for your agent based on your requirements. Your agent is now ready for deployment! Would you like to test it?";
      default:
        return "Is there anything else you'd like to customize with your agent?";
    }
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: nanoid(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: nanoid(),
        content: getStepResponse(content, currentStep),
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
      onStepComplete(currentStep);
    }, 1500);
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg border shadow-md">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold mb-2">Welcome to the AI Agent Builder</h3>
            <p className="text-muted-foreground">
              Describe the AI agent you want to create, and I'll guide you through the process.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <ChatMessage
                message={{
                  id: "loading",
                  content: "",
                  role: "assistant",
                  status: "loading",
                }}
              />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-20 right-6 h-8 w-8 rounded-full shadow-md"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      <div className="border-t p-4">
        <AgentStep currentStep={currentStep} />
        <ChatInput 
          onMessageSend={handleSendMessage} 
          disabled={loading}
        />
      </div>
    </Card>
  );
}
