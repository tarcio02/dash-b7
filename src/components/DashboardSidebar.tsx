import { LayoutDashboard, Users, Building2, Megaphone, DollarSign, Settings, ClipboardList   } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FaHandshake } from "react-icons/fa";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Funcionários", href: "/colabs", icon: Users },
  { name: "Clientes", href: "/clientes", icon: FaHandshake },
  { name: "Empresas", href: "/empresas", icon: Building2 },
  { name: "Campanhas ADS", href: "/campanhas", icon: Megaphone },
  { name: "Tarefas", href: "/financeiro", icon: ClipboardList   },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

import logo from "../assets/Logo.png"

export function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex justify-center items-center gap-2 ">
            <img src={logo} alt="logo" className="w-24"/>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5", isActive && "animate-scale-in")} />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-medium text-foreground">Precisa de ajuda?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Entre em contato com o suporte
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
