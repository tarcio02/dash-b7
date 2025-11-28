import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Ban, CheckCircle, PenLine, Plus, TrendingUp } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { StatsCard } from "@/components/StatsCard";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
};

const mockTasks = {
  "1": [
    { id: "1", title: "Revisar campanha de marketing", completed: false, dueDate: "Seg" },
    { id: "2", title: "Atualizar redes sociais", completed: true, dueDate: "Ter" },
    { id: "3", title: "Reunião com cliente", completed: false, dueDate: "Qua" },
  ],
  "2": [
    { id: "1", title: "Organizar pauta de reunião", completed: false, dueDate: "Seg" },
    { id: "2", title: "Revisar funil de vendas", completed: false, dueDate: "Qui" },
  ],
  "3": [{ id: "1", title: "Alinhar cronograma de postagens", completed: true, dueDate: "Ter" }],
};

const mockCompanies = {
  "1": { name: "Tech Solutions LTDA" },
  "2": { name: "Inovação Digital" },
  "3": { name: "Startup Brasil" },
  "4": { name: "Empresa ABC" },
  "5": { name: "Global Marketing" },
  "6": { name: "Digital Commerce" },
};

const CompanyTasks = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!companyId) return;
    setTasks(mockTasks[companyId] ?? []);
  }, [companyId]);

  const company = companyId ? mockCompanies[companyId] : undefined;

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <p className="text-foreground">Empresa não encontrada</p>
          <Button onClick={() => navigate("/")} className="mt-4">Voltar</Button>
        </Card>
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="dark min-h-screen bg-background flex">
      {/* Sidebar fixa */}
      <div className="fixed left-0 top-0 h-full">
        <DashboardSidebar />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 ml-64">
        <DashboardTopbar /> 

        {/* Conteúdo com padding */}
        <div className="px-8 pb-8 max-w-7xl mx-auto space-y-8 mt-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tasks Semanais</h1>
              <p className="text-muted-foreground">{company.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Tarefas em Andamento"
              value={3}
              icon={PenLine}
              description="14 tarefas concluídas"
            />
            <StatsCard
              title="Tarefas Concluídas"
              value={14}
              icon={CheckCircle }
              description={`20 tarefas totais`}
            />
            <StatsCard
              title="Tarefas Não Concluídas"
              value={4}
              icon={Ban} 
              description="Esta semana"
            />
            <StatsCard
              title="Produtividade Média"
              value={`97%`}
              icon={TrendingUp}
              description="Média Indivídual"
            />
          </div>

          {/* Progresso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Progresso Semanal</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount} de {tasks.length} concluídas
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Lista */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Tasks da Semana
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Nova Task
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma task cadastrada para esta semana
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() =>
                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          )
                        )
                      }
                    />
                    <div className="flex-1">
                      <p className={`text-foreground ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {task.dueDate}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default CompanyTasks;
