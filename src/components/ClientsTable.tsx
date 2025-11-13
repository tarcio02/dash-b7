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

const mockClients = [
  { id: 1, name: "João Silva", company: "Tech Solutions", status: "active", campaign: "SEO Premium", plan: "B7-3x" },
  { id: 2, name: "Maria Santos", company: "Creative Studio", status: "active", campaign: "Social Media", plan: "Start" },
  { id: 3, name: "Pedro Costa", company: "Mega Corp", status: "warning", campaign: "Ads Google", plan: "Start" },
  { id: 4, name: "Ana Lima", company: "Start Inc", status: "active", campaign: "Email Marketing", plan: "B7-3x" },
  { id: 5, name: "Carlos Souza", company: "Innovate Labs", status: "danger", campaign: "Brand Strategy", plan: "Start" },
];

const statusConfig = {
  active: { label: "Ok", variant: "ok" as const, color: "bg-[hsl(var(--success))]" },
  warning: { label: "Atenção", variant: "pendente" as const, color: "bg-[hsl(var(--warning))]" },
  danger: { label: "Alerta", variant: "destructive" as const, color: "bg-[hsl(var(--danger))]" },
};

export function ClientsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Clientes e Empresas</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente ou empresa..."
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
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="danger">Alerta</SelectItem>
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
                <TableHead>Cliente</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Campanha</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.company}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[client.status].variant} className="gap-1">
                      <span className={`h-2 w-2 rounded-full ${statusConfig[client.status].color}`} />
                      {statusConfig[client.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{client.campaign}</TableCell>
                  <TableCell>
                    <Badge variant="primary">{client.plan}</Badge>
                  </TableCell>
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
      </CardContent>
    </Card>
  );
}
