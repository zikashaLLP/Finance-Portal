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
  Hexagon,
  ChevronRight,
  LifeBuoy,
  Settings
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
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors mb-0.5 ${
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`h-4 w-4 ${isActive ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-sm">{item.name}</span>
          </div>
          {isActive && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
        </div>
      </Link>
    );
  };

  return (
    <aside className="w-[260px] bg-transparent h-full flex flex-col flex-shrink-0" data-testid="sidebar">
      <div className="h-16 flex items-center px-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-background fill-background" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Portal</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 no-scrollbar">
        <div className="mb-6">
          <h2 className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
            Menu
          </h2>
          <nav>
            {MAIN_MENU.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
            Management
          </h2>
          <nav>
            {MANAGEMENT.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>

      <div className="px-3 pb-1">
        <div className="border-t border-border mb-2 pt-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-0.5">
            <LifeBuoy className="h-4 w-4" />
            <span className="text-sm">Help Center</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-2">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-blue-100 text-blue-700">
                <AvatarFallback className="bg-transparent text-xs font-semibold">AU</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground leading-none mb-1">Admin User</span>
                <span className="text-[11px] text-muted-foreground leading-none">admin@portal.com</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  );
}
