import { useState } from "react";
import { Plus, Wallet, Landmark, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTransactions } from "../data/mockTransactions";
import MetricCard from "../components/MetricCard";
import CashBookTable from "../components/CashBookTable";

export default function Transactions() {
  const [activeTab, setActiveTab] = useState("daily");

  const metrics = [
    {
      title: "Cash in Hand",
      value: "₹1,24,500",
      delta: "+₹12,400 today",
      icon: <Wallet className="h-5 w-5" />,
      iconBgColor: "rgba(16, 185, 129, 0.1)",
      iconColor: "rgb(16, 185, 129)",
    },
    {
      title: "Bank Balance",
      value: "₹8,45,320",
      delta: "+₹45,000 this week",
      icon: <Landmark className="h-5 w-5" />,
      iconBgColor: "rgba(59, 130, 246, 0.1)",
      iconColor: "rgb(59, 130, 246)",
    },
    {
      title: "Cash Flow In",
      value: "₹2,18,750",
      delta: "+18% this month",
      icon: <TrendingUp className="h-5 w-5" />,
      iconBgColor: "rgba(5, 150, 105, 0.1)",
      iconColor: "rgb(5, 150, 105)",
    },
    {
      title: "Bank Flow In",
      value: "₹5,62,100",
      delta: "+₹78,000 this month",
      icon: <TrendingDown className="h-5 w-5" />,
      iconBgColor: "rgba(79, 70, 229, 0.1)",
      iconColor: "rgb(79, 70, 229)",
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full" data-testid="page-transactions">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">Transactions</h1>
          <p className="text-muted-foreground text-sm">Manage cashbook & daily reconciliation</p>
        </div>
        
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" data-testid="btn-add-transaction">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b border-border mb-6">
          <TabsList className="bg-transparent p-0 h-auto gap-6 w-full justify-start rounded-none">
            <TabsTrigger 
              value="daily" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-1 font-medium"
              data-testid="tab-daily"
            >
              Daily Cash Reconciliation
            </TabsTrigger>
            <TabsTrigger 
              value="ledger" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-1 font-medium"
              data-testid="tab-ledger"
            >
              Cash Book
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="space-y-8 animate-in fade-in-50 duration-500 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <MetricCard key={metric.title} {...metric} index={i} />
            ))}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
            <CashBookTable transactions={mockTransactions} />
          </div>
        </TabsContent>

        <TabsContent value="ledger" className="animate-in fade-in-50 duration-500 mt-0">
          <div className="mb-6 bg-card border border-border rounded-xl p-5 shadow-sm flex flex-wrap gap-8 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Cash Book Ledger</h2>
              <p className="text-sm text-muted-foreground">Showing full historical ledger data</p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Opening Balance</p>
                <p className="font-semibold text-foreground">₹4,25,000</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total Credits</p>
                <p className="font-semibold text-emerald-600">₹8,52,000</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total Debits</p>
                <p className="font-semibold text-red-600">₹3,47,500</p>
              </div>
              <div className="pl-4 border-l border-border">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Closing Balance</p>
                <p className="font-bold text-blue-600 text-lg">₹9,29,500</p>
              </div>
            </div>
          </div>

          <CashBookTable transactions={mockTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
