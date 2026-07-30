import { useState } from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { GeneralMasterModal } from "../components/GeneralMasterModal";
import {
  mockJewelleryCategories,
  mockJewelleryTypes,
  mockGoldPurity,
  mockDiamondFilters,
  type GeneralMasterItem,
} from "../data/mockGeneralMasters";

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
        isActive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-muted text-muted-foreground border border-border"
      )}
    >
      {status}
    </span>
  );
}

type GeneralSubTab = "categories" | "types" | "purity" | "diamond";

const GENERAL_SUB_TABS: { id: GeneralSubTab; label: string }[] = [
  { id: "categories", label: "Jewellery Categories" },
  { id: "types",      label: "Jewellery Types"      },
  { id: "purity",     label: "Gold Purity"          },
  { id: "diamond",    label: "Diamond Filters"      },
];

interface GeneralSubTableProps {
  initialData: GeneralMasterItem[];
  entityLabel: string;
  headerBg?: string;
  iconBg?: string;
}

function GeneralSubTable({ initialData, entityLabel, headerBg, iconBg }: GeneralSubTableProps) {
  const [data, setData]       = useState<GeneralMasterItem[]>(initialData);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<GeneralMasterItem | null>(null);

  const cols: ColumnDef<GeneralMasterItem>[] = [
    { key: "code",        label: "Code",        render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.code || "—"}</span> },
    { key: "name",        label: "Name",        render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "description", label: "Description", render: (r) => <span className="text-muted-foreground text-xs">{r.description || "—"}</span> },
    { key: "status",      label: "Status",      render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<GeneralMasterItem, "id">) {
    if (editing) {
      setData((prev) => prev.map((g) => g.id === editing.id ? { ...form, id: editing.id } : g));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["name", "code"]}
        addLabel={`Add ${entityLabel}`}
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((g) => g.id !== id))}
      />
      <GeneralMasterModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
        entityLabel={entityLabel}
        headerBg={headerBg}
        iconBg={iconBg}
      />
    </>
  );
}

export default function GeneralPage() {
  const [sub, setSub] = useState<GeneralSubTab>("categories");

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-background border-b border-border px-6 py-5">
        {/* Sub-tabs */}
        <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
          {GENERAL_SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSub(t.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px shrink-0",
                sub === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {sub === "categories" && (
          <GeneralSubTable
            initialData={mockJewelleryCategories}
            entityLabel="Category"
            headerBg="bg-violet-50"
            iconBg="bg-violet-600"
          />
        )}
        {sub === "types" && (
          <GeneralSubTable
            initialData={mockJewelleryTypes}
            entityLabel="Jewellery Type"
            headerBg="bg-fuchsia-50"
            iconBg="bg-fuchsia-600"
          />
        )}
        {sub === "purity" && (
          <GeneralSubTable
            initialData={mockGoldPurity}
            entityLabel="Gold Purity"
            headerBg="bg-yellow-50"
            iconBg="bg-yellow-600"
          />
        )}
        {sub === "diamond" && (
          <GeneralSubTable
            initialData={mockDiamondFilters}
            entityLabel="Diamond Filter"
            headerBg="bg-cyan-50"
            iconBg="bg-cyan-600"
          />
        )}
      </div>
    </div>
  );
}
