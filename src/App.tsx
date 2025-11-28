import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./components/Auth";
import EmployeeProfile from "./pages/EmployeeProfile";
import Dashboard from "./pages/Dashboard";
import Clientes  from "./pages/Clientes";
import { ClientDetails } from "./components/ClientDetails";
import Empresas from "./pages/Empresas";
import CompanyTasks from "./pages/CompanyTasks";
import Campanhas from "./pages/Campanhas";
import BMDetails from "./pages/BMDetails";
import LayoutCliente from "./pages/LayoutCliente";
import LayoutColaborador from "./pages/LayoutColaborador";

const queryClient = new QueryClient();

const App = () => ( 
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="auth" element={<Auth />}/>
          <Route path="colabs" element={<Dashboard />}/>
          <Route path="employee/:id" element={<EmployeeProfile />}/>
          <Route path="clientes" element={<Clientes/>}/>
          <Route path="/client-details" element={<ClientDetails />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empresas/:companyId/tasks" element={<CompanyTasks />} />
          <Route path="/campanhas" element={<Campanhas />} />
          <Route path="/campanhas/:id" element={<BMDetails />} />
          <Route path="/panel-cliente" element={<LayoutCliente />} />
          <Route path="/panel-colaborador" element={<LayoutColaborador />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
