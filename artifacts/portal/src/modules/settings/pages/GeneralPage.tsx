import { useState } from "react";
import { cn } from "@/lib/utils";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { GeneralMasterModal } from "../components/GeneralMasterModal";
import { JewelleryTypeModal } from "../components/JewelleryTypeModal";
import {
  mockJewelleryCategories,
  mockJewelleryTypes,
  mockGoldPurity,
  mockDiamondFilters,
  type JewelleryCategory,
  type JewelleryTypeItem,
  type GeneralMasterItem,
} from "../data/mockGeneralMasters";

// ── Shared helpers ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
      isActive
        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
        : "bg-muted text-muted-foreground border border-border",
    )}>
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

// ── Generic sub-table (purity / diamond / categories) ─────────────────────────
interface GeneralSubTableProps {
  initialData: GeneralMasterItem[] | JewelleryCategory[];
  entityLabel: string;
  headerBg?: string;
  iconBg?: string;
}

function GeneralSubTable({ initialData, entityLabel, headerBg, iconBg }: GeneralSubTableProps) {
  const [data, setData]       = useState<GeneralMasterItem[]>(initialData as GeneralMasterItem[]);
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

// ── Jewellery Types sub-table (with category column + selector) ───────────────
interface JewelleryTypesTableProps {
  categories: JewelleryCategory[];
}

function JewelleryTypesTable({ categories }: JewelleryTypesTableProps) {
  const [data, setData]       = useState<JewelleryTypeItem[]>(mockJewelleryTypes);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<JewelleryTypeItem | null>(null);

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? "—";

  const cols: ColumnDef<JewelleryTypeItem>[] = [
    { key: "code",        label: "Code",        render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.code || "—"}</span> },
    { key: "name",        label: "Type Name",   render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "category_id", label: "Category",    render: (r) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-violet-50 text-violet-700 border border-violet-200">
        {getCategoryName(r.category_id)}
      </span>
    )},
    { key: "description", label: "Description", render: (r) => <span className="text-muted-foreground text-xs">{r.description || "—"}</span> },
    { key: "status",      label: "Status",      render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<JewelleryTypeItem, "id">) {
    if (editing) {
      setData((prev) => prev.map((t) => t.id === editing.id ? { ...form, id: editing.id } : t));
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
        addLabel="Add Type"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((t) => t.id !== id))}
      />
      <JewelleryTypeModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
        categories={categories}
      />
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GeneralPage() {
  const [sub, setSub] = useState<GeneralSubTab>("categories");

  // Lift categories so JewelleryTypesTable can reflect live additions
  const [categories, setCategories] = useState<JewelleryCategory[]>(mockJewelleryCategories);

  return (
    <div className="w-full">
      {/* Sub-tabs */}
      <div className="bg-white border-b border-border px-6 py-5">
        <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
          {GENERAL_SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSub(t.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px shrink-0",
                sub === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {sub === "categories" && (
          // Uses a local adapter so category additions bubble up to page state
          <CategoriesSubTable
            categories={categories}
            setCategories={setCategories}
          />
        )}
        {sub === "types" && (
          <JewelleryTypesTable categories={categories} />
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

// ── Categories sub-table (lifts state to page) ────────────────────────────────
interface CategoriesSubTableProps {
  categories: JewelleryCategory[];
  setCategories: React.Dispatch<React.SetStateAction<JewelleryCategory[]>>;
}

function CategoriesSubTable({ categories, setCategories }: CategoriesSubTableProps) {
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<JewelleryCategory | null>(null);

  const cols: ColumnDef<JewelleryCategory>[] = [
    { key: "code",        label: "Code",        render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.code || "—"}</span> },
    { key: "name",        label: "Name",        render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "description", label: "Description", render: (r) => <span className="text-muted-foreground text-xs">{r.description || "—"}</span> },
    { key: "status",      label: "Status",      render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<GeneralMasterItem, "id">) {
    if (editing) {
      setCategories((prev) => prev.map((c) => c.id === editing.id ? { ...form, id: editing.id } : c));
    } else {
      setCategories((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <SettingsTable
        data={categories}
        columns={cols}
        searchKeys={["name", "code"]}
        addLabel="Add Category"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setCategories((prev) => prev.filter((c) => c.id !== id))}
      />
      <GeneralMasterModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing ? { ...editing } : null}
        entityLabel="Category"
        headerBg="bg-violet-50"
        iconBg="bg-violet-600"
      />
    </>
  );
}
