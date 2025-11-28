import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BMStats } from "@/components/BMStats";
import { BMCard, BMData } from "@/components/BMCard";
import { CreateBMDialog } from "@/components/CreateBMDialog";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// Mock data
export const mockBMs: BMData[] = [
  {
    id: "1",
    clientName: "Rizo Dent",
    bmId: "123456789012345",
    activeCampaigns: 8,
    totalSpent: 45000,
    roi: 235,
    status: "active",
    lastUpdate: "há 2 horas",
  },
  {
    id: "2",
    clientName: "Águas Mucugê",
    bmId: "987654321098765",
    activeCampaigns: 5,
    totalSpent: 28000,
    roi: 180,
    status: "active",
    lastUpdate: "há 5 horas",
  },
  {
    id: "3",
    clientName: "Donna M",
    bmId: "456789123456789",
    activeCampaigns: 3,
    totalSpent: 15000,
    roi: -12,
    status: "active",
    lastUpdate: "há 1 dia",
  },
  {
    id: "4",
    clientName: "Athletic Nutriton",
    bmId: "741852963741852",
    activeCampaigns: 0,
    totalSpent: 12000,
    roi: 145,
    status: "active",
    lastUpdate: "há 3 dias",
  },
];

const Campanhas = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = {
    totalBMs: mockBMs.length,
    activeCampaigns: mockBMs.reduce((acc, bm) => acc + bm.activeCampaigns, 0),
    totalSpent: mockBMs.reduce((acc, bm) => acc + bm.totalSpent, 0),
    averageROI: Math.round(
      mockBMs.reduce((acc, bm) => acc + bm.roi, 0) / mockBMs.length
    ),
  };

  const filteredBMs = mockBMs.filter(
    (bm) =>
      bm.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bm.bmId.includes(searchTerm)
  );

  return (
    <div className="dark min-h-screen bg-background">
      <div className="fixed left-0 top-0 h-full">
        <DashboardSidebar />
      </div>

      <div className="flex-1 ml-64">
        <DashboardTopbar /> 
        {/* Header */}
        <div className="mt-8 px-8 pb-8 mt-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Conta do Meta: Branding7
          </h1>
          {/* <p className="text-muted-foreground text-lg">
            Gerencie todas as BMs dos seus clientes em um único lugar
          </p> */}
          <div className="flex gap-4">
            <Select >
              <SelectTrigger className="w-full sm:w-36 text-white">
                <SelectValue placeholder="Contas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Branding7</SelectItem>
                <SelectItem value="warning">Yury Nóbrega</SelectItem>
              </SelectContent>
            </Select>
            <CreateBMDialog />
          </div>
        </div>

        {/* Stats */}
        <div className=" px-8 pb-8">
          <BMStats stats={stats} />
        </div>

        {/* Actions Bar */}
        <div className=" px-8 pb-8 flex flex-col sm:flex-row gap-4 ">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Buscar conta de anúcio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* BMs Grid */}
        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBMs.map((bm) => (
            <BMCard key={bm.id} bm={bm} />
          ))}
        </div>

        {filteredBMs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma Business Manager encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campanhas;
