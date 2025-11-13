import { mockEmployees } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MoreVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Employee } from "@/types/employee";
import { useNavigate } from "react-router-dom";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
const navigate  = useNavigate()

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      on_leave: "outline",
    };
    const labels = {
      active: "Ativo",
      inactive: "Inativo",
      on_leave: "Ausente",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const completedTasks = employee.tasks.filter((t) => t.status === "completed").length;
  const totalTasks = employee.tasks.length;

  return (
    <Card className="p-6 bg-card hover:shadow-lg transition-all border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{employee.name}</h3>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
            <DropdownMenuItem>Atribuir tarefa</DropdownMenuItem>
            <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {getStatusBadge(employee.status)}
          <span className="text-sm text-muted-foreground">{employee.departement}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="truncate">{employee.email}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Produtividade</span>
            <span className="font-medium text-foreground">{employee.productivity}%</span>
          </div>
          <Progress value={employee.productivity} className="h-2" />
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Tarefas</span>
            <span className="font-medium text-foreground">
              {completedTasks}/{totalTasks} concluídas
            </span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate(`/employee/${employee.id}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};
