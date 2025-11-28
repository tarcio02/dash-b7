import { TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsData {
  totalBMs: number;
  activeCampaigns: number;
  totalSpent: number;
  averageROI: number;
}

interface BMStatsProps {
  stats: StatsData;
  isAccount?: boolean
}

export const BMStats = ({ stats, isAccount }: BMStatsProps) => {
  const statItems = [
    {
      title: isAccount ? "Total de Campanhas" : "Total de Contas",
      value: stats.totalBMs,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Campanhas Ativas",
      value: stats.activeCampaigns,
      icon: BarChart3,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Investimento Total",
      value: `R$ ${stats.totalSpent.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "ROI Médio",
      value: `${stats.averageROI}%`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <Card
          key={index}
          className="p-6 bg-gradient-card border-border/50 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                {item.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {item.value}
              </p>
            </div>
            <div className={`${item.bgColor} ${item.color} p-3 rounded-xl`}>
              <item.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
