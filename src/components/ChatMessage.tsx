import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";
  
  return (
    <div className={cn(
      "flex gap-3 animate-fade-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
        isUser ? "bg-primary/10" : "gradient-accent"
      )}>
        {isUser ? (
          <User className="w-5 h-5 text-primary" />
        ) : (
          <Bot className="w-5 h-5 text-primary-foreground" />
        )}
      </div>
      
      <div className={cn(
        "max-w-[80%] p-4 rounded-2xl",
        isUser 
          ? "bg-primary text-primary-foreground rounded-br-sm" 
          : "bg-card shadow-soft border border-border rounded-bl-sm"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse rounded-sm" />
          )}
        </p>
      </div>
    </div>
  );
}
