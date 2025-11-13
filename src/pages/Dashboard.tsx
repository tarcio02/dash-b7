import { useState } from "react";
import { Search, Plus, Users, ListTodo, CheckCircle, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeCard } from "@/components/EmployeeCard";
import { StatsCard } from "@/components/StatsCard";
import { mockEmployees } from "@/data/mockData";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const Dashboard = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = mockEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeEmployees = mockEmployees.filter(emp => emp.status === "active").length;
  const totalTasks = mockEmployees.reduce((acc, emp) => acc + emp.tasks.length, 0);
  const completedTasks = mockEmployees.reduce(
    (acc, emp) => acc + emp.tasks.filter(t => t.status === "completed").length,
    0
  );
  const inProgressTasks = mockEmployees.reduce(
    (acc, emp) => acc + emp.tasks.filter(t => t.status === "in_progress").length,
    0
  );
  const avgProductivity = Math.round(
    mockEmployees.reduce((acc, emp) => acc + emp.productivity, 0) / mockEmployees.length
  );

  return (
    <div className="dark min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardTopbar />

        <main className="container mx-auto px-6 py-8">
          {/* Stats Bar - Horizontal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Colaboradores Ativos"
              value={activeEmployees}
              icon={Users}
              description="Total de membros ativos"
            />
            <StatsCard
              title="Tarefas em Andamento"
              value={inProgressTasks}
              icon={ListTodo}
              description={`${totalTasks} tarefas totais`}
            />
            <StatsCard
              title="Tarefas Concluídas"
              value={completedTasks}
              icon={CheckCircle}
              description="Este mês"
            />
            <StatsCard
              title="Produtividade Média"
              value={`${avgProductivity}%`}
              icon={TrendingUp}
              description="Média da equipe"
            />
          </div>

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Colaboradores
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredEmployees.length} colaboradores encontrados
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar colaboradores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Employee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum colaborador encontrado com "{searchTerm}"
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button - Mobile */}
      <Button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 lg:hidden"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;