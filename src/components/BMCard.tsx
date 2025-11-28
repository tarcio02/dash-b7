import { ArrowRight, DollarSign, TrendingUp, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export interface BMData {
  id: string;
  clientName: string;
  bmId: string;
  activeCampaigns: number;
  totalSpent: number;
  roi: number;
  status: "active" | "paused" | "warning";
  lastUpdate: string;
}

interface BMCardProps {
  bm: BMData;
}

export const BMCard = ({ bm }: BMCardProps) => {
  const navigate = useNavigate();

  const statusConfig = {
    active: { label: "Ativa", color: "bg-success" },
    paused: { label: "Pausada", color: "bg-warning" },
    warning: { label: "Atenção", color: "bg-warning" },
  };

  return (
    <Card className="group p-6 bg-gradient-card border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-foreground">
              {bm.clientName}
            </h3>
            <Badge
              className={`${statusConfig[bm.status].color} text-white text-xs`}
              
            >
              {statusConfig[bm.status].label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">ID: {bm.bmId}</p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Campanhas Ativas</span>
          </div>
          <span className="text-base font-semibold text-foreground">
            {bm.activeCampaigns}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Investimento</span>
          </div>
          <span className="text-base font-semibold text-foreground">
            R$ {bm.totalSpent.toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">ROI</span>
          </div>
          <span className={`text-base font-semibold ${bm.roi > 0 ? 'text-success' : 'text-destructive'}`}>
            {bm.roi > 0 ? '+' : ''}{bm.roi}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        {/* <span className="text-xs text-muted-foreground">
          Atualizado {bm.lastUpdate}
        </span> */}
        <Button
          onClick={() => navigate(`/campanhas/${bm.id}`)}
          className="w-full"
          variant="outline"
        >
          Acessar Conta
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
