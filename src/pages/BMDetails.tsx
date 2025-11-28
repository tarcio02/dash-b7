import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CampaignCard, CampaignData } from "@/components/CampaignCard";
import { CreateCampaignDialog } from "@/components/CreateCampaignDialog";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { BMStats } from "@/components/BMStats";

// Mock data
const mockCampaigns: CampaignData[] = [
  {
    id: "1",
    name: "Campanha Black Friday 2024",
    status: "active",
    budget: 15000,
    spent: 8450,
    impressions: 245000,
    clicks: 8900,
    conversions: 234,
    roi: 285,
    startDate: "15/11/2024",
    endDate: "30/11/2024",
  },
  {
    id: "2",
    name: "Lançamento Produto Premium",
    status: "active",
    budget: 10000,
    spent: 6200,
    impressions: 180000,
    clicks: 5400,
    conversions: 156,
    roi: 195,
    startDate: "01/11/2024",
    endDate: "31/12/2024",
  },
  {
    id: "3",
    name: "Remarketing Carrinho Abandonado",
    status: "active",
    budget: 5000,
    spent: 3100,
    impressions: 95000,
    clicks: 3200,
    conversions: 89,
    roi: 145,
    startDate: "10/11/2024",
  },
  {
    id: "4",
    name: "Campanha Verão 2024",
    status: "paused",
    budget: 8000,
    spent: 4500,
    impressions: 120000,
    clicks: 4100,
    conversions: 102,
    roi: 165,
    startDate: "01/10/2024",
    endDate: "31/10/2024",
  },
];

const BMDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

    const stats = {
      totalBMs: mockCampaigns.length,
      activeCampaigns: mockCampaigns.filter(item => item.status === "active").length,
      totalSpent: mockCampaigns.reduce((acc, bm) => acc + bm.budget, 0),
      averageROI: Math.round(
        mockCampaigns.reduce((acc, bm) => acc + bm.roi, 0) / mockCampaigns.length
      ),
    };

  // Mock BM data
  const bmData = {
    id,
    clientName: "TechStart Solutions",
    bmId: "123456789012345",
    status: "active" as const,
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCampaigns = filteredCampaigns.filter(
    (c) => c.status === "active"
  ).length;
  const totalSpent = filteredCampaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalBudget = filteredCampaigns.reduce((acc, c) => acc + c.budget, 0);

  return (
    <div className="dark min-h-screen bg-background">
      <div className="fixed left-0 top-0 h-full">
        <DashboardSidebar />
      </div>
  
      <div className="flex-1 ml-64 ">
          <DashboardTopbar />
        {/* Header */}
        <div className=" px-8 pb-8 mt-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-2 mt-4 gap-2 text-white border border-white/"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold text-foreground ">
            {bmData.clientName}
          </h1>
          
        </div>

        {/* Quick Stats */}
        <div className="px-8 pb-8">
          <BMStats stats={stats} isAccount/>
        </div>

        {/* Actions Bar */}
        <div className="px-8 flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Buscar campanha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <CreateCampaignDialog />
        </div>

        {/* Campaigns Grid */}
        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma campanha encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMDetails;
