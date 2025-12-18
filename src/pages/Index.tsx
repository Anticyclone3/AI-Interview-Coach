import { useState } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { InterviewSession } from "@/components/InterviewSession";
import { Button } from "@/components/ui/button";
import { Mic, Sparkles, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);

  if (isSessionActive && selectedRole) {
    return (
      <InterviewSession 
        role={selectedRole} 
        onBack={() => {
          setIsSessionActive(false);
          setSelectedRole(null);
        }} 
      />
    );
  }

  const features = [
    {
      icon: MessageSquare,
      title: "Real Questions",
      description: "Practice with industry-specific interview questions tailored to your role",
    },
    {
      icon: Sparkles,
      title: "Instant Feedback",
      description: "Get encouraging feedback and practical tips after each answer",
    },
    {
      icon: TrendingUp,
      title: "Build Confidence",
      description: "Reduce nervousness and improve clarity with every practice session",
    },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating mic icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8 opacity-0 animate-slide-up">
            <div className="absolute inset-0 rounded-full gradient-accent opacity-20 blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full gradient-accent flex items-center justify-center shadow-glow animate-float">
              <Mic className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Your AI{" "}
            <span className="text-primary">Interview Coach</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Practice common questions, get personalized feedback, and boost your confidence—all through natural voice conversation.
          </p>
        </div>
      </section>

      {/* Role Selection */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground text-center mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            What role are you preparing for?
          </h2>
          
          <RoleSelector 
            selectedRole={selectedRole} 
            onSelectRole={setSelectedRole} 
          />

          {/* Start button */}
          <div className="flex justify-center mt-10 opacity-0 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <Button
              size="lg"
              onClick={() => setIsSessionActive(true)}
              disabled={!selectedRole}
              className="h-14 px-8 text-lg font-medium gradient-accent hover:opacity-90 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:shadow-none"
            >
              Start Practice Session
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Speak naturally. Practice confidently. Ace your interview.
        </p>
      </footer>
    </div>
  );
};

export default Index;
