import { CompanyMetricCard } from "@/components/CompanyMetricCard";
import { CompanyCard } from "@/components/CompanyCard";
import { Building2, TrendingUp, DollarSign, Users, Search } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockCompanies = [
  { id: "1", name: "Rizodent", adminName: "Rodolfo", contractStartDate: "15/01/2024", status: "active" as const, plan: "B7-3X" },
  { id: "2", name: "João e Maria", adminName: "Edson", contractStartDate: "03/02/2024", status: "active" as const, plan: "B7-3X" },
  { id: "3", name: "Ferragens conquista", adminName: "Pedro Costa", contractStartDate: "20/03/2024", status: "pending" as const, plan: "B7-3X" },
  { id: "4", name: "Águas Mucugê", adminName: "MIchel", contractStartDate: "10/12/2023", status: "inactive" as const, plan: "B7-3X" },
];

const Index = () => {
  const activeCompanies = mockCompanies.filter(c => c.status === "active").length;
  const totalRevenue = "R$ 47.500";

  return (
    <div className="dark min-h-screen bg-background flex">
      {/* Sidebar fixa */}
      <div className="fixed left-0 top-0 h-full">
        <DashboardSidebar />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 ml-64">
        <DashboardTopbar /> 

        {/* Conteúdo com padding */}
        <div className="px-8 pb-8 max-w-7xl mx-auto space-y-8 mt-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Gerenciamento de Empresas
            </h1>
            <p className="text-muted-foreground">
              Acompanhe as métricas e gerencie todas as empresas atendidas pela agência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CompanyMetricCard title="Total de Empresas" value={mockCompanies.length} icon={Building2} trend={{ value: "12% vs mês anterior", isPositive: true }} />
            <CompanyMetricCard title="Contratos Ativos" value={activeCompanies} icon={TrendingUp} trend={{ value: "8% vs mês anterior", isPositive: true }} />
            <CompanyMetricCard title="Receita Mensal" value={totalRevenue} icon={DollarSign} trend={{ value: "15% vs mês anterior", isPositive: true }} />
            <CompanyMetricCard title="Taxa de Retenção" value="94%" icon={Users} trend={{ value: "2% vs mês anterior", isPositive: true }} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Empresas Cadastradas</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockCompanies.length} empresas encontrados
                </p>
              </div>
              <div className="flex gap-4">
                  <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar clientes..."
                  className="pl-9"
                />
            </div>
                <Button >
                  + Nova Empresa
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;
