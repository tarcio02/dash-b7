import { Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tasks = [
  {
    id: 1,
    status: "pending",
    icon: Clock,
    client: "Donna M",
    task: "Criar 3 posts para Instagram",
    reposavel: "Júlio",
    deadline: "Hoje, 18:00",
  },
  {
    id: 2,
    status: "pending",
    icon: Clock,
    client: "MD+",
    task: "Relatório mensal de performance",
    reposavel: "Bruna",
    deadline: "Amanhã",
  },
  {
    id: 3,
    status: "completed",
    icon: CheckCircle,
    client: "Rizodent",
    task: "Criar campanha de conversão",
    reposavel: "João",
    deadline: "Concluída hoje",
  },
  {
    id: 4,
    status: "pending",
    icon: Clock,
    client: "Águas Mucugê",
    task: "Editar Vídeos de cliente",
    reposavel: "Kaique",
    deadline: "Em 2 dias",
  },
  {
    id: 5,
    status: "completed",
    icon: CheckCircle,
    client: "Ferragens Conquista",
    task: "Reunião de fechamento",
    reposavel: "Vitor",
    deadline: "Concluída ontem",
  },
];

const statusConfig = {
  pending: {
    badge: "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]",
    icon: "text-[hsl(var(--warning))]",
    label: "Pendente",
  },
  completed: {
    badge: "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]",
    icon: "text-[hsl(var(--success))]",
    label: "Realizada",
  },
};

export function AlertsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Útimas Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => {
            const Icon = task.icon;
            const config = statusConfig[task.status];
            
            return (
              <div
                key={task.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className={`rounded-full p-2 ${config.badge}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{task.client}</h4>
                    <Badge variant="outline" className="text-xs">
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.task}</p>
                  <div className="flex gap-1">
                    <p className="text-xs text-muted-foreground mt-1"> {task.reposavel} -</p>
                    <p className="text-xs text-muted-foreground mt-1">{task.deadline}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {task.status === "pending" ? "Marcar Concluída" : "Ver Detalhes"}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
