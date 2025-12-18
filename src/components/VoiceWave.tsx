import { cn } from "@/lib/utils";

interface VoiceWaveProps {
  isActive: boolean;
  variant?: "listening" | "speaking";
}

export function VoiceWave({ isActive, variant = "listening" }: VoiceWaveProps) {
  const bars = 5;
  
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-300",
            variant === "listening" ? "bg-primary" : "bg-accent",
            isActive ? "animate-voice-wave" : "h-2"
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            height: isActive ? undefined : "8px",
          }}
        />
      ))}
    </div>
  );
}
