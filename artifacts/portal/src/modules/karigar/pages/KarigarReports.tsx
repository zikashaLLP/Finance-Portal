import { useState, useMemo } from "react";
import {
  Package, CheckCircle2, Clock, IndianRupee, TrendingUp,
  Download, Eye, SlidersHorizontal,
} from "lucide-react";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import Pagination from "@/shared/components/Pagination";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockKarigars } from "../data/mockKarigar";

/* ═══════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════ */
type ReportStatus = "received" | "pending";

interface ReportRow {
  id: string; orderNumber: string; karigar: string; client: string;
  itemType: string; goldWeight: number; labourQuoted: number;
  totalBudget: number; status: ReportStatus; orderDate: string;
}
const REPORT_DATA: ReportRow[] = [
  { id:"r1",  orderNumber:"1525", karigar:"DILIP BHAI SURAT",     client:"Divya Reddy company",    itemType:"necklace_set",  goldWeight:16.000, labourQuoted:750,  totalBudget:200000, status:"received", orderDate:"14/07/2026" },
  { id:"r2",  orderNumber:"1524", karigar:"DILIP BHAI SURAT",     client:"SJ STOCK (KARIGAR ITM)", itemType:"nath",          goldWeight:0.250,  labourQuoted:500,  totalBudget:1,      status:"received", orderDate:"14/07/2026" },
  { id:"r3",  orderNumber:"1523", karigar:"DILIP BHAI SURAT",     client:"SJ STOCK (KARIGAR ITM)", itemType:"nath",          goldWeight:0.250,  labourQuoted:500,  totalBudget:1,      status:"received", orderDate:"14/07/2026" },
  { id:"r4",  orderNumber:"1522", karigar:"DILIP BHAI SURAT",     client:"SJ STOCK (KARIGAR ITM)", itemType:"nath",          goldWeight:0.248,  labourQuoted:500,  totalBudget:1,      status:"received", orderDate:"14/07/2026" },
  { id:"r5",  orderNumber:"1521", karigar:"DILIP BHAI SURAT",     client:"SJ STOCK (KARIGAR ITM)", itemType:"nath",          goldWeight:0.250,  labourQuoted:1000, totalBudget:1,      status:"received", orderDate:"14/07/2026" },
  { id:"r6",  orderNumber:"1520", karigar:"HIRANMAY DADA",        client:"Mahak Mam",              itemType:"pendant_set",   goldWeight:3.500,  labourQuoted:1000, totalBudget:1,      status:"received", orderDate:"11/07/2026" },
  { id:"r7",  orderNumber:"1519", karigar:"HIRANMAY DADA",        client:"TANMAY SIR",             itemType:"nath",          goldWeight:1.000,  labourQuoted:650,  totalBudget:1,      status:"pending",  orderDate:"11/07/2026" },
  { id:"r8",  orderNumber:"1518", karigar:"HIRANMAY DADA",        client:"TANMAY SIR",             itemType:"earrings",      goldWeight:3.500,  labourQuoted:1200, totalBudget:1,      status:"received", orderDate:"11/07/2026" },
  { id:"r9",  orderNumber:"1517", karigar:"DILIP BHAI SURAT",     client:"DARSHANA DIDI",          itemType:"bracelet",      goldWeight:7.001,  labourQuoted:750,  totalBudget:200000, status:"received", orderDate:"11/07/2026" },
  { id:"r10", orderNumber:"1516", karigar:"HIRANMAY DADA",        client:"SUSHMA GUPTA",           itemType:"nath",          goldWeight:1.000,  labourQuoted:1000, totalBudget:1,      status:"received", orderDate:"07/07/2026" },
  { id:"r11", orderNumber:"1514", karigar:"HIRANMAY DADA",        client:"MADHAVI DIDI",           itemType:"tanmaniya",     goldWeight:1.000,  labourQuoted:1000, totalBudget:1,      status:"pending",  orderDate:"07/07/2026" },
  { id:"r12", orderNumber:"1513", karigar:"HIRANMAY DADA",        client:"SUSHMA GUPTA",           itemType:"chain_pendant", goldWeight:4.998,  labourQuoted:1000, totalBudget:1,      status:"pending",  orderDate:"07/07/2026" },
  { id:"r13", orderNumber:"1512", karigar:"HIRANMAY DADA",        client:"SUSHMA GUPTA",           itemType:"chain_pendant", goldWeight:2.000,  labourQuoted:1000, totalBudget:1,      status:"pending",  orderDate:"07/07/2026" },
  { id:"r14", orderNumber:"1511", karigar:"HIRANMAY DADA",        client:"VAIBHAV BHAI",           itemType:"ring",          goldWeight:7.500,  labourQuoted:1000, totalBudget:1,      status:"pending",  orderDate:"07/07/2026" },
  { id:"r15", orderNumber:"1510", karigar:"NITIN KARIGAR UNIQUE", client:"Custom Client",          itemType:"earrings",      goldWeight:5.800,  labourQuoted:950,  totalBudget:63000,  status:"received", orderDate:"04/07/2026" },
  { id:"r16", orderNumber:"1509", karigar:"AMRESH DADA",          client:"Meena Shah",             itemType:"ring",          goldWeight:2.100,  labourQuoted:1200, totalBudget:45000,  status:"received", orderDate:"02/07/2026" },
];

interface MaterialRow {
  id: string; karigar: string; materialType: string; transactionType: "issue" | "receive";
  weight: number; weightUnit: "ct" | "g"; purityQuality: string; date: string; comment: string;
}
const MATERIALS_DATA: MaterialRow[] = [
  { id:"m1",  karigar:"DILIP BHAI SURAT", materialType:"Loose_diamond", transactionType:"issue", weight:3.170, weightUnit:"ct", purityQuality:"CVD", date:"14/07/2026", comment:"cvd 492 pc dtc and sunny" },
  { id:"m2",  karigar:"DILIP BHAI SURAT", materialType:"Loose_diamond", transactionType:"issue", weight:0.020, weightUnit:"ct", purityQuality:"2D",  date:"14/07/2026", comment:"sj stock" },
  { id:"m3",  karigar:"DILIP BHAI SURAT", materialType:"Loose_diamond", transactionType:"issue", weight:0.050, weightUnit:"ct", purityQuality:"2D",  date:"14/07/2026", comment:"sj stock" },
  { id:"m4",  karigar:"DILIP BHAI SURAT", materialType:"Loose_diamond", transactionType:"issue", weight:0.080, weightUnit:"ct", purityQuality:"2D",  date:"14/07/2026", comment:"sj stock" },
  { id:"m5",  karigar:"DILIP BHAI SURAT", materialType:"Loose_diamond", transactionType:"issue", weight:0.130, weightUnit:"ct", purityQuality:"1D",  date:"14/07/2026", comment:"1 pc sj stock" },
  { id:"m6",  karigar:"HIRANMAY DADA",    materialType:"Loose_diamond", transactionType:"issue", weight:4.000, weightUnit:"ct", purityQuality:"CVD", date:"14/07/2026", comment:"Anjali diamond se liaa hai" },
  { id:"m7",  karigar:"HIRANMAY DADA",    materialType:"Loose_diamond", transactionType:"issue", weight:0.100, weightUnit:"ct", purityQuality:"CVD", date:"11/07/2026", comment:"sunny se liaa hai" },
  { id:"m8",  karigar:"HIRANMAY DADA",    materialType:"Loose_diamond", transactionType:"issue", weight:0.120, weightUnit:"ct", purityQuality:"2D",  date:"11/07/2026", comment:"sj stock 5 pc" },
  { id:"m9",  karigar:"DILIP BHAI SURAT", materialType:"Loose_diamond", transactionType:"issue", weight:0.250, weightUnit:"ct", purityQuality:"CVD", date:"11/07/2026", comment:"anjali diamond" },
  { id:"m10", karigar:"HIRANMAY DADA",    materialType:"Loose_diamond", transactionType:"issue", weight:0.060, weightUnit:"ct", purityQuality:"2D",  date:"07/07/2026", comment:"sj stock" },
  { id:"m11", karigar:"AMRESH DADA",      materialType:"Loose_diamond", transactionType:"issue", weight:1.200, weightUnit:"ct", purityQuality:"Natural", date:"04/07/2026", comment:"natural diamond lot" },
  { id:"m12", karigar:"NITIN KARIGAR UNIQUE", materialType:"Loose_diamond", transactionType:"receive", weight:0.900, weightUnit:"ct", purityQuality:"CVD", date:"02/07/2026", comment:"job done" },
];

interface ReceiptRow {
  id: string; karigar: string; jewelleryType: string; grossWeight: number;
  netWeight: number; labourCharges: number; receiptDate: string;
}
const RECEIPTS_DATA: ReceiptRow[] = [
  { id:"rc1", karigar:"DILIP BHAI SURAT", jewelleryType:"Diamond Jewellery", grossWeight:15.940, netWeight:15.940, labourCharges:11479.5, receiptDate:"14/07/2026" },
  { id:"rc2", karigar:"DILIP BHAI SURAT", jewelleryType:"Diamond Jewellery", grossWeight:0.290,  netWeight:0.290,  labourCharges:264,     receiptDate:"14/07/2026" },
  { id:"rc3", karigar:"DILIP BHAI SURAT", jewelleryType:"Diamond Jewellery", grossWeight:0.230,  netWeight:0.230,  labourCharges:107,     receiptDate:"14/07/2026" },
  { id:"rc4", karigar:"DILIP BHAI SURAT", jewelleryType:"Diamond Jewellery", grossWeight:0.230,  netWeight:0.230,  labourCharges:220,     receiptDate:"14/07/2026" },
  { id:"rc5", karigar:"DILIP BHAI SURAT", jewelleryType:"Diamond Jewellery", grossWeight:0.220,  netWeight:0.220,  labourCharges:107,     receiptDate:"14/07/2026" },
  { id:"rc6", karigar:"HIRANMAY DADA",    jewelleryType:"Diamond Jewellery", grossWeight:4.220,  netWeight:4.220,  labourCharges:3420,    receiptDate:"14/07/2026" },
  { id:"rc7", karigar:"HIRANMAY DADA",    jewelleryType:"Diamond Jewellery", grossWeight:3.240,  netWeight:3.240,  labourCharges:3220,    receiptDate:"11/07/2026" },
  { id:"rc8", karigar:"HIRANMAY DADA",    jewelleryType:"Diamond Jewellery", grossWeight:0.880,  netWeight:0.880,  labourCharges:1284,    receiptDate:"11/07/2026" },
  { id:"rc9", karigar:"AMRESH DADA",      jewelleryType:"Gold Jewellery",    grossWeight:8.400,  netWeight:8.200,  labourCharges:9800,    receiptDate:"04/07/2026" },
  { id:"rc10",karigar:"NITIN KARIGAR UNIQUE", jewelleryType:"Gold Jewellery", grossWeight:6.100, netWeight:5.900,  labourCharges:11200,   receiptDate:"02/07/2026" },
];

interface PaymentRow {
  id: string; karigar: string; amount: number; paymentMode: string;
  description: string; date: string;
}
const PAYMENTS_DATA: PaymentRow[] = [
  { id:"p1",  karigar:"",               amount:300,   paymentMode:"Cash", description:"SANDWICH",              date:"14/07/2026" },
  { id:"p2",  karigar:"",               amount:3000,  paymentMode:"Cash", description:"DONATION TO JIMIT BHAI",date:"14/07/2026" },
  { id:"p3",  karigar:"",               amount:300,   paymentMode:"Cash", description:"VIKAS",                 date:"14/07/2026" },
  { id:"p4",  karigar:"",               amount:400,   paymentMode:"Cash", description:"ANISH DISHIT SIR & AUTO",date:"14/07/2026" },
  { id:"p5",  karigar:"",               amount:200,   paymentMode:"Cash", description:"VIKAS VARIYALI",        date:"14/07/2026" },
  { id:"p6",  karigar:"",               amount:100,   paymentMode:"Cash", description:"DEVA FOR AUTO",         date:"14/07/2026" },
  { id:"p7",  karigar:"",               amount:3000,  paymentMode:"Cash", description:"INDER MOTIWALA",        date:"14/07/2026" },
  { id:"p8",  karigar:"",               amount:100,   paymentMode:"Cash", description:"INDER",                 date:"14/07/2026" },
  { id:"p9",  karigar:"HIRANMAY DADA",  amount:5000,  paymentMode:"UPI",  description:"Advance for order 1519",date:"11/07/2026" },
  { id:"p10", karigar:"DILIP BHAI SURAT", amount:8000, paymentMode:"UPI", description:"Advance for order 1517",date:"11/07/2026" },
  { id:"p11", karigar:"AMRESH DADA",    amount:10000, paymentMode:"NEFT", description:"Partial payment",       date:"04/07/2026" },
];

const MONTHS       = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS        = ["2024","2025","2026"];
const REPORT_TYPES = ["Monthly","Quarterly","Annual","Custom"];

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n);
const fmtW = (n: number, unit = "g") => `${n.toFixed(3)}${unit}`;

type SubTab = "orders" | "materials" | "receipts" | "payments" | "summary";
const SUB_TABS: { key: SubTab; label: string }[] = [
  { key:"orders",    label:"Orders"    },
  { key:"materials", label:"Materials" },
  { key:"receipts",  label:"Receipts"  },
  { key:"payments",  label:"Payments"  },
  { key:"summary",   label:"Summary"   },
];

/* ═══════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════ */
function TableCard({ title, headers, children, footer }: {
  title: string; headers: string[]; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {headers.map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {footer}
    </div>
  );
}

function KarigarAvatar({ name }: { name: string }) {
  if (!name) return <span className="text-xs text-muted-foreground/40">—</span>;
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
        {name.charAt(0)}
      </div>
      <span className="text-xs font-medium text-foreground leading-tight">{name}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   TAB: ORDERS
═══════════════════════════════════════════════ */
function OrdersTable({ rows }: { rows: ReportRow[] }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const total = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const slice = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <TableCard title="Order Details"
      headers={["Order #","Karigar","Client","Item Type","Gold (g)","Labour Quoted","Total Budget","Status","Order Date","Actions"]}
      footer={<Pagination page={page} totalPages={total} onPageChange={setPage} totalItems={rows.length} pageSize={PAGE_SIZE} itemLabel="orders" />}>
      {slice.map((r, i) => (
        <tr key={r.id} className={cn(
          "border-b border-border last:border-0 hover:bg-muted/20 transition-colors group",
          i % 2 !== 0 && "bg-muted/[0.04]",
        )}>
          <td className="px-5 py-3.5">
            <span className="font-mono text-xs font-semibold text-foreground">{r.orderNumber}</span>
          </td>
          <td className="px-5 py-3.5"><KarigarAvatar name={r.karigar} /></td>
          <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[120px]">
            <span className="line-clamp-2 leading-tight">{r.client}</span>
          </td>
          <td className="px-5 py-3.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
              {r.itemType}
            </span>
          </td>
          <td className="px-5 py-3.5 tabular-nums text-xs text-muted-foreground">{fmtW(r.goldWeight)}</td>
          <td className="px-5 py-3.5 tabular-nums text-xs font-medium text-foreground">{fmtAmt(r.labourQuoted)}</td>
          <td className="px-5 py-3.5 tabular-nums text-xs font-semibold text-foreground">{fmtAmt(r.totalBudget)}</td>
          <td className="px-5 py-3.5">
            {r.status === "received" ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /> received
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /> pending
              </span>
            )}
          </td>
          <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.orderDate}</td>
          <td className="px-5 py-3.5">
            <button className="h-7 w-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors opacity-0 group-hover:opacity-100">
              <Eye className="h-3.5 w-3.5" />
            </button>
          </td>
        </tr>
      ))}
    </TableCard>
  );
}

/* ═══════════════════════════════════════════════
   TAB: MATERIALS
═══════════════════════════════════════════════ */
function MaterialsTab({ karigarFilter }: { karigarFilter: string }) {
  const rows = karigarFilter === "all"
    ? MATERIALS_DATA
    : MATERIALS_DATA.filter((r) => r.karigar === karigarFilter);

  return (
    <TableCard title="Material Transactions"
      headers={["Karigar","Material Type","Transaction Type","Weight","Purity / Quality","Date","Comment"]}>
      {rows.map((r, i) => (
        <tr key={r.id} className={cn(
          "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
          i % 2 !== 0 && "bg-muted/[0.04]",
        )}>
          <td className="px-5 py-3.5"><KarigarAvatar name={r.karigar} /></td>
          <td className="px-5 py-3.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
              {r.materialType}
            </span>
          </td>
          <td className="px-5 py-3.5">
            {r.transactionType === "issue" ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-500 text-white uppercase tracking-wide">
                issue
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500 text-white uppercase tracking-wide">
                receive
              </span>
            )}
          </td>
          <td className="px-5 py-3.5 tabular-nums text-xs font-semibold text-foreground">
            {r.weight.toFixed(3)}{r.weightUnit}
          </td>
          <td className="px-5 py-3.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/60 text-[11px] font-medium text-muted-foreground border border-border">
              {r.purityQuality}
            </span>
          </td>
          <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
          <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[200px]">
            <span className="line-clamp-1">{r.comment}</span>
          </td>
        </tr>
      ))}
      {rows.length === 0 && (
        <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">No material transactions found.</td></tr>
      )}
    </TableCard>
  );
}

/* ═══════════════════════════════════════════════
   TAB: RECEIPTS
═══════════════════════════════════════════════ */
function ReceiptsTab({ karigarFilter }: { karigarFilter: string }) {
  const rows = karigarFilter === "all"
    ? RECEIPTS_DATA
    : RECEIPTS_DATA.filter((r) => r.karigar === karigarFilter);

  return (
    <TableCard title="Completed Jewelry Receipts"
      headers={["Karigar","Jewelry Type","Gross Weight","Net Weight","Labour Charges","Receipt Date"]}>
      {rows.map((r, i) => (
        <tr key={r.id} className={cn(
          "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
          i % 2 !== 0 && "bg-muted/[0.04]",
        )}>
          <td className="px-5 py-3.5"><KarigarAvatar name={r.karigar} /></td>
          <td className="px-5 py-3.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
              {r.jewelleryType}
            </span>
          </td>
          <td className="px-5 py-3.5 tabular-nums text-xs font-semibold text-foreground">{fmtW(r.grossWeight)}</td>
          <td className="px-5 py-3.5 tabular-nums text-xs text-muted-foreground">{fmtW(r.netWeight)}</td>
          <td className="px-5 py-3.5 tabular-nums text-xs font-semibold text-foreground">{fmtAmt(r.labourCharges)}</td>
          <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.receiptDate}</td>
        </tr>
      ))}
      {rows.length === 0 && (
        <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">No receipts found.</td></tr>
      )}
    </TableCard>
  );
}

/* ═══════════════════════════════════════════════
   TAB: PAYMENTS
═══════════════════════════════════════════════ */
function PaymentsTab({ karigarFilter }: { karigarFilter: string }) {
  const rows = karigarFilter === "all"
    ? PAYMENTS_DATA
    : PAYMENTS_DATA.filter((r) => r.karigar === karigarFilter || r.karigar === "");

  const total = rows.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-4">
      <TableCard title="Payment Transactions"
        headers={["Karigar","Amount","Payment Mode","Description","Date"]}
        footer={
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-border bg-muted/20">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Payments</span>
            <span className="text-sm font-bold text-foreground tabular-nums">{fmtAmt(total)}</span>
          </div>
        }>
        {rows.map((r, i) => (
          <tr key={r.id} className={cn(
            "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            i % 2 !== 0 && "bg-muted/[0.04]",
          )}>
            <td className="px-5 py-3.5"><KarigarAvatar name={r.karigar} /></td>
            <td className="px-5 py-3.5 tabular-nums text-sm font-bold text-foreground">{fmtAmt(r.amount)}</td>
            <td className="px-5 py-3.5">
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border",
                r.paymentMode === "Cash"
                  ? "bg-muted text-foreground border-border"
                  : r.paymentMode === "UPI"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-purple-50 text-purple-700 border-purple-200",
              )}>
                {r.paymentMode}
              </span>
            </td>
            <td className="px-5 py-3.5 text-xs font-medium text-foreground uppercase tracking-wide">{r.description}</td>
            <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">No payment transactions found.</td></tr>
        )}
      </TableCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TAB: SUMMARY
═══════════════════════════════════════════════ */
function SummaryTab({ filtered, completed, pending, completionRate }: {
  filtered: ReportRow[]; completed: number; pending: number; completionRate: number;
}) {
  const totalBudget       = filtered.reduce((s, r) => s + r.totalBudget, 0);
  const totalLabourQuoted = filtered.reduce((s, r) => s + r.labourQuoted, 0);
  const totalPayments     = PAYMENTS_DATA.reduce((s, r) => s + r.amount, 0);
  const totalReceiptValue = RECEIPTS_DATA.reduce((s, r) => s + r.labourCharges, 0);
  const totalGoldIssued   = filtered.reduce((s, r) => s + r.goldWeight, 0);
  const totalDiamondIssued = MATERIALS_DATA.filter((m) => m.transactionType === "issue")
    .reduce((s, m) => s + (m.weightUnit === "ct" ? m.weight : 0), 0);

  const SummaryRow = ({ label, value, accent }: { label: string; value: string; accent?: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-semibold tabular-nums", accent ?? "text-foreground")}>{value}</span>
    </div>
  );

  const PerfStat = ({ value, label, accent }: { value: string; label: string; accent?: string }) => (
    <div className="text-center px-4">
      <p className={cn("text-3xl font-bold tabular-nums mb-1", accent ?? "text-foreground")}>{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Two summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Material Summary */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Material Summary</h3>
          <SummaryRow label="Total Gold Issued:"    value={`${totalGoldIssued.toFixed(3)}g`}   accent="text-amber-600" />
          <SummaryRow label="Total Diamond Issued:" value={`${totalDiamondIssued.toFixed(3)}ct`} accent="text-amber-600" />
        </div>

        {/* Financial Summary */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Financial Summary</h3>
          <SummaryRow label="Total Budget:"        value={fmtAmt(totalBudget)}       accent="text-emerald-600" />
          <SummaryRow label="Total Labour Quoted:" value={fmtAmt(totalLabourQuoted)} accent="text-emerald-600" />
          <SummaryRow label="Total Payments:"      value={fmtAmt(totalPayments)}     accent="text-red-500" />
          <SummaryRow label="Total Receipt Value:" value={fmtAmt(totalReceiptValue)} accent="text-emerald-600" />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
        <h3 className="text-base font-bold text-foreground mb-8">Performance Metrics</h3>
        <div className="flex items-center justify-around divide-x divide-border">
          <PerfStat value={String(filtered.length)} label="Total Orders" />
          <PerfStat value={String(completed)}        label="Completed"    accent="text-emerald-600" />
          <PerfStat value={String(pending)}          label="Pending"      accent="text-amber-600"   />
          <PerfStat value={`${completionRate.toFixed(1)}%`} label="Completion Rate" accent="text-blue-600" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function KarigarReports() {
  const [karigarFilter, setKarigarFilter] = useState("all");
  const [reportType, setReportType]       = useState("Monthly");
  const [month, setMonth]                 = useState("July");
  const [year, setYear]                   = useState("2026");
  const [subTab, setSubTab]               = useState<SubTab>("orders");

  const filtered = useMemo(() => {
    if (karigarFilter === "all") return REPORT_DATA;
    return REPORT_DATA.filter((r) => r.karigar === karigarFilter);
  }, [karigarFilter]);

  const completed      = filtered.filter((r) => r.status === "received").length;
  const pending        = filtered.filter((r) => r.status === "pending").length;
  const totalBudget    = filtered.reduce((s, r) => s + r.totalBudget, 0);
  const completionRate = filtered.length > 0 ? (completed / filtered.length) * 100 : 0;

  const reportTitle = karigarFilter === "all"
    ? `All Karigars — ${month} ${year}`
    : `${karigarFilter} — ${month} ${year}`;

  const now = new Date();
  const generatedAt =
    now.toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" }) +
    ", " + now.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true });

  const selectCls = "h-10 rounded-xl border-border text-sm bg-background";

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── Header ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Karigar Reports</h1>
          <p className="text-sm text-muted-foreground">Comprehensive reporting for karigar operations and performance</p>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">

        {/* FILTERS */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Report Filters</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Select Karigar</label>
              <Select value={karigarFilter} onValueChange={setKarigarFilter}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Karigars</SelectItem>
                  {mockKarigars.map((k) => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>{REPORT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Month</label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>{MONTHS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>{YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* REPORT SUMMARY HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">{reportTitle}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Generated on {generatedAt}</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors shadow-sm">
            <Download className="h-3.5 w-3.5" /> Export Report
          </button>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <AnimatedMetricCard label="Total Orders"    value={String(filtered.length)}         icon={Package}      iconCls="text-foreground/60" index={0} />
          <AnimatedMetricCard label="Completed"       value={String(completed)}               icon={CheckCircle2} iconCls="text-emerald-600"   valueColor="text-emerald-700" index={1} />
          <AnimatedMetricCard label="Pending"         value={String(pending)}                 icon={Clock}        iconCls="text-amber-600"     valueColor="text-amber-700"   index={2} />
          <AnimatedMetricCard label="Total Budget"    value={fmtAmt(totalBudget)}             icon={IndianRupee}  iconCls="text-foreground/60" index={3} />
          <AnimatedMetricCard label="Completion Rate" value={`${completionRate.toFixed(1)}%`} icon={TrendingUp}   iconCls="text-foreground/60" index={4} />
        </div>

        {/* SUB-TABS */}
        <div>
          <div className="flex items-center gap-0 border-b border-border mb-6">
            {SUB_TABS.map((t) => (
              <button key={t.key} onClick={() => setSubTab(t.key)}
                className={cn(
                  "px-6 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                  subTab === t.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}>
                {t.label}
              </button>
            ))}
          </div>

          {subTab === "orders"    && <OrdersTable rows={filtered} />}
          {subTab === "materials" && <MaterialsTab karigarFilter={karigarFilter} />}
          {subTab === "receipts"  && <ReceiptsTab  karigarFilter={karigarFilter} />}
          {subTab === "payments"  && <PaymentsTab  karigarFilter={karigarFilter} />}
          {subTab === "summary"   && (
            <SummaryTab
              filtered={filtered}
              completed={completed}
              pending={pending}
              completionRate={completionRate}
            />
          )}
        </div>

      </div>
    </div>
  );
}
