import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default function Topbar() {
  const today = new Date();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0" data-testid="topbar">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="w-full pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:bg-background h-9 shadow-none"
            data-testid="input-global-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-muted-foreground hidden md:block">
          {format(today, "EEEE, dd MMM yyyy")}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-muted-foreground hover:text-foreground transition-colors" data-testid="btn-notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
          </button>
          
          <div className="h-6 w-px bg-border"></div>

          <Avatar className="h-8 w-8 ring-1 ring-border cursor-pointer">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">AU</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
