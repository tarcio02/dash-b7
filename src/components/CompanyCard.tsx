import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, User, Calendar, CreditCard, ListTodo } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    adminName: string;
    contractStartDate: string;
    status: 'active' | 'inactive' | 'pending';
    plan: string;
    logo?: string;
  };
}

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inativo', className: 'bg-muted text-muted-foreground border-border' },
  pending: { label: 'Pendente', className: 'bg-warning/10 text-warning border-warning/20' },
};

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const statusInfo = statusConfig[company.status];
  const navigate = useNavigate();

  return (
    <Card className="p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-primary)] group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            <Badge className={statusInfo.className}>
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Admin:</span>
          <span className="text-foreground font-medium">{company.adminName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Início:</span>
          <span className="text-foreground font-medium">{company.contractStartDate}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Plano:</span>
          <span className="text-foreground font-medium">{company.plan}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button
          onClick={() => navigate(`/empresas/${company.id}/tasks`)}
          className="w-full"
          variant="outline"
        >
          <ListTodo className="w-4 h-4" />
          Tasks
        </Button>
      </div>
    </Card>
  );
};
