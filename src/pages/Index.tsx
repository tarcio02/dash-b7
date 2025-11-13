import { Users, Building2, Megaphone, CheckSquare  } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { StatCard } from "@/components/StatCard";
import { ClientsTable } from "@/components/ClientsTable";
import { DashboardCharts } from "@/components/DashboardCharts";
import { AlertsSection } from "@/components/AlertsSection";
import { QuickActions } from "@/components/QuickActions";
import { EmployeeTable } from "@/components/EmployeeTable";
import { CampaignsTable } from "@/components/CampaignsTable";

const Index = () => {
  return (
    <div className="dark min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="ml-64">
        <DashboardTopbar />
        
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Clientes Ativos"
              value={28}
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              status="success"
            />
            <StatCard
              title="Empresas Cadastradas"
              value={42}
              icon={Building2}
              trend={{ value: 8, isPositive: true }}
              status="success"
            />
            <StatCard
              title="Campanhas Ativas"
              value={15}
              icon={Megaphone}
              trend={{ value: 15, isPositive: true }}
              status="success"
            />
            <StatCard
              title="Tarefas Concluídas"
              value="77/96"
              icon={CheckSquare }
              trend={{ value: 18, isPositive: true }}
              status="success"
            />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Clients Table */}
          <ClientsTable />

          {/* Alerts */}
          <AlertsSection />

          <CampaignsTable />

          <EmployeeTable />
        </main>
      </div>
    </div>
  );

};

export default Index;
