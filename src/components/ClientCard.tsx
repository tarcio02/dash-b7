import { Building2, Mail, Phone, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    companies: { id: string; name: string; cnpj: string }[];
    status: "active" | "inactive";
  };
  onSelectClient: (id: string) => void;
  isSelected: boolean;
}

export const ClientCard = ({ client, onSelectClient, isSelected }: ClientCardProps) => {

  const navigate = useNavigate()

  return (
    <Card 
      className={`p-4 bg-gradient-card border-border hover:border-primary transition-all cursor-pointer ${
        isSelected ? "border-primary shadow-glow" : ""
      }`}
      onClick={() => navigate("/client-details", { state: { client } })}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.companies.length} empresas</p>
          </div>
        </div>
        <Badge variant={client.status === "active" ? "default" : "secondary"} className="bg-success text-success-foreground">
          {client.status === "active" ? "Ativo" : "Inativo"}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          {client.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          {client.phone}
        </div>
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="w-full border-hsl(var(--background) hover:bg-primary/10"
        onClick={(e) => {
          e.stopPropagation();
          onSelectClient(client.id);
          navigate("/client-details", { state: { client } })
        }}
      >
        <Building2 className="w-4 h-4 mr-2"/>
        {/* <MessageSquare  /> */}
        Ver Empresas
      </Button>
    </Card>
  );
};
