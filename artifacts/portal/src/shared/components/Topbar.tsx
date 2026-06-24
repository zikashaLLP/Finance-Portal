import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export default function Topbar() {
  const [location] = useLocation();
  
  const getPageContext = () => {
    if (location.startsWith("/transactions")) {
      return { title: "Transactions", subtitle: "Manage cashbook & daily reconciliation" };
    }
    if (location.startsWith("/ledger")) {
      return { title: "Ledger", subtitle: "View complete ledger" };
    }
    return { title: "Dashboard", subtitle: "Overview" };
  };

  const { title, subtitle } = getPageContext();

  return (
    <header className="h-20 bg-transparent border-b border-border flex items-center justify-between px-8 shrink-0" data-testid="topbar">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">{title}</h1>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-background border-border focus-visible:ring-1 focus-visible:bg-background h-9 shadow-sm rounded-full text-sm"
            data-testid="input-global-search"
          />
        </div>
        
        <button className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm" data-testid="btn-notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ring-2 ring-background">
          </span>
        </button>
      </div>
    </header>
  );
}
