import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CompanyMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const CompanyMetricCard = ({ title, value, icon: Icon, trend }: CompanyMetricCardProps) => {
  return (
    <Card className="p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-primary)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};
