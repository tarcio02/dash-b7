import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { StatsCard } from "./StatsCard";
import { Building2, Megaphone, DollarSign, Phone, Calendar, Plus, Trash2, TrendingUp, Ban, CheckCircle } from "lucide-react";

interface Company {
  id: string;
  name: string;
  cnpj: string;
}

interface ClientDetailsProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    companies: Company[];
  };
}

export const ClientDetails = () => {
  const location = useLocation();
  const client = location.state?.client;

  if (!client) {
    return <p className="p-6 text-muted-foreground">Nenhum cliente selecionado.</p>;
  }

  const [companies, setCompanies] = useState<Company[]>(client.companies);
  const [isAdding, setIsAdding] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyCnpj, setNewCompanyCnpj] = useState("");

  const handleAddCompany = () => {
    if (!newCompanyName || !newCompanyCnpj) {
      toast.error("Preencha todos os campos");
      return;
    }

    const newCompany: Company = {
      id: Date.now().toString(),
      name: newCompanyName,
      cnpj: newCompanyCnpj,
    };

    setCompanies([...companies, newCompany]);
    setNewCompanyName("");
    setNewCompanyCnpj("");
    setIsAdding(false);
    toast.success("Empresa adicionada com sucesso");
  };

  const handleRemoveCompany = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
    toast.success("Empresa removida");
  };

  return (
    <div className="dark flex h-screen bg-background">
      {/* Sidebar fixa à esquerda */}
      <div className="w-64 border-r border-border">
        <DashboardSidebar />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header fixo */}
        <div className="border-b border-border">
          <DashboardTopbar />
        </div>

        {/* Conteúdo rolável */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{client.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{client.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Tarefas Concluídas"
              value={14}
              icon={CheckCircle }
              description="20 tarefas totais"
            />
            <StatsCard
              title="Campanhas ativas"
              value={6}
              icon={Megaphone }
              description={`14 Campanhas Totais`}
            />
            <StatsCard
              title="Investimento Total em campnhas"
              value={1.500}
              icon={Ban} 
              description="Limite 2.000,00"
            />
            <StatsCard
              title="ROI Médio"
              value={`147%`}
              icon={TrendingUp}
              description="Média Indivídual"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Empresas Vinculadas</h3>
            <Button
              size="sm"
              onClick={() => setIsAdding(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>

          {isAdding && (
            <Card className="p-4 mb-4 bg-secondary border-border">
              <div className="space-y-3">
                <Input
                  placeholder="Nome da empresa"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="bg-background border-border"
                />
                <Input
                  placeholder="CNPJ"
                  value={newCompanyCnpj}
                  onChange={(e) => setNewCompanyCnpj(e.target.value)}
                  className="bg-background border-border"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddCompany}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setIsAdding(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            {companies.map((company) => (
              <Card
                key={company.id}
                className="p-4 bg-gradient-card border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.cnpj}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCompany(company.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

