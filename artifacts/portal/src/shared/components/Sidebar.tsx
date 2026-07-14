import { useState, useRef, useEffect } from "react";
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
  User,
  FileText,
  Layers,
  Box,
  ClipboardList,
  BarChart2,
  FileBarChart,
  Tag,
  UserCheck,
  Sparkles,
  RefreshCw,
  LayoutDashboard,
  ClipboardCheck,
  Wallet,
  LayoutList,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type SubItem  = { name: string; path: string; icon: React.ElementType };
type FlatItem = { kind: "flat";  name: string; icon: React.ElementType; path: string };
type GroupItem= { kind: "group"; name: string; icon: React.ElementType; children: SubItem[] };
type MenuItem = FlatItem | GroupItem;

const DASHBOARD_ITEM: FlatItem = { kind: "flat", name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" };

const MAIN_MENU: FlatItem[] = [
  { kind: "flat", name: "Transactions",     icon: ArrowLeftRight, path: "/transactions" },
  { kind: "flat", name: "Ledger",           icon: BookOpen,       path: "/ledger"       },
  { kind: "flat", name: "Finance Planning", icon: TrendingUp,     path: "/finance"      },
  { kind: "flat", name: "Team Management",  icon: Users,          path: "/team"         },
  { kind: "flat", name: "Ground Staff",     icon: Truck,          path: "/ground-staff" },
];

const MANAGEMENT: MenuItem[] = [
  { kind: "flat", name: "Gold Management",   icon: Gem,   path: "/gold"   },
  { kind: "flat", name: "Silver Management", icon: Medal, path: "/silver" },
  {
    kind: "group", name: "Karigar", icon: Hammer,
    children: [
      { name: "Karigar Section", path: "/karigar",         icon: User          },
      { name: "Karigar Reports", path: "/karigar/reports", icon: FileText      },
      { name: "Bulk Management", path: "/karigar/bulk",    icon: Layers        },
      { name: "Bulk Order",      path: "/karigar/orders",  icon: Box           },
    ],
  },
  {
    kind: "group", name: "Stock Management", icon: Package,
    children: [
      { name: "Stock Management",   path: "/stock",          icon: Package       },
      { name: "Stock Tally Report", path: "/stock/tally",    icon: ClipboardList },
      { name: "Summary",            path: "/stock/summary",  icon: BarChart2     },
      { name: "Material Report",    path: "/stock/material", icon: FileBarChart  },
    ],
  },
  {
    kind: "group", name: "Sales", icon: ShoppingCart,
    children: [
      { name: "Sales",   path: "/sales",         icon: Tag       },
      { name: "Clients", path: "/sales/clients", icon: UserCheck },
    ],
  },
  {
    kind: "group", name: "Purchase", icon: ShoppingBag,
    children: [
      { name: "Purchase", path: "/purchase",         icon: ShoppingBag },
      { name: "Vendors",  path: "/purchase/vendors", icon: Truck       },
    ],
  },
  {
    kind: "group", name: "Diamond Quality", icon: Diamond,
    children: [
      { name: "Quality Tracking", path: "/diamond/tracking", icon: Sparkles      },
      { name: "Diamond Orders",   path: "/diamond/orders",   icon: ClipboardList },
      { name: "Return Workflow",  path: "/diamond/returns",  icon: RefreshCw     },
    ],
  },
  {
    kind: "group", name: "Harvest Plans", icon: Wallet,
    children: [
      { name: "Harvest Management", path: "/harvest",        icon: LayoutList  },
      { name: "Group Management",   path: "/harvest/groups", icon: Users       },
    ],
  },
  { kind: "flat", name: "Approvals", icon: ClipboardCheck, path: "/approvals" },
  { kind: "flat", name: "Reports",   icon: BarChart2,      path: "/reports"   },
];

interface SidebarProps {
  isPinned: boolean;
  onPinnedChange: (pinned: boolean) => void;
}

interface FlyoutState {
  name: string;
  y: number;
}

export default function Sidebar({ isPinned, onPinnedChange }: SidebarProps) {
  const [location]  = useLocation();

  const isExpanded = isPinned;

  /* ── scroll preservation ── */
  const navScrollRef  = useRef<HTMLDivElement>(null);
  const savedScrollRef = useRef(0);

  useEffect(() => {
    /* Restore scroll position after every location change */
    const frame = requestAnimationFrame(() => {
      if (navScrollRef.current) {
        navScrollRef.current.scrollTop = savedScrollRef.current;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  /* ── auto-open groups on navigate ── */
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const init = new Set<string>();
    MANAGEMENT.forEach((item) => {
      if (item.kind === "group" && item.children.some((c) => location.startsWith(c.path))) {
        init.add(item.name);
      }
    });
    return init;
  });

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      MANAGEMENT.forEach((item) => {
        if (item.kind === "group" && item.children.some((c) => location.startsWith(c.path))) {
          next.add(item.name);
        }
      });
      return next;
    });
  }, [location]);

  function toggleGroup(name: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  /* ── collapsed flyout ── */
  const [flyout, setFlyout] = useState<FlyoutState | null>(null);
  const flyoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openFlyout(name: string, y: number) {
    if (flyoutTimerRef.current) clearTimeout(flyoutTimerRef.current);
    setFlyout({ name, y });
  }
  function scheduleFlyoutClose() {
    flyoutTimerRef.current = setTimeout(() => setFlyout(null), 120);
  }
  function cancelFlyoutClose() {
    if (flyoutTimerRef.current) clearTimeout(flyoutTimerRef.current);
  }

  /* ── shared label animation ── */
  const labelCls = cn(
    "text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
    isExpanded ? "opacity-100 max-w-[160px] ml-3" : "opacity-0 max-w-0 ml-0",
  );

  /* ── FlatNavItem ── */
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
            <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
          )}
        </div>
      </Link>
    );
  };

  /* ── GroupNavItem ── */
  const GroupNavItem = ({ item }: { item: GroupItem }) => {
    const isOpen    = openGroups.has(item.name);
    const hasActive = item.children.some((c) => location.startsWith(c.path));
    const Icon      = item.icon;

    return (
      <div className="mb-0.5">
        <button
          onClick={() => toggleGroup(item.name)}
          onMouseEnter={(e) => {
            if (!isExpanded) {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              openFlyout(item.name, rect.top + rect.height / 2);
            }
          }}
          onMouseLeave={() => {
            if (!isExpanded) scheduleFlyoutClose();
          }}
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

        {/* Inline submenu (expanded mode only) */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isPinned && isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="mt-0.5 ml-3 pl-4 border-l border-border space-y-0.5 pb-1">
            {item.children.map((child) => {
              const isChildActive = location.startsWith(child.path);
              const CIcon = child.icon;
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
                    <CIcon className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isChildActive ? "stroke-[2.5px]" : "opacity-60",
                    )} />
                    <span className="whitespace-nowrap">{child.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /* ── section label ── */
  const sectionLabelCls = cn(
    "text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-3",
    "whitespace-nowrap overflow-hidden transition-all duration-300",
    isExpanded ? "opacity-100 max-h-6 mb-2" : "opacity-0 max-h-0 mb-0",
  );

  /* ── flyout group (collapsed mode panel) ── */
  const flyoutGroup = flyout
    ? (MANAGEMENT.find(
        (m) => m.kind === "group" && m.name === flyout.name,
      ) as GroupItem | undefined)
    : undefined;

  return (
    <>
      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-50 flex flex-col",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded
            ? "w-[220px] bg-background"
            : "w-[56px]  bg-background",
          !isExpanded && "shadow-[4px_0_24px_rgba(0,0,0,0.07)]",
        )}
        onMouseLeave={() => {
          scheduleFlyoutClose();
        }}
      >
        {/* Logo + toggle */}
        <div className={cn(
          "h-16 flex items-center px-3 shrink-0",
          isExpanded ? "justify-between" : "justify-center",
        )}>
          {isExpanded ? (
            <>
              <div className="flex items-center gap-2 text-foreground min-w-0">
                <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center shrink-0">
                  <Hexagon className="h-5 w-5 text-background fill-background" />
                </div>
                <span className="font-semibold text-lg tracking-tight whitespace-nowrap overflow-hidden">
                  Portal
                </span>
              </div>
              <button
                onClick={() => onPinnedChange(false)}
                className={cn(
                  "shrink-0 h-6 w-6 flex items-center justify-center rounded-md ml-1",
                  "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                  "transition-all duration-200",
                )}
                title="Collapse sidebar"
              >
                <PanelLeftClose className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => onPinnedChange(true)}
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-lg",
                "bg-foreground text-background hover:opacity-80 transition-opacity",
              )}
              title="Pin sidebar open"
            >
              <Hexagon className="h-5 w-5 fill-background" />
            </button>
          )}
        </div>

        {/* Scrollable nav */}
        <div
          ref={navScrollRef}
          className="flex-1 overflow-y-auto no-scrollbar"
          onScroll={(e) => {
            savedScrollRef.current = (e.target as HTMLDivElement).scrollTop;
          }}
        >
          {/* Dashboard */}
          <div className="px-2 mb-3">
            <Link href={DASHBOARD_ITEM.path} className="block w-full">
              <div className={cn(
                "flex items-center px-3 py-2.5 rounded-xl transition-all duration-200",
                isExpanded ? "justify-start" : "justify-center",
                location.startsWith(DASHBOARD_ITEM.path)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}>
                <LayoutDashboard className={cn(
                  "h-4 w-4 shrink-0",
                  location.startsWith(DASHBOARD_ITEM.path) ? "stroke-[2.5px]" : "",
                )} />
                <span className={cn(
                  "text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300",
                  isExpanded ? "opacity-100 max-w-[160px] ml-3" : "opacity-0 max-w-0 ml-0",
                )}>
                  Dashboard
                </span>
              </div>
            </Link>
          </div>

          <div className="mb-4">
            <div className={sectionLabelCls}>Menu</div>
            <nav>
              {MAIN_MENU.map((item) => <FlatNavItem key={item.name} item={item} />)}
            </nav>
          </div>

          <div>
            <div className={sectionLabelCls}>Management</div>
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
        <div className="pb-1 shrink-0 border-t border-border pt-2">
          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg text-sidebar-foreground",
            "hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-0.5",
            isExpanded ? "justify-start" : "justify-center",
          )}>
            <LifeBuoy className="h-4 w-4 shrink-0" />
            <span className={labelCls}>Help Center</span>
          </div>
          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg text-sidebar-foreground",
            "hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-2",
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
      </aside>

      {/* Collapsed-mode flyout panel */}
      {!isExpanded && flyout && flyoutGroup && (
        <div
          className="fixed z-[200] bg-background border border-border rounded-xl shadow-lg py-2 min-w-[188px]"
          style={{ top: flyout.y, left: 72, transform: "translateY(-50%)" }}
          onMouseEnter={cancelFlyoutClose}
          onMouseLeave={scheduleFlyoutClose}
        >
          <div className="px-3 pb-2 mb-1 border-b border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {flyout.name}
            </p>
          </div>
          {flyoutGroup.children.map((child) => {
            const CIcon = child.icon;
            const isChildActive = location.startsWith(child.path);
            return (
              <Link key={child.path} href={child.path} className="block">
                <div
                  onClick={() => setFlyout(null)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 mx-1 rounded-md text-[13px] transition-colors cursor-pointer",
                    isChildActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <CIcon className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    isChildActive ? "stroke-[2.5px]" : "opacity-60",
                  )} />
                  <span className="whitespace-nowrap">{child.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
