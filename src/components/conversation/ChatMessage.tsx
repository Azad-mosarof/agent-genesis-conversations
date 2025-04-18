
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

export type MessageType = {
  id: string;
  content: string | React.ReactNode;
  role: "user" | "assistant";
  status?: "loading" | "complete" | "error";
  timestamp?: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 py-4",
        isUser ? "justify-start" : "justify-start"
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "order-1" : "order-1")}>
        <AvatarFallback className={isUser ? "bg-primary" : "bg-muted-foreground"}>
          {isUser ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4 text-primary-foreground" />}
        </AvatarFallback>
        <AvatarImage src={isUser ? "/user-avatar.png" : "/agent-avatar.png"} />
      </Avatar>
      
      <Card className={cn(
        "max-w-[80%] px-4 py-3 shadow-sm",
        isUser ? "order-2 bg-primary text-primary-foreground" : "order-2 bg-muted"
      )}>
        <div className="prose prose-sm dark:prose-invert">
          {message.content}
        </div>
        {message.status === "loading" && (
          <div className="mt-2 flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-current opacity-50"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-current opacity-50 delay-150"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-current opacity-50 delay-300"></div>
          </div>
        )}
      </Card>
    </div>
  );
}
