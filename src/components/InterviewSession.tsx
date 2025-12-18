import { useEffect, useRef } from "react";
import { VoiceButton } from "./VoiceButton";
import { VoiceWave } from "./VoiceWave";
import { ChatMessage } from "./ChatMessage";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

interface InterviewSessionProps {
  role: string;
  onBack: () => void;
}

export function InterviewSession({ role, onBack }: InterviewSessionProps) {
  const {
    messages,
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    toggleListening,
    startSession,
  } = useVoiceChat(role);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!hasStartedRef.current && role) {
      hasStartedRef.current = true;
      startSession();
    }
  }, [role, startSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const roleLabels: Record<string, string> = {
    "software-engineer": "Software Engineer",
    "product-manager": "Product Manager",
    "marketing": "Marketing",
    "designer": "Designer",
    "sales": "Sales",
    "healthcare": "Healthcare",
    "education": "Education",
    "general": "General",
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">Back</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            Practicing for {roleLabels[role] || role}
          </span>
        </div>
        
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-0 animate-fade-in">
            <MessageSquare className="w-16 h-16 text-primary/30 mb-4" />
            <p className="text-muted-foreground">
              Starting your interview practice session...
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <ChatMessage
              key={i}
              role={msg.role}
              content={msg.content}
              isStreaming={i === messages.length - 1 && msg.role === "assistant" && isProcessing}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice controls */}
      <div className="p-6 md:p-8 border-t border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-6">
          {/* Live transcript */}
          {transcript && (
            <div className="w-full max-w-lg p-3 rounded-xl bg-secondary/50 border border-border animate-fade-in">
              <p className="text-sm text-muted-foreground text-center italic">
                "{transcript}"
              </p>
            </div>
          )}

          {/* Voice wave visualization */}
          <VoiceWave 
            isActive={isListening || isSpeaking} 
            variant={isListening ? "listening" : "speaking"} 
          />

          {/* Main voice button */}
          <VoiceButton
            isListening={isListening}
            isProcessing={isProcessing}
            isSpeaking={isSpeaking}
            onClick={toggleListening}
          />
        </div>
      </div>
    </div>
  );
}
