import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const clientGrowthData = [
  { month: "Jan", clients: 12 },
  { month: "Fev", clients: 15 },
  { month: "Mar", clients: 18 },
  { month: "Abr", clients: 22 },
  { month: "Mai", clients: 25 },
  { month: "Jun", clients: 28 },
];

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 border w-100% border-white">

      <Card>
        <CardHeader>
          <CardTitle>Crescimento de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="clients" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
