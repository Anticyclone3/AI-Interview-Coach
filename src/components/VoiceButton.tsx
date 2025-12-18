import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function VoiceButton({ 
  isListening, 
  isProcessing, 
  isSpeaking, 
  onClick, 
  disabled 
}: VoiceButtonProps) {
  return (
    <div className="relative">
      {/* Pulse rings when listening */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
        </>
      )}
      
      {/* Glow when speaking */}
      {isSpeaking && (
        <div className="absolute -inset-4 rounded-full bg-accent/20 blur-xl animate-pulse" />
      )}
      
      <button
        onClick={onClick}
        disabled={disabled || isProcessing}
        className={cn(
          "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          "hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          isListening 
            ? "gradient-accent shadow-glow" 
            : isSpeaking
            ? "gradient-warm shadow-glow"
            : "bg-primary hover:bg-primary/90"
        )}
      >
        {isProcessing ? (
          <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
        ) : isListening ? (
          <MicOff className="w-10 h-10 text-primary-foreground" />
        ) : (
          <Mic className="w-10 h-10 text-primary-foreground" />
        )}
      </button>

      {/* Status text */}
      <p className={cn(
        "absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium whitespace-nowrap transition-opacity",
        isListening ? "text-primary" : isSpeaking ? "text-accent" : "text-muted-foreground"
      )}>
        {isProcessing ? "Thinking..." : isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Tap to speak"}
      </p>
    </div>
  );
}
