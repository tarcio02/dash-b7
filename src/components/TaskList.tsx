import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Analisar relatório de performance da campanha de Black Friday",
    completed: true,
    dueDate: "Seg",
  },
  {
    id: "2",
    title: "Revisar orçamento mensal das campanhas ativas",
    completed: true,
    dueDate: "Ter",
  },
  {
    id: "3",
    title: "Otimizar segmentação de público para nova campanha",
    completed: false,
    dueDate: "Qua",
  },
  {
    id: "4",
    title: "Preparar relatório semanal para cliente",
    completed: false,
    dueDate: "Qui",
  },
  {
    id: "5",
    title: "Atualizar criativos das campanhas de produto",
    completed: false,
    dueDate: "Sex",
  },
  {
    id: "6",
    title: "Realizar teste A/B de novos anúncios",
    completed: true,
    dueDate: "Seg",
  },
];

export const TaskList = () => {
  const completedTasks = mockTasks.filter((task) => task.completed);
  const pendingTasks = mockTasks.filter((task) => !task.completed);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <CheckCircle2 className="w-5 h-5" />
            Tarefas Concluídas ({completedTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-through opacity-75">
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Circle className="w-5 h-5" />
            Tarefas Pendentes ({pendingTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
