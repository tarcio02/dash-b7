import { DashboardTopbarClient } from "@/components/DashboardTopbarClient";
import { MetricCard } from "../components/MetricCard";
import { TaskList } from "../components/TaskList";
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
} from "lucide-react";

const LayoutCliente = () => {
  const metrics = [
    {
      title: "Valor Investido",
      value: "47.2K",
      change: "+12.5% vs mês anterior",
      changeType: "positive" as const,
      icon: Eye,
      iconColor: "text-primary",
    },
    {
      title: "Cliques",
      value: "23.4K",
      change: "+8.3% vs mês anterior",
      changeType: "positive" as const,
      icon: MousePointerClick,
      iconColor: "text-accent",
    },
    {
      title: "CTR",
      value: "2.76%",
      change: "+0.4% vs mês anterior",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconColor: "text-success",
    },
    {
      title: "CPC Médio",
      value: "R$ 1.85",
      change: "-5.2% vs mês anterior",
      changeType: "positive" as const,
      icon: DollarSign,
      iconColor: "text-warning",
    },
    {
      title: "Conversões",
      value: "1,247",
      change: "+18.9% vs mês anterior",
      changeType: "positive" as const,
      icon: Target,
      iconColor: "text-primary",
    },
    {
      title: "ROI",
      value: "4.2x",
      change: "+0.3x vs mês anterior",
      changeType: "positive" as const,
      icon: BarChart3,
      iconColor: "text-accent",
    },
  ];

  return (
    <div className="dark min-h-screen ">
    <DashboardTopbarClient />

        <div className="px-8 pb-8 max-w-7xl mx-auto space-y-8 mt-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Dashboard: Empresa
            </h1>
            <p className="text-muted-foreground">
              Acompanhe as métricas e gerencie o progresso" de sua empresa
            </p>
          </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Tarefas da Semana
          </h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default LayoutCliente;
