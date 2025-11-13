import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "success" | "warning" | "danger" | "default";
}

const statusStyles = {
  success: "border-l-4 border-l-[hsl(var(--success))]",
  warning: "border-l-4 border-l-[hsl(var(--warning))]",
  danger: "border-l-4 border-l-[hsl(var(--danger))]",
  default: "border-l-4 border-primary-gradient",
};

export function StatCard({ title, value, icon: Icon, trend, status = "default" }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden transition-all hover:shadow-lg", statusStyles[status])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "text-xs font-medium flex items-center gap-1",
                trend.isPositive ? "text-[hsl(var(--success))]" : "text-[hsl(var(--danger))]"
              )}>
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{Math.abs(trend.value)}%</span>
                <span className="text-muted-foreground">vs mês anterior</span>
              </p>
            )}
          </div>
          <div className="rounded-full gradient-primary p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
