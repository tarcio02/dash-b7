import { useState } from "react";
import { Plus } from "lucide-react";
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
import { toast } from "sonner";

export const CreateBMDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    bmId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular criação da BM
    toast.success("Business Manager cadastrada com sucesso!", {
      description: `${formData.clientName} foi adicionada ao sistema.`,
    });
    
    setFormData({ clientName: "", bmId: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >
          <Plus className="w-4 h-4" />
          Nova conta
        </Button>
      </DialogTrigger>
      <DialogContent className="dark sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle className="dark text-2xl">Cadastrar Nova BM</DialogTitle>
          <DialogDescription>
            Adicione uma nova Business Manager do Meta ao sistema
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Nome do Cliente</Label>
            <Input
              id="clientName"
              placeholder="Ex: Empresa XYZ Ltda"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bmId">ID da Business Manager</Label>
            <Input
              id="bmId"
              placeholder="Ex: 123456789012345"
              value={formData.bmId}
              onChange={(e) =>
                setFormData({ ...formData, bmId: e.target.value })
              }
              required
            />
          </div>
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
              className="flex-1  bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Cadastrar BM
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
