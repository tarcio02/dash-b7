import { Bell, Settings, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage  } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import administrador from "../assets/administrador-icon.png"

export function DashboardTopbarClient() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
      <div className="flex flex-1 items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {greeting}, <span className="text-primary">Nome do Gerente/Administrador</span>
          </h2>
          <p className="text-xs text-muted-foreground">Bem-vindo ao painel de métricas de sua empresa</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" color="white"/>
              <Badge className="absolute -top-0 -right-0 h-4 w-4 rounded-full p-0 flex items-center justify-center primary text-white text-xs border border-white">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full justify-between">
                  <span className="font-medium text-sm">Boleto Atrasado</span>
                  <span className="text-xs text-muted-foreground">2h atrás</span>
                </div>
                <p className="text-xs text-muted-foreground">Cliente Tech Solutions está com pagamento pendente</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full justify-between">
                  <span className="font-medium text-sm">Contrato Vencendo</span>
                  <span className="text-xs text-muted-foreground">5h atrás</span>
                </div>
                <p className="text-xs text-muted-foreground">Renovar contrato de Marketing Plus em 7 dias</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full justify-between">
                  <span className="font-medium text-sm">Nova Campanha</span>
                  <span className="text-xs text-muted-foreground">1d atrás</span>
                </div>
                <p className="text-xs text-muted-foreground">Campanha de verão iniciada com sucesso</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" color="white"/>
        </Button> */}

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 bg-white/30 border border-white">
              <Avatar className="h-7 w-7">
                <AvatarImage src={administrador} alt="Gerente" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium  text-[hsl(215,20%,75%)]">Nome</span>
              {/* <ChevronDown className="h-4 w-4 text-muted-foreground" color="hsl(215,20%,85%)"/> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
