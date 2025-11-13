// ClientView.tsx
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

import { ClientDetails } from "@/components/ClientDetails";
import { ChatPanel } from "@/components/ChatPanel";
import { useLocation } from "react-router-dom";

interface ClientViewProps {
    onClose: () => void;
}

type ClientType = {
    client: {
        id: string;
        name: string;
        email: string;
        phone: string;
        companies: { id: string; name: string; cnpj: string }[];
    };
}

export default function ClientView() {

    const location = useLocation()
    const client = location.state.client

return (
    <div className="h-screen w-full flex bg-background">
        {/* Sidebar fixa */}
        <DashboardSidebar />

    {/* Conteúdo principal */}
        <div className="flex flex-col flex-1">
            {/* Topbar */}
            <DashboardTopbar />
            <div className=" overflow-auto">
                <ClientDetails />
            </div>

            {/* Área dividida entre detalhes e chat */}
            {/* <div className="flex flex-1 overflow-hidden border-t border-border"> */}
            {/* METADE ESQUERDA - DETALHES DO CLIENTE */}
            {/* <div className="w-1/2 border-r border-border overflow-auto">
                <ClientDetails client={client} />
            </div> */}

            {/* METADE DIREITA - CHAT */}
            {/* <div className="w-1/2 overflow-auto">
                <ChatPanel clientName={client.name} />
            </div> */}
            {/* </div> */}
        </div>
    </div>
);
}
