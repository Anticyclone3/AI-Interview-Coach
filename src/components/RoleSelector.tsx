import { cn } from "@/lib/utils";
import { 
  Code, 
  Briefcase, 
  TrendingUp, 
  Palette, 
  Users, 
  Stethoscope,
  GraduationCap,
  Building2
} from "lucide-react";

const roles = [
  { id: "software-engineer", label: "Software Engineer", icon: Code },
  { id: "product-manager", label: "Product Manager", icon: Briefcase },
  { id: "marketing", label: "Marketing", icon: TrendingUp },
  { id: "designer", label: "Designer", icon: Palette },
  { id: "sales", label: "Sales", icon: Users },
  { id: "healthcare", label: "Healthcare", icon: Stethoscope },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "general", label: "General", icon: Building2 },
];

interface RoleSelectorProps {
  selectedRole: string | null;
  onSelectRole: (role: string) => void;
}

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
      {roles.map((role, index) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        
        return (
          <button
            key={role.id}
            onClick={() => onSelectRole(role.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
              "border-2 hover:scale-105 opacity-0 animate-fade-in",
              isSelected 
                ? "border-primary bg-primary/10 shadow-glow" 
                : "border-border bg-card hover:border-primary/50 shadow-soft"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Icon className={cn(
              "w-6 h-6 transition-colors",
              isSelected ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-sm font-medium transition-colors",
              isSelected ? "text-primary" : "text-foreground"
            )}>
              {role.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
