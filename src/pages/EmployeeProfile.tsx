import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEmployees } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

const statusConfig = {
  active: { label: "Ativo", color: "bg-success text-success-foreground" },
  vacation: { label: "Férias", color: "bg-warning text-warning-foreground" },
  terminated: { label: "Desligado", color: "bg-danger text-danger-foreground" },
};

const taskStatusConfig = {
  pending: { label: "Pendente", color: "bg-muted text-muted-foreground" },
  in_progress: { label: "Em Andamento", color: "bg-primary text-primary-foreground" },
  completed: { label: "Concluída", color: "bg-success text-success-foreground" },
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = mockEmployees.find((emp) => emp.id === id);

  if (!employee) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Colaborador não encontrado
          </h2>
          <Button onClick={() => navigate("/")}>Voltar ao Dashboard</Button>
        </div>
      </div>
    );
  }

  const status = statusConfig[employee.status];
  const completedTasks = employee.tasks.filter(t => t.status === "completed").length;
  const totalTasks = employee.tasks.length;

  return (
    <div className="dark min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 ml-64">
        <DashboardTopbar />

        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>

            <div className="flex items-start gap-6 flex-wrap">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="text-2xl">
                  {employee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    {employee.name}
                  </h1>
                  <Badge className={status.color}>{status.label}</Badge>
                </div>
                <p className="text-lg text-muted-foreground mb-4">{employee.role}</p>
                
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Contratado em {new Date(employee.hireDate).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="bg-card border border-border/50">
              <TabsTrigger value="general">Informações Gerais</TabsTrigger>
              <TabsTrigger value="tasks">Tarefas Designadas</TabsTrigger>
            </TabsList>

            {/* GERAL */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Dados de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="text-foreground">{employee.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cargo</p>
                      <p className="text-foreground">{employee.role}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Produtividade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Índice de Produtividade
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {employee.productivity}%
                        </span>
                      </div>
                      <Progress value={employee.productivity} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {completedTasks}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tarefas Concluídas
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {totalTasks - completedTasks}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tarefas Pendentes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAREFAS */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Tarefas Designadas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {totalTasks} tarefas no total
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tarefa
                </Button>
              </div>

              <div className="grid gap-4">
                {employee.tasks.map((task) => {
                  const taskStatus = taskStatusConfig[task.status];
                  const deadline = new Date(task.deadline);
                  const isOverdue = deadline < new Date() && task.status !== "completed";

                  return (
                    <Card key={task.id} className="border-border/50 hover:border-primary/50 transition-all">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-foreground">
                                {task.title}
                              </h4>
                              <Badge className={taskStatus.color}>
                                {taskStatus.label}
                              </Badge>
                              {isOverdue && (
                                <Badge className="bg-danger text-danger-foreground">
                                  Atrasada
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Prazo: {deadline.toLocaleDateString("pt-BR")}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {employee.tasks.length === 0 && (
                <Card className="border-border/50">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma tarefa designada ainda
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
