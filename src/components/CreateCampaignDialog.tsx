import { useState } from "react";
import { ClipboardPlus, Calendar, Send, CheckSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AVAILABLE_METRICS = [
  { id: "impressions", label: "Impressões" },
  { id: "clicks", label: "Cliques" },
  { id: "ctr", label: "CTR" },
  { id: "cpc", label: "CPC (Custo por Clique)" },
  { id: "spend", label: "Gastos" },
  { id: "conversions", label: "Conversões" },
  { id: "cpa", label: "CPA (Custo por Aquisição)" },
  { id: "roas", label: "ROAS (Retorno sobre Gasto)" },
  { id: "reach", label: "Alcance" },
  { id: "frequency", label: "Frequência" },
];

export const CreateCampaignDialog  = () => {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState<"immediate" | "scheduled">("immediate");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "impressions",
    "clicks",
    "spend",
  ]);
  const [formData, setFormData] = useState({
    reportName: "",
    whatsappDestination: "",
    destinationType: "number",
    scheduleFrequency: "daily",
    scheduleTime: "09:00",
    scheduleDays: [] as string[],
    startDate: "",
    endDate: "",
  });

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId)
        ? prev.filter((id) => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMetrics.length === 0) {
      toast.error("Selecione pelo menos uma métrica para o relatório");
      return;
    }

    if (!formData.whatsappDestination) {
      toast.error("Informe o destino do WhatsApp");
      return;
    }

    const metricsText = selectedMetrics
      .map((id) => AVAILABLE_METRICS.find((m) => m.id === id)?.label)
      .join(", ");

    if (reportType === "immediate") {
      toast.success("Relatório gerado com sucesso!", {
        description: `Enviando para WhatsApp: ${formData.whatsappDestination}`,
      });
    } else {
      toast.success("Relatório programado com sucesso!", {
        description: `Será enviado ${formData.scheduleFrequency === "daily" ? "diariamente" : formData.scheduleFrequency === "weekly" ? "semanalmente" : "mensalmente"} às ${formData.scheduleTime}`,
      });
    }

    // Reset form
    setFormData({
      reportName: "",
      whatsappDestination: "",
      destinationType: "number",
      scheduleFrequency: "daily",
      scheduleTime: "09:00",
      scheduleDays: [],
      startDate: "",
      endDate: "",
    });
    setSelectedMetrics(["impressions", "clicks", "spend"]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button className="gap-2 from-primary to-accent hover:opacity-90 transition-opacity">
          <ClipboardPlus className="w-4 h-4" />
          Gerar Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="dark sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background text-foreground border-borders">
        <DialogHeader>
          <DialogTitle className="text-2xl">Configurar Relatório</DialogTitle>
          <DialogDescription>
            Configure o relatório de campanhas Meta Ads
          </DialogDescription>
        </DialogHeader>

        <Tabs value={reportType} onValueChange={(v) => setReportType(v as typeof reportType)}>
          <TabsList className="dark grid w-full grid-cols-2">
            <TabsTrigger value="immediate" className="gap-2">
              <Send className="w-4 h-4" />
              Gerar Agora
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="gap-2">
              <Calendar className="w-4 h-4" />
              Programar
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="reportName">Nome do Relatório</Label>
              <Input
                id="reportName"
                placeholder="Ex: Relatório Mensal - Meta Ads"
                value={formData.reportName}
                onChange={(e) =>
                  setFormData({ ...formData, reportName: e.target.value })
                }
                required
              />
            </div>

            {/* WhatsApp Destination */}
            <div className="space-y-4">
              <Label>Destino WhatsApp</Label>
              <RadioGroup
                value={formData.destinationType}
                onValueChange={(value) =>
                  setFormData({ ...formData, destinationType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="number" id="number" />
                  <Label htmlFor="number" className="font-normal cursor-pointer">
                    Número
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="font-normal cursor-pointer">
                    Grupo
                  </Label>
                </div>
              </RadioGroup>
              <Input
                placeholder={
                  formData.destinationType === "number"
                    ? "Ex: +5511999999999"
                    : "Ex: Nome do Grupo ou ID do Grupo"
                }
                value={formData.whatsappDestination}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappDestination: e.target.value })
                }
                required
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Período dos Dados</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm text-muted-foreground">
                    Data Inicial
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm text-muted-foreground">
                    Data Final
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Scheduled Options */}
            <TabsContent value="scheduled" className="space-y-4 m-0">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequência</Label>
                <Select
                  value={formData.scheduleFrequency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, scheduleFrequency: value })
                  }
                >
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="monthly">Mensalmente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário de Envio</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.scheduleTime}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduleTime: e.target.value })
                  }
                  required
                />
              </div>

              {formData.scheduleFrequency === "weekly" && (
                <div className="space-y-2">
                  <Label>Dias da Semana</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map(
                      (day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={formData.scheduleDays.includes(day)}
                            onCheckedChange={(checked) => {
                              setFormData({
                                ...formData,
                                scheduleDays: checked
                                  ? [...formData.scheduleDays, day]
                                  : formData.scheduleDays.filter((d) => d !== day),
                              });
                            }}
                          />
                          <Label
                            htmlFor={day}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {day}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Metrics Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <Label>Métricas a Incluir</Label>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/30">
                {AVAILABLE_METRICS.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                    />
                    <Label
                      htmlFor={metric.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {metric.label}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedMetrics.length} métrica(s) selecionada(s)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {reportType === "immediate" ? "Gerar e Enviar" : "Programar Relatório"}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};