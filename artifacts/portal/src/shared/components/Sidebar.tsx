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
  PanelLeftClose,
  PanelLeftOpen,
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
  { kind: "flat",  name: "Gold Management", icon: Gem, path: "/gold" },
  {
    kind: "group", name: "Silver", icon: Medal,
    children: [
      { name: "Silver Management", path: "/silver" },
    ],
  },
  {
    kind: "group", name: "Karigar", icon: Hammer,
    children: [
      { name: "Karigar Section", path: "/karigar/section" },
      { name: "Karigar Reports", path: "/karigar/reports" },
      { name: "Bulk Management", path: "/karigar/bulk"    },
      { name: "Bulk Order",      path: "/karigar/orders"  },
    ],
  },
  {
    kind: "group", name: "Stock Management", icon: Package,
    children: [
      { name: "Stock Management",   path: "/stock"          },
      { name: "Stock Tally Report", path: "/stock/tally"    },
      { name: "Summary",            path: "/stock/summary"  },
      { name: "Material Report",    path: "/stock/material" },
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
      { name: "Quality Tracking", path: "/diamond/tracking" },
      { name: "Diamond Orders",   path: "/diamond/orders"   },
      { name: "Return Workflow",  path: "/diamond/returns"  },
    ],
  },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isPinned, setIsPinned]   = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinned || isHovered;

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const init = new Set<string>();
    MANAGEMENT.forEach((item) => {
      if (item.kind === "group" && item.children.some((c) => location.startsWith(c.path))) {
        init.add(item.name);
      }
    });
    return init;
  });

  function toggleGroup(name: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  /* ── shared label animation ── */
  const labelCls = cn(
    "text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
    isExpanded ? "opacity-100 max-w-[160px] ml-3" : "opacity-0 max-w-0 ml-0",
  );

  /* ── Flat nav item ── */
  const FlatNavItem = ({ item }: { item: FlatItem }) => {
    const isActive = location.startsWith(item.path);
    const Icon = item.icon;
    return (
      <Link href={item.path} className="block w-full">
        <div
          data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "flex items-center px-3 py-2 rounded-lg transition-colors mb-0.5",
            isExpanded ? "justify-start" : "justify-center",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          )}
        >
          <Icon className={cn("h-4 w-4 shrink-0", isActive && "stroke-[2.5px]")} />
          <span className={labelCls}>{item.name}</span>
          {isExpanded && isActive && (
            <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
          )}
        </div>
      </Link>
    );
  };

  /* ── Collapsible group ── */
  const GroupNavItem = ({ item }: { item: GroupItem }) => {
    const isOpen      = openGroups.has(item.name);
    const hasActive   = item.children.some((c) => location.startsWith(c.path));
    const Icon        = item.icon;

    return (
      <div className="mb-0.5">
        <button
          onClick={() => isExpanded && toggleGroup(item.name)}
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-colors",
            isExpanded ? "justify-start" : "justify-center",
            hasActive
              ? "text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          )}
        >
          <Icon className={cn("h-4 w-4 shrink-0", hasActive && "stroke-[2.5px]")} />
          <span className={labelCls}>{item.name}</span>
          {isExpanded && (
            <ChevronRight
              className={cn(
                "h-3 w-3 text-muted-foreground ml-auto shrink-0 transition-transform duration-200",
                isOpen && "rotate-90",
              )}
            />
          )}
        </button>

        {/* Sub-items — only render when expanded */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded && isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
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
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      isChildActive ? "bg-foreground" : "bg-muted-foreground/40",
                    )} />
                    {child.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "bg-transparent h-full flex flex-col flex-shrink-0",
        "transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded ? "w-[220px]" : "w-[56px]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo + pin toggle */}
      <div className="h-16 flex items-center px-3 justify-between shrink-0">
        <div className="flex items-center gap-2 text-foreground min-w-0">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center shrink-0">
            <Hexagon className="h-5 w-5 text-background fill-background" />
          </div>
          <span className={cn(
            "font-semibold text-lg tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0",
          )}>
            Portal
          </span>
        </div>

        {/* Pin / unpin button */}
        <button
          onClick={() => setIsPinned((p) => !p)}
          className={cn(
            "shrink-0 h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-all duration-200",
            isExpanded ? "opacity-100 ml-1" : "opacity-0 pointer-events-none w-0 ml-0",
          )}
          title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
        >
          {isPinned
            ? <PanelLeftClose className="h-3.5 w-3.5" />
            : <PanelLeftOpen  className="h-3.5 w-3.5" />
          }
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-0">
        {/* Section label */}
        <div className="mb-4">
          <div className={cn(
            "text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3 whitespace-nowrap overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 max-h-6" : "opacity-0 max-h-0",
          )}>
            Menu
          </div>
          <nav>
            {MAIN_MENU.map((item) => <FlatNavItem key={item.name} item={item} />)}
          </nav>
        </div>

        <div>
          <div className={cn(
            "text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3 whitespace-nowrap overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 max-h-6" : "opacity-0 max-h-0",
          )}>
            Management
          </div>
          <nav>
            {MANAGEMENT.map((item) =>
              item.kind === "flat"
                ? <FlatNavItem  key={item.name} item={item} />
                : <GroupNavItem key={item.name} item={item} />
            )}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-1 shrink-0">
        <div className="border-t border-border mb-2 pt-2">
          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-0.5",
            isExpanded ? "justify-start" : "justify-center",
          )}>
            <LifeBuoy className="h-4 w-4 shrink-0" />
            <span className={labelCls}>Help Center</span>
          </div>
          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-2",
            isExpanded ? "justify-start" : "justify-center",
          )}>
            <Settings className="h-4 w-4 shrink-0" />
            <span className={labelCls}>Settings</span>
          </div>

          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer",
            isExpanded ? "justify-start" : "justify-center",
          )}>
            <Avatar className="h-7 w-7 bg-blue-100 text-blue-700 shrink-0">
              <AvatarFallback className="bg-transparent text-[10px] font-semibold">AU</AvatarFallback>
            </Avatar>
            <div className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              isExpanded ? "opacity-100 max-w-[120px] ml-3" : "opacity-0 max-w-0 ml-0",
            )}>
              <span className="text-sm font-medium text-foreground leading-none mb-1 whitespace-nowrap">Admin User</span>
              <span className="text-[11px] text-muted-foreground leading-none whitespace-nowrap">admin@portal.com</span>
            </div>
            {isExpanded && <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />}
          </div>
        </div>
      </div>
    </aside>
  );
}
