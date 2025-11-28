import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClientCard } from "@/components/ClientCard";
import { ClientDetails } from "@/components/ClientDetails";
import { ChatPanel } from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

const mockClients = [
  {
    id: "1",
    name: "Raiza",
    email: "contato@raiza.com",
    phone: "(11) 98765-4321",
    companies: [
      { id: "c1", name: "Escritório de advocacia LTDA", cnpj: "12.345.678/0001-90" },
    ],
    status: "active" as const,
  },
  {
    id: "2",
    name: "Rodolfo",
    email: "contato@rodolfo.com",
    phone: "(11) 91234-5678",
    companies: [
      { id: "c3", name: "Rizodent LTDA", cnpj: "11.222.333/0001-44" },
      { id: "c4", name: "Rizodent Itabuna", cnpj: "11.222.333/0001-44" },
      { id: "c5", name: "Rizodent Guanambi", cnpj: "11.222.333/0001-44" },
    ],
    status: "active" as const,
  },
  {
    id: "3",
    name: "Edson",
    email: "hello@edson.com",
    phone: "(11) 99999-8888",
    companies: [
      { id: "c4", name: "JM Centro", cnpj: "55.666.777/0001-88" },
      { id: "c5", name: "JM Olivia Flores", cnpj: "44.555.666/0001-99" },
      { id: "c6", name: "JM Móveis", cnpj: "33.444.555/0001-77" },
    ],
    status: "active" as const,
  },
  {
    id: "4",
    name: "MIchel",
    email: "contato@michel.com",
    phone: "(11) 97777-6666",
    companies: [
      { id: "c7", name: "Águas Mucugê", cnpj: "22.333.444/0001-55" },
    ],
    status: "inactive" as const,
  },
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [chatClientId, setChatClientId] = useState<string | null>(null);

  const selectedClient = mockClients.find((c) => c.id === selectedClientId);
  const chatClient = mockClients.find((c) => c.id === chatClientId);

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (id: string) => {
    setSelectedClientId(id);
    setChatClientId(id);
  };

  return (
    <div className="dark min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 ml-64 flex flex-col">
        <DashboardTopbar />

        <div className="p-6 flex-1 flex">
          <div className="flex-1 flex flex-col">
            
            {/* HEADER + BUSCA */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Clientes</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredClients.length} clientes encontrados
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>

            {/* LISTA DE CLIENTES */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={{
                      ...client,
                      companies: client.companies,
                    }}
                    onSelectClient={handleSelectClient}
                    isSelected={client.id === selectedClientId}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* PAINEL DE DETALHES */}
          {/* {selectedClient && (
            <div className="w-96 hidden lg:block border-l border-border/50">
              <ClientDetails
                client={selectedClient}
                onClose={() => setSelectedClientId(null)}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Clientes;
