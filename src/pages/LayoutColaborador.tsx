import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { DashboardTopbarColaborador } from "@/components/DashBoardTopBarColaborador";

interface Task {
id: string;
title: string;
completed: boolean;
}

const LayoutColaborador = () => {
const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Criar campanha para cliente A", completed: false },
    { id: "2", title: "Revisar conteúdo das redes sociais", completed: true },
    { id: "3", title: "Preparar relatório mensal", completed: false },
]);
const [newTask, setNewTask] = useState("");

const addTask = () => {
    if (newTask.trim()) {
    setTasks([
        ...tasks,
        {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        },
    ]);
    setNewTask("");
    }
};

const toggleTask = (id: string) => {
    setTasks(
    tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    )
    );
};

const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
};

const completedCount = tasks.filter((task) => task.completed).length;
const pendingCount = tasks.length - completedCount;
const completionRate = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

return (
    <div className="dark min-h-screen">
        <DashboardTopbarColaborador />
    <div className="mx-auto max-w-3xl mt-8">
        <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
            Gerenciamento de Tarefas
        </h1>
        <p className="text-muted-foreground">
            Organize e acompanhe as tarefas da sua equipe
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
            </div>
            </div>
        </Card>

        <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
                <Circle className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            </div>
            </div>
        </Card>

        <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                <p className="text-2xl font-bold text-foreground">{completionRate.toFixed(0)}%</p>
            </div>
            </div>
        </Card>
        </div>

        <Card className="p-6 mb-6 bg-card border-border">
        <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progresso Geral</span>
            <span className="text-sm text-muted-foreground">
            {completedCount} de {tasks.length} tarefas
            </span>
        </div>
        <Progress value={completionRate} className="h-2" />
        </Card>

        <Card className="p-6 mb-6 bg-card border-border">
        <div className="flex gap-2">
            <Input
            placeholder="Adicionar nova tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="flex-1 bg-background border-input"
            />
            <Button onClick={addTask} size="icon">
            <Plus className="h-4 w-4" />
            </Button>
        </div>
        </Card>

        <div className="space-y-2">
        {tasks.map((task) => (
            <Card
            key={task.id}
            className="p-4 bg-card border-border hover:bg-accent/50 transition-colors"
            >
            <div className="flex items-center gap-3">
                <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                />
                <span
                className={`flex-1 ${
                    task.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
                >
                {task.title}
                </span>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            </Card>
        ))}
        </div>

        {tasks.length === 0 && (
        <Card className="p-12 text-center bg-card border-border">
            <p className="text-muted-foreground">
            Nenhuma tarefa ainda. Adicione uma nova tarefa acima!
            </p>
        </Card>
        )}
    </div>
    </div>
);
};

export default LayoutColaborador