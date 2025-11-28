import { Play, Pause, TrendingUp, DollarSign, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export interface CampaignData {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate?: string;
}

interface CampaignCardProps {
  campaign: CampaignData;
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const statusConfig = {
    active: { label: "Ativa", color: "bg-success" },
    paused: { label: "Pausada", color: "bg-muted" },
    completed: { label: "Finalizada", color: "bg-primary" },
  };

  const handlePauseToggle = () => {
    const newStatus = campaign.status === "active" ? "pausada" : "reativada";
    toast.success(`Campanha ${newStatus} com sucesso!`, {
      description: campaign.name,
    });
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-lg font-semibold text-foreground">
              {campaign.name}
            </h4>
            <Badge
              className={`${statusConfig[campaign.status].color} text-white text-xs`}
            >
              {statusConfig[campaign.status].label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {campaign.startDate}
            {campaign.endDate && ` - ${campaign.endDate}`}
          </p>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={handlePauseToggle}
          className="shrink-0"
        >
          {campaign.status === "active" ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Orçamento</p>
          <p className="text-sm font-semibold text-foreground">
            R$ {campaign.budget.toLocaleString('pt-BR')}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Gasto</p>
          <p className="text-sm font-semibold text-accent">
            R$ {campaign.spent.toLocaleString('pt-BR')}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Impressões
          </p>
          <p className="text-sm font-semibold text-foreground">
            {campaign.impressions.toLocaleString('pt-BR')}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Conversões</p>
          <p className="text-sm font-semibold text-success">
            {campaign.conversions}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">ROI</span>
        </div>
        <span
          className={`text-base font-bold ${
            campaign.roi > 0 ? "text-success" : "text-destructive"
          }`}
        >
          {campaign.roi > 0 ? "+" : ""}
          {campaign.roi}%
        </span>
      </div>
    </Card>
  );
};
