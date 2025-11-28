import { useState } from "react";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EmployeeStatus = "ok" | "pendente" | "atrasada";

interface Employee {
  id: string;
  name: string;
  position: string;
  status: EmployeeStatus;
  taskCount: number;
  lastUpdate: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Júlio Silva",
    position: "Designer Gráfico",
    status: "ok",
    taskCount: 12,
    lastUpdate: "Banner Mercato",
  },
  {
    id: "2",
    name: "Bruna Costa",
    position: "Gerente de mídias",
    status: "ok",
    taskCount: 8,
    lastUpdate: "Brand Strategy",
  },
  {
    id: "3",
    name: "Kaike",
    position: "Video maker",
    status: "pendente",
    taskCount: 15,
    lastUpdate: "Gravação Donna M",
  },
  {
    id: "4",
    name: "Jess",
    position: "Social Media",
    status: "ok",
    taskCount: 20,
    lastUpdate: "Content Calendar",
  },
  {
    id: "5",
    name: "Vitor",
    position: "Gerente Comercial",
    status: "ok",
    taskCount: 25,
    lastUpdate: "Reunião de fechamento",
  },
];

const statusConfig = {
  ok: { label: "Ok", variant: "ok" as const, color: "bg-[hsl(var(--success))]" },
  pendente: { label: "Atenção", variant: "pendente" as const, color: "bg-[hsl(var(--warning))]" },
  atrasada: { label: "Alerta", variant: "destructive" as const, color: "bg-[hsl(var(--danger))]" },
};

export const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Funcionários e Tarefas</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar funcionário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="in-progress">Em Progresso</SelectItem>
                <SelectItem value="alert">Alerta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nº Tarefas</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status} className="gap-1">
                      <span className={`h-2 w-2 rounded-full ${statusConfig[employee.status].color}`} />
                      {employee.status.charAt(0).toLocaleUpperCase() + employee.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.taskCount}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.lastUpdate}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum funcionário encontrado
          </div>
        )}
      </CardContent>
    </Card>
  );
};
