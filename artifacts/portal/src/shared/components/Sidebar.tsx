import { Link, useLocation } from "wouter";
import {
  ArrowLeftRight,
  BookOpen,
  TrendingUp,
  Users,
  Gem,
  Hammer,
  Package,
  ShoppingCart,
  ShoppingBag,
  Diamond,
  Hexagon
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MAIN_MENU = [
  { name: "Transactions", icon: ArrowLeftRight, path: "/transactions" },
  { name: "Ledger", icon: BookOpen, path: "/ledger" },
  { name: "Finance Planning", icon: TrendingUp, path: "/finance" },
  { name: "Team Management", icon: Users, path: "/team" },
];

const MANAGEMENT = [
  { name: "Gold Management", icon: Gem, path: "/gold" },
  { name: "Karigar", icon: Hammer, path: "/karigar" },
  { name: "Stock Management", icon: Package, path: "/stock" },
  { name: "Sales", icon: ShoppingCart, path: "/sales" },
  { name: "Purchase", icon: ShoppingBag, path: "/purchase" },
  { name: "Diamond Management", icon: Diamond, path: "/diamond" },
];

export default function Sidebar() {
  const [location] = useLocation();

  const NavItem = ({ item }: { item: { name: string; icon: any; path: string } }) => {
    const isActive = location.startsWith(item.path);
    const Icon = item.icon;

    return (
      <Link href={item.path} className="block w-full">
        <div
          data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            isActive
              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="text-sm">{item.name}</span>
        </div>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col flex-shrink-0" data-testid="sidebar">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <Hexagon className="h-6 w-6 text-sidebar-primary fill-sidebar-primary" />
          <span className="font-bold text-lg tracking-tight">Portal</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
        <div className="mb-6">
          <h2 className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </h2>
          <nav className="space-y-1">
            {MAIN_MENU.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-3">
            Management
          </h2>
          <nav className="space-y-1">
            {MANAGEMENT.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground">
            <AvatarFallback className="bg-transparent text-sm">AU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">Admin User</span>
            <span className="text-xs text-sidebar-foreground/60">admin@portal.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
