import { UserPlus, Megaphone, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: UserPlus,
    label: "Adicionar Cliente/Empresa",
    description: "Cadastrar novo cliente ou empresa",
    color: "bg-primary/30",
  },
  {
    icon: Megaphone,
    label: "Criar Campanha",
    description: "Nova campanha de marketing",
    color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  },
  {
    icon: FileText,
    label: "Gerar Relatório de Tarefas",
    description: "Relatório de tarefas concluídas",
    color: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 hover:border-primary"
              >
                <div className={`rounded-full p-3 ${action.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
