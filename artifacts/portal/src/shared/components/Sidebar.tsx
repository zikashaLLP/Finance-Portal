import { useState } from "react";
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
  Settings,
  Truck,
  Medal,
  FileText,
  Layers,
  Box,
  BarChart2,
  UserCheck,
  RefreshCw,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type FlatItem  = { kind: "flat";  name: string; icon: React.ElementType; path: string };
type GroupItem = { kind: "group"; name: string; icon: React.ElementType; children: { name: string; path: string }[] };
type MenuItem  = FlatItem | GroupItem;

const MAIN_MENU: FlatItem[] = [
  { kind: "flat", name: "Transactions",     icon: ArrowLeftRight, path: "/transactions" },
  { kind: "flat", name: "Ledger",           icon: BookOpen,       path: "/ledger"       },
  { kind: "flat", name: "Finance Planning", icon: TrendingUp,     path: "/finance"      },
  { kind: "flat", name: "Team Management",  icon: Users,          path: "/team"         },
  { kind: "flat", name: "Ground Staff",     icon: Truck,          path: "/ground-staff" },
];

const MANAGEMENT: MenuItem[] = [
  { kind: "flat",  name: "Gold Management", icon: Gem,         path: "/gold" },
  {
    kind: "group", name: "Silver", icon: Medal,
    children: [
      { name: "Silver Management", path: "/silver" },
    ],
  },
  {
    kind: "group", name: "Karigar", icon: Hammer,
    children: [
      { name: "Karigar Section",  path: "/karigar/section"  },
      { name: "Karigar Reports",  path: "/karigar/reports"  },
      { name: "Bulk Management",  path: "/karigar/bulk"     },
      { name: "Bulk Order",       path: "/karigar/orders"   },
    ],
  },
  {
    kind: "group", name: "Stock Management", icon: Package,
    children: [
      { name: "Stock Management",    path: "/stock"                },
      { name: "Stock Tally Report",  path: "/stock/tally"          },
      { name: "Summary",             path: "/stock/summary"        },
      { name: "Material Report",     path: "/stock/material"       },
    ],
  },
  {
    kind: "group", name: "Sales", icon: ShoppingCart,
    children: [
      { name: "Sales",   path: "/sales"         },
      { name: "Clients", path: "/sales/clients" },
    ],
  },
  {
    kind: "group", name: "Purchase", icon: ShoppingBag,
    children: [
      { name: "Purchase", path: "/purchase"         },
      { name: "Vendors",  path: "/purchase/vendors" },
    ],
  },
  {
    kind: "group", name: "Diamond Quality", icon: Diamond,
    children: [
      { name: "Quality Tracking",    path: "/diamond/tracking" },
      { name: "Diamond Orders",      path: "/diamond/orders"   },
      { name: "Return Workflow",     path: "/diamond/returns"  },
    ],
  },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const initially = new Set<string>();
    MANAGEMENT.forEach((item) => {
      if (item.kind === "group" && item.children.some((c) => location.startsWith(c.path))) {
        initially.add(item.name);
      }
    });
    return initially;
  });

  function toggleGroup(name: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const FlatNavItem = ({ item }: { item: FlatItem }) => {
    const isActive = location.startsWith(item.path);
    const Icon = item.icon;
    return (
      <Link href={item.path} className="block w-full">
        <div
          data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg transition-colors mb-0.5",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className={cn("h-4 w-4", isActive && "stroke-[2.5px]")} />
            <span className="text-sm">{item.name}</span>
          </div>
          {isActive && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
        </div>
      </Link>
    );
  };

  const GroupNavItem = ({ item }: { item: GroupItem }) => {
    const isOpen = openGroups.has(item.name);
    const hasActive = item.children.some((c) => location.startsWith(c.path));
    const Icon = item.icon;

    return (
      <div className="mb-0.5">
        {/* Parent row */}
        <button
          onClick={() => toggleGroup(item.name)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
            hasActive
              ? "text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className={cn("h-4 w-4", hasActive && "stroke-[2.5px]")} />
            <span className="text-sm">{item.name}</span>
          </div>
          <ChevronRight
            className={cn(
              "h-3 w-3 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-90",
            )}
          />
        </button>

        {/* Sub-items */}
        {isOpen && (
          <div className="mt-0.5 ml-3 pl-4 border-l border-border space-y-0.5">
            {item.children.map((child) => {
              const isChildActive = location.startsWith(child.path);
              return (
                <Link key={child.path} href={child.path} className="block w-full">
                  <div
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-[13px]",
                      isChildActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", isChildActive ? "bg-foreground" : "bg-muted-foreground/40")} />
                    {child.name}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-[220px] bg-transparent h-full flex flex-col flex-shrink-0" data-testid="sidebar">
      <div className="h-16 flex items-center px-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-background fill-background" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Portal</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="mb-6">
          <h2 className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
            Menu
          </h2>
          <nav>
            {MAIN_MENU.map((item) => (
              <FlatNavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
            Management
          </h2>
          <nav>
            {MANAGEMENT.map((item) =>
              item.kind === "flat"
                ? <FlatNavItem key={item.name} item={item} />
                : <GroupNavItem key={item.name} item={item} />
            )}
          </nav>
        </div>
      </div>

      <div className="pb-1">
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
