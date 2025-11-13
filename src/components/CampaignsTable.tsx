import { useState } from "react";
import { Edit, Search } from "lucide-react";
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

const mockCampaigns = [
  { 
    id: 1, 
    name: "Black Friday 2024", 
    objectives: "Conversão", 
    reach: "45.2K", 
    clicks: "3.8K", 
    invested: "R$ 1.500,00",
    status: "active"
  },
  { 
    id: 2, 
    name: "Lançamento Produto X", 
    objectives: "Awareness", 
    reach: "128.5K", 
    clicks: "12.3K", 
    invested: "R$ 12.500,00",
    status: "active"
  },
  { 
    id: 3, 
    name: "Retargeting Q4", 
    objectives: "Conversão", 
    reach: "22.1K", 
    clicks: "1.9K", 
    invested: "R$ 8.200,00",
    status: "warning"
  },
  { 
    id: 4, 
    name: "Email Marketing - Natal", 
    objectives: "Engajamento", 
    reach: "67.8K", 
    clicks: "5.4K", 
    invested: "R$ 3.500,00",
    status: "active"
  },
  { 
    id: 5, 
    name: "Google Ads - Brand", 
    objectives: "Tráfego", 
    reach: "95.3K", 
    clicks: "8.2K", 
    invested: "R$ 5.900,00",
    status: "danger"
  },
];

const statusConfig = {
  active: { label: "Ativo", variant: "default" as const, color: "bg-[hsl(var(--success))]" },
  warning: { label: "Atenção", variant: "secondary" as const, color: "bg-[hsl(var(--warning))]" },
  danger: { label: "Alerta", variant: "destructive" as const, color: "bg-[hsl(var(--danger))]" },
};

export function CampaignsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [objectiveFilter, setObjectiveFilter] = useState("all");

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.objectives.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesObjective = objectiveFilter === "all" || campaign.objectives === objectiveFilter;
    return matchesSearch && matchesObjective;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Campanhas Ativas</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar campanha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={objectiveFilter} onValueChange={setObjectiveFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Conversão">Conversão</SelectItem>
                <SelectItem value="Awareness">Awareness</SelectItem>
                <SelectItem value="Engajamento">Engajamento</SelectItem>
                <SelectItem value="Tráfego">Tráfego</SelectItem>
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
                <TableHead>Nome</TableHead>
                <TableHead>Objetivos</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>Valor Investido</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {campaign.name}
                      {/* <Badge variant={statusConfig[campaign.status].variant} className="gap-1">
                        <span className={`h-2 w-2 rounded-full ${statusConfig[campaign.status].color}`} />
                        {statusConfig[campaign.status].label}
                      </Badge> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="primary">{campaign.objectives}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{campaign.reach}</TableCell>
                  <TableCell className="text-muted-foreground">{campaign.clicks}</TableCell>
                  <TableCell className="font-medium">{campaign.invested}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
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
