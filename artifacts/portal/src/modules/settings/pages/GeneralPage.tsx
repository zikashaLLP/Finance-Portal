import { useState } from "react";
import { cn } from "@/lib/utils";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { GeneralMasterModal } from "../components/GeneralMasterModal";
import { JewelleryTypeModal } from "../components/JewelleryTypeModal";
import { GoldPurityModal } from "../components/GoldPurityModal";
import { DiamondFilterModal } from "../components/DiamondFilterModal";
import { DiamondQualityModal } from "../components/DiamondQualityModal";
import {
  CategoryViewModal,
  JewelleryTypeViewModal,
  GoldPurityViewModal,
  DiamondFilterViewModal,
  DiamondQualityViewModal,
} from "../components/GeneralViewModals";
import {
  mockJewelleryCategories,
  mockJewelleryTypes,
  mockGoldPurity,
  mockDiamondFilters,
  mockDiamondQualities,
  type JewelleryCategory,
  type JewelleryTypeItem,
  type GoldPurityItem,
  type DiamondFilterItem,
  type DiamondQualityItem,
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

type GeneralSubTab = "categories" | "types" | "purity" | "diamond" | "quality";

const GENERAL_SUB_TABS: { id: GeneralSubTab; label: string }[] = [
  { id: "categories", label: "Jewellery Categories" },
  { id: "types",      label: "Jewellery Types"      },
  { id: "purity",     label: "Gold Purity"          },
  { id: "diamond",    label: "Diamond Filters"      },
  { id: "quality",    label: "Diamond Quality"      },
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
  const [viewing, setViewing] = useState<JewelleryTypeItem | null>(null);

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
        onView={(r) => setViewing(r)}
      />
      <JewelleryTypeModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
        categories={categories}
      />
      <JewelleryTypeViewModal
        open={viewing !== null}
        onClose={() => setViewing(null)}
        item={viewing}
        categoryName={viewing ? getCategoryName(viewing.category_id) : ""}
      />
    </>
  );
}

// ── Gold Purity sub-table ─────────────────────────────────────────────────────
function GoldPuritySubTable() {
  const [data, setData]       = useState<GoldPurityItem[]>(mockGoldPurity);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<GoldPurityItem | null>(null);
  const [viewing, setViewing] = useState<GoldPurityItem | null>(null);

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  const cols: ColumnDef<GoldPurityItem>[] = [
    { key: "karat", label: "Karat", render: (r) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
        {r.karat}
      </span>
    )},
    { key: "purity", label: "Purity", render: (r) => (
      <span className="font-semibold text-foreground">{r.purity.toFixed(1)}%</span>
    )},
    { key: "rate_per_gram", label: "Rate / gram", render: (r) => (
      <span className="font-medium text-emerald-700">₹{r.rate_per_gram.toLocaleString("en-IN")}</span>
    )},
    { key: "description", label: "Description", render: (r) => (
      <span className="text-muted-foreground text-xs">{r.description || "—"}</span>
    )},
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "updated_at", label: "Updated", render: (r) => (
      <span className="text-muted-foreground text-xs">{fmt(r.updated_at)}</span>
    )},
  ];

  function handleSave(form: Omit<GoldPurityItem, "id" | "created_at" | "updated_at">) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) => prev.map((g) =>
        g.id === editing.id ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now } : g
      ));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID(), created_at: now, updated_at: now }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["karat"]}
        addLabel="Add Purity"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((g) => g.id !== id))}
        onView={(r) => setViewing(r)}
      />
      <GoldPurityModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
      />
      <GoldPurityViewModal open={viewing !== null} onClose={() => setViewing(null)} item={viewing} />
    </>
  );
}

// ── Diamond Filters sub-table ─────────────────────────────────────────────────
const FILTER_TYPE_COLORS: Record<string, string> = {
  Shape:   "bg-cyan-50 text-cyan-700 border-cyan-200",
  Color:   "bg-violet-50 text-violet-700 border-violet-200",
  Clarity: "bg-blue-50 text-blue-700 border-blue-200",
  Cut:     "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
};

function DiamondFilterSubTable() {
  const [data, setData]       = useState<DiamondFilterItem[]>(mockDiamondFilters);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<DiamondFilterItem | null>(null);
  const [viewing, setViewing] = useState<DiamondFilterItem | null>(null);

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  const cols: ColumnDef<DiamondFilterItem>[] = [
    { key: "filter_type", label: "Filter Type", render: (r) => {
      const cls = FILTER_TYPE_COLORS[r.filter_type] ?? "bg-muted text-muted-foreground border-border";
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${cls}`}>
          {r.filter_type}
        </span>
      );
    }},
    { key: "filter_name",  label: "Filter Name",  render: (r) => <span className="font-medium text-foreground">{r.filter_name}</span> },
    { key: "filter_value", label: "Filter Value", render: (r) => (
      <span className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{r.filter_value || "—"}</span>
    )},
    { key: "updated_at", label: "Updated", render: (r) => (
      <span className="text-muted-foreground text-xs">{fmt(r.updated_at)}</span>
    )},
  ];

  function handleSave(form: Omit<DiamondFilterItem, "id" | "created_at" | "updated_at">) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) => prev.map((d) =>
        d.id === editing.id ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now } : d
      ));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID(), created_at: now, updated_at: now }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["filter_name", "filter_value", "filter_type"]}
        addLabel="Add Filter"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((d) => d.id !== id))}
        onView={(r) => setViewing(r)}
      />
      <DiamondFilterModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
      />
      <DiamondFilterViewModal open={viewing !== null} onClose={() => setViewing(null)} item={viewing} />
    </>
  );
}

// ── Diamond Quality sub-table ─────────────────────────────────────────────────
const QUALITY_TYPE_COLORS: Record<string, string> = {
  Parcel:    "bg-amber-50 text-amber-700 border-amber-200",
  Solitaire: "bg-violet-50 text-violet-700 border-violet-200",
};

function DiamondQualitySubTable() {
  const [data, setData]       = useState<DiamondQualityItem[]>(mockDiamondQualities);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<DiamondQualityItem | null>(null);
  const [viewing, setViewing] = useState<DiamondQualityItem | null>(null);

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  const cols: ColumnDef<DiamondQualityItem>[] = [
    { key: "quality_name", label: "Quality",     render: (r) => (
      <span className="font-semibold font-mono text-sm text-foreground">{r.quality_name}</span>
    )},
    { key: "type",         label: "Type",        render: (r) => {
      const cls = QUALITY_TYPE_COLORS[r.type] ?? "bg-muted text-muted-foreground border-border";
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${cls}`}>
          {r.type}
        </span>
      );
    }},
    { key: "description",  label: "Description", render: (r) => (
      <span className="text-muted-foreground text-xs">{r.description || "—"}</span>
    )},
    { key: "status",       label: "Status",      render: (r) => <StatusBadge status={r.status} /> },
    { key: "updated_at",   label: "Updated",     render: (r) => (
      <span className="text-muted-foreground text-xs">{fmt(r.updated_at)}</span>
    )},
  ];

  function handleSave(form: Omit<DiamondQualityItem, "id" | "created_at" | "updated_at">) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) => prev.map((d) =>
        d.id === editing.id ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now } : d
      ));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID(), created_at: now, updated_at: now }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["quality_name", "type", "description"]}
        addLabel="Add Quality"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((d) => d.id !== id))}
        onView={(r) => setViewing(r)}
      />
      <DiamondQualityModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
      />
      <DiamondQualityViewModal open={viewing !== null} onClose={() => setViewing(null)} item={viewing} />
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
        {sub === "purity" && <GoldPuritySubTable />}
        {sub === "diamond"  && <DiamondFilterSubTable />}
        {sub === "quality"  && <DiamondQualitySubTable />}
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
  const [viewing, setViewing] = useState<JewelleryCategory | null>(null);

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
        onView={(r) => setViewing(r)}
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
      <CategoryViewModal open={viewing !== null} onClose={() => setViewing(null)} item={viewing} />
    </>
  );
}
