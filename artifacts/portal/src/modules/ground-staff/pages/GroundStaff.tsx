import { useState, useMemo } from "react";
import { Truck, Search, Plus } from "lucide-react";
import { mockDispatches, type Dispatch, type DispatchStatus } from "../data/mockGroundStaff";
import DispatchRow from "../components/DispatchRow";
import DispatchModal from "../components/DispatchModal";

type StatCard = { label: string; status: DispatchStatus | "all"; color: string; iconColor: string };

const STAT_CARDS: StatCard[] = [
  { label: "All",        status: "all",        color: "bg-zinc-50 border-zinc-200",     iconColor: "text-zinc-500"   },
  { label: "Dispatched", status: "dispatched", color: "bg-amber-50 border-amber-200",   iconColor: "text-amber-600"  },
  { label: "Delivered",  status: "delivered",  color: "bg-green-50 border-green-200",   iconColor: "text-green-600"  },
  { label: "Returned",   status: "returned",   color: "bg-rose-50 border-rose-200",     iconColor: "text-rose-600"   },
];

let nextId = 100;

export default function GroundStaff() {
  const [dispatches, setDispatches] = useState<Dispatch[]>(mockDispatches);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Dispatch | null>(null);

  const counts = useMemo(() => ({
    all:        dispatches.length,
    dispatched: dispatches.filter((d) => d.status === "dispatched").length,
    delivered:  dispatches.filter((d) => d.status === "delivered").length,
    returned:   dispatches.filter((d) => d.status === "returned").length,
  }), [dispatches]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return dispatches;
    return dispatches.filter(
      (d) =>
        d.staffName.toLowerCase().includes(q) ||
        d.itemDescription.toLowerCase().includes(q) ||
        d.fromLocation.toLowerCase().includes(q) ||
        d.toLocation.toLowerCase().includes(q) ||
        d.recipientName.toLowerCase().includes(q),
    );
  }, [dispatches, search]);

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(d: Dispatch) {
    setEditing(d);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    setDispatches((prev) => prev.filter((d) => d.id !== id));
  }

  function handleSave(data: Omit<Dispatch, "id" | "createdAt" | "status"> & { status?: DispatchStatus }) {
    if (editing) {
      setDispatches((prev) =>
        prev.map((d) =>
          d.id === editing.id
            ? { ...d, ...data, status: data.status ?? d.status }
            : d,
        ),
      );
    } else {
      const newDispatch: Dispatch = {
        id: `d${++nextId}`,
        staffName: data.staffName,
        itemType: data.itemType,
        itemDescription: data.itemDescription,
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        recipientName: data.recipientName,
        notes: data.notes,
        status: "dispatched",
        createdAt: new Date().toISOString(),
      };
      setDispatches((prev) => [newDispatch, ...prev]);
    }
    setModalOpen(false);
    setEditing(null);
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* Page header */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
            Ground Staff Tracking
          </h1>
          <p className="text-sm text-muted-foreground">Track deliveries and dispatches</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          New Dispatch
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((card) => {
            const count = counts[card.status];
            return (
              <div
                key={card.status}
                className={`rounded-xl border p-5 flex items-center gap-4 bg-white ${card.color}`}
              >
                <div className={`h-10 w-10 rounded-lg bg-white border flex items-center justify-center shrink-0 shadow-sm ${card.color}`}>
                  <Truck className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground leading-none mb-1">{count}</div>
                  <div className="text-xs text-muted-foreground font-medium">{card.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by staff name, item, location or recipient…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition shadow-sm"
          />
        </div>

        {/* Dispatch list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No dispatches found{search ? " matching your search" : ""}.
            </div>
          ) : (
            filtered.map((d) => (
              <DispatchRow
                key={d.id}
                dispatch={d}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      <DispatchModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}
