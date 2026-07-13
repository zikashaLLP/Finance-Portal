export type OldGoldStatus = "In Box" | "Melted";

export interface OldGoldItem {
  id: string;
  lotNumber: string;
  description: string;
  grossWeight: number;
  netWeight: number;
  purity: string;
  pureGold: number;
  status: OldGoldStatus;
  receivedDate: string;
}

export interface MeltingRecord {
  id: string;
  lotNumber: string;
  meltDate: string;
  grossWeight: number;
  netWeight: number;
  purity: string;
  pureGoldYield: number;
  notes: string;
}

export interface BalanceByDate {
  id: string;
  date: string;
  itemsAdded: number;
  itemsMelted: number;
  pureGoldProduced: number;
  runningBalance: number;
}

export interface DeletionAudit {
  id: string;
  lotNumber: string;
  description: string;
  deletedAt: string;
  reason: string;
  deletedBy: string;
}

export const mockOldGoldItems: OldGoldItem[] = [
  { id: "og1",  lotNumber: "OG-2026-001", description: "22K Bangles pair — Kundan work",         grossWeight: 48.50, netWeight: 45.20, purity: "22K", pureGold: 41.43, status: "In Box",  receivedDate: "2026-01-03" },
  { id: "og2",  lotNumber: "OG-2026-002", description: "18K Necklace — broken clasp",            grossWeight: 32.80, netWeight: 30.10, purity: "18K", pureGold: 22.58, status: "In Box",  receivedDate: "2026-01-05" },
  { id: "og3",  lotNumber: "OG-2026-003", description: "22K Ring set — 4 pieces",                grossWeight: 18.40, netWeight: 17.50, purity: "22K", pureGold: 16.04, status: "Melted",  receivedDate: "2026-01-07" },
  { id: "og4",  lotNumber: "OG-2026-004", description: "24K Gold bar — damaged corner",          grossWeight: 100.00,netWeight: 99.20, purity: "24K", pureGold: 99.20, status: "Melted",  receivedDate: "2026-01-09" },
  { id: "og5",  lotNumber: "OG-2026-005", description: "22K Earrings — antique design",          grossWeight: 12.60, netWeight: 11.90, purity: "22K", pureGold: 10.91, status: "In Box",  receivedDate: "2026-01-11" },
  { id: "og6",  lotNumber: "OG-2026-006", description: "18K Bracelet — stone missing",           grossWeight: 22.30, netWeight: 21.00, purity: "18K", pureGold: 15.75, status: "In Box",  receivedDate: "2026-01-14" },
  { id: "og7",  lotNumber: "OG-2026-007", description: "22K Necklace set — full set",            grossWeight: 85.40, netWeight: 82.10, purity: "22K", pureGold: 75.26, status: "Melted",  receivedDate: "2026-01-16" },
  { id: "og8",  lotNumber: "OG-2026-008", description: "14K Mangalsutra — chain only",           grossWeight: 9.80,  netWeight: 9.20,  purity: "14K", pureGold: 5.37,  status: "In Box",  receivedDate: "2026-01-18" },
  { id: "og9",  lotNumber: "OG-2026-009", description: "22K Waist belt — traditional",           grossWeight: 145.20,netWeight: 140.00,purity: "22K", pureGold: 128.33,status: "In Box",  receivedDate: "2026-01-20" },
  { id: "og10", lotNumber: "OG-2026-010", description: "18K Pendant — enamel work",              grossWeight: 8.50,  netWeight: 8.00,  purity: "18K", pureGold: 6.00,  status: "Melted",  receivedDate: "2026-01-22" },
  { id: "og11", lotNumber: "OG-2026-011", description: "22K Anklets pair — bell design",         grossWeight: 38.70, netWeight: 36.50, purity: "22K", pureGold: 33.46, status: "In Box",  receivedDate: "2026-01-25" },
  { id: "og12", lotNumber: "OG-2026-012", description: "24K Coins — 5 × 10g",                   grossWeight: 50.00, netWeight: 50.00, purity: "24K", pureGold: 50.00, status: "Melted",  receivedDate: "2026-01-27" },
  { id: "og13", lotNumber: "OG-2026-013", description: "22K Choker necklace — filigree",         grossWeight: 62.30, netWeight: 59.80, purity: "22K", pureGold: 54.82, status: "In Box",  receivedDate: "2026-01-29" },
  { id: "og14", lotNumber: "OG-2026-014", description: "18K Ring — diamond setting damaged",     grossWeight: 6.40,  netWeight: 6.10,  purity: "18K", pureGold: 4.58,  status: "In Box",  receivedDate: "2026-02-01" },
  { id: "og15", lotNumber: "OG-2026-015", description: "22K Kangan — wide band",                 grossWeight: 55.60, netWeight: 52.40, purity: "22K", pureGold: 48.03, status: "Melted",  receivedDate: "2026-02-03" },
  { id: "og16", lotNumber: "OG-2026-016", description: "22K Jhumka earrings — large",            grossWeight: 24.80, netWeight: 23.50, purity: "22K", pureGold: 21.54, status: "In Box",  receivedDate: "2026-02-05" },
  { id: "og17", lotNumber: "OG-2026-017", description: "18K Tie pin set — 3 pcs",                grossWeight: 11.20, netWeight: 10.80, purity: "18K", pureGold: 8.10,  status: "In Box",  receivedDate: "2026-02-07" },
  { id: "og18", lotNumber: "OG-2026-018", description: "22K Nose ring — kundan",                 grossWeight: 4.20,  netWeight: 4.00,  purity: "22K", pureGold: 3.67,  status: "In Box",  receivedDate: "2026-02-10" },
  { id: "og19", lotNumber: "OG-2026-019", description: "24K Bar — 50g hallmarked",               grossWeight: 50.00, netWeight: 50.00, purity: "24K", pureGold: 50.00, status: "Melted",  receivedDate: "2026-02-12" },
  { id: "og20", lotNumber: "OG-2026-020", description: "22K Armlet — tribal design",             grossWeight: 72.50, netWeight: 69.80, purity: "22K", pureGold: 64.00, status: "In Box",  receivedDate: "2026-02-14" },
  { id: "og21", lotNumber: "OG-2026-021", description: "18K Cufflinks — set of 2",               grossWeight: 14.60, netWeight: 14.00, purity: "18K", pureGold: 10.50, status: "In Box",  receivedDate: "2026-02-16" },
  { id: "og22", lotNumber: "OG-2026-022", description: "22K Haar — long chain necklace",         grossWeight: 98.40, netWeight: 95.00, purity: "22K", pureGold: 87.08, status: "Melted",  receivedDate: "2026-02-18" },
  { id: "og23", lotNumber: "OG-2026-023", description: "22K Toe rings — 6 pcs set",              grossWeight: 8.80,  netWeight: 8.40,  purity: "22K", pureGold: 7.70,  status: "In Box",  receivedDate: "2026-02-20" },
  { id: "og24", lotNumber: "OG-2026-024", description: "18K Cocktail ring — sapphire",           grossWeight: 7.20,  netWeight: 6.90,  purity: "18K", pureGold: 5.18,  status: "In Box",  receivedDate: "2026-02-22" },
  { id: "og25", lotNumber: "OG-2026-025", description: "22K Chandelier earrings — heavy",        grossWeight: 42.10, netWeight: 40.20, purity: "22K", pureGold: 36.85, status: "In Box",  receivedDate: "2026-02-24" },
  { id: "og26", lotNumber: "OG-2026-026", description: "24K Investment bar — 100g",              grossWeight: 100.00,netWeight: 100.00,purity: "24K", pureGold: 100.00,status: "Melted",  receivedDate: "2026-02-26" },
  { id: "og27", lotNumber: "OG-2026-027", description: "22K Baju band — embossed",               grossWeight: 68.30, netWeight: 65.40, purity: "22K", pureGold: 59.95, status: "In Box",  receivedDate: "2026-02-28" },
];

export const mockMeltingRecords: MeltingRecord[] = [
  { id: "mr1",  lotNumber: "OG-2026-003", meltDate: "2026-01-15", grossWeight: 18.40, netWeight: 17.50, purity: "22K", pureGoldYield: 16.04, notes: "Melted for ring resizing order" },
  { id: "mr2",  lotNumber: "OG-2026-004", meltDate: "2026-01-18", grossWeight: 100.00,netWeight: 99.20, purity: "24K", pureGoldYield: 99.20, notes: "Refined for wholesale lot" },
  { id: "mr3",  lotNumber: "OG-2026-007", meltDate: "2026-01-25", grossWeight: 85.40, netWeight: 82.10, purity: "22K", pureGoldYield: 75.26, notes: "Customer exchange — new design" },
  { id: "mr4",  lotNumber: "OG-2026-010", meltDate: "2026-01-30", grossWeight: 8.50,  netWeight: 8.00,  purity: "18K", pureGoldYield: 6.00,  notes: "Enamel stripped, gold recovered" },
  { id: "mr5",  lotNumber: "OG-2026-012", meltDate: "2026-02-05", grossWeight: 50.00, netWeight: 50.00, purity: "24K", pureGoldYield: 50.00, notes: "Batch consolidation" },
  { id: "mr6",  lotNumber: "OG-2026-015", meltDate: "2026-02-10", grossWeight: 55.60, netWeight: 52.40, purity: "22K", pureGoldYield: 48.03, notes: "Festival order fulfilment" },
  { id: "mr7",  lotNumber: "OG-2026-019", meltDate: "2026-02-18", grossWeight: 50.00, netWeight: 50.00, purity: "24K", pureGoldYield: 50.00, notes: "Investment bar — urgent order" },
  { id: "mr8",  lotNumber: "OG-2026-022", meltDate: "2026-02-25", grossWeight: 98.40, netWeight: 95.00, purity: "22K", pureGoldYield: 87.08, notes: "Bulk melt for bridal collection" },
  { id: "mr9",  lotNumber: "OG-2026-026", meltDate: "2026-03-01", grossWeight: 100.00,netWeight: 100.00,purity: "24K", pureGoldYield: 100.00,notes: "Routine refinement batch" },
  { id: "mr10", lotNumber: "OG-2026-026", meltDate: "2026-03-05", grossWeight: 42.80, netWeight: 41.00, purity: "22K", pureGoldYield: 37.58, notes: "Mixed lot consolidation" },
];

export const mockBalanceByDate: BalanceByDate[] = [
  { id: "bd1", date: "2026-01-03", itemsAdded: 2,  itemsMelted: 0, pureGoldProduced: 0,      runningBalance: 63.01  },
  { id: "bd2", date: "2026-01-07", itemsAdded: 2,  itemsMelted: 0, pureGoldProduced: 0,      runningBalance: 121.22 },
  { id: "bd3", date: "2026-01-15", itemsAdded: 0,  itemsMelted: 1, pureGoldProduced: 16.04,  runningBalance: 121.22 },
  { id: "bd4", date: "2026-01-18", itemsAdded: 2,  itemsMelted: 1, pureGoldProduced: 99.20,  runningBalance: 220.42 },
  { id: "bd5", date: "2026-01-25", itemsAdded: 3,  itemsMelted: 1, pureGoldProduced: 75.26,  runningBalance: 379.89 },
  { id: "bd6", date: "2026-02-01", itemsAdded: 4,  itemsMelted: 2, pureGoldProduced: 56.00,  runningBalance: 471.30 },
  { id: "bd7", date: "2026-02-10", itemsAdded: 3,  itemsMelted: 1, pureGoldProduced: 48.03,  runningBalance: 535.50 },
  { id: "bd8", date: "2026-02-28", itemsAdded: 5,  itemsMelted: 3, pureGoldProduced: 237.08, runningBalance: 723.40 },
];

export const mockDeletionAudit: DeletionAudit[] = [
  { id: "da1",  lotNumber: "OG-2025-112", description: "22K Bangle — duplicate entry",         deletedAt: "2026-01-06 10:22", reason: "Duplicate lot number entered",       deletedBy: "Admin" },
  { id: "da2",  lotNumber: "OG-2025-089", description: "18K Ring — wrong purity recorded",     deletedAt: "2026-01-10 14:05", reason: "Incorrect purity, re-entered",       deletedBy: "Supervisor" },
  { id: "da3",  lotNumber: "OG-2025-201", description: "24K Bar — weight mismatch",            deletedAt: "2026-01-14 09:30", reason: "Weight discrepancy on recheck",      deletedBy: "Admin" },
  { id: "da4",  lotNumber: "OG-2026-004", description: "Old necklace — misclassified",         deletedAt: "2026-01-20 11:15", reason: "Item actually belongs to karigar",   deletedBy: "Manager" },
  { id: "da5",  lotNumber: "OG-2025-310", description: "22K Anklet — already sold",            deletedAt: "2026-01-25 16:40", reason: "Item was sold before logging",       deletedBy: "Admin" },
  { id: "da6",  lotNumber: "OG-2026-011", description: "18K Coins — test entry",               deletedAt: "2026-02-02 08:55", reason: "Test data — not actual stock",       deletedBy: "Dev" },
  { id: "da7",  lotNumber: "OG-2025-445", description: "14K Bracelet — damaged",               deletedAt: "2026-02-07 13:20", reason: "Item returned to customer",          deletedBy: "Supervisor" },
  { id: "da8",  lotNumber: "OG-2026-018", description: "22K Set — incomplete entry",           deletedAt: "2026-02-12 15:00", reason: "Missing net weight, deleted + re-added", deletedBy: "Admin" },
  { id: "da9",  lotNumber: "OG-2025-560", description: "18K Ring — purity recheck",            deletedAt: "2026-02-17 10:10", reason: "Sent to assay, re-entry pending",    deletedBy: "Manager" },
  { id: "da10", lotNumber: "OG-2026-020", description: "22K Haar — broken set",               deletedAt: "2026-02-22 14:45", reason: "Split into two separate lot entries", deletedBy: "Admin" },
  { id: "da11", lotNumber: "OG-2025-612", description: "24K Coin — single piece",             deletedAt: "2026-02-27 09:00", reason: "Coin returned to original owner",    deletedBy: "Supervisor" },
  { id: "da12", lotNumber: "OG-2026-025", description: "22K Waist chain — lost tag",          deletedAt: "2026-03-02 11:30", reason: "Physical item not found in box",     deletedBy: "Admin" },
];

/* ── Derived stats used by metric cards ── */
export function getOldGoldStats() {
  const inBoxItems  = mockOldGoldItems.filter((i) => i.status === "In Box");
  const meltedItems = mockOldGoldItems.filter((i) => i.status === "Melted");

  const pureGoldInBox  = inBoxItems.reduce((s, i) => s + i.pureGold, 0);
  const totalYield     = mockMeltingRecords.reduce((s, r) => s + r.pureGoldYield, 0);
  const totalGross     = mockMeltingRecords.reduce((s, r) => s + r.grossWeight, 0);
  const conversionRate = totalGross > 0 ? (totalYield / totalGross) * 100 : 0;

  // Available pure gold = total yield from melting minus hypothetical issued amount
  const availablePureGold = totalYield - 645.50; // issued 645.50g — intentionally shows negative

  return {
    totalBoxItems: mockOldGoldItems.length,
    meltedCount:   meltedItems.length,
    inBoxCount:    inBoxItems.length,
    pureGoldInBox,
    availablePureGold,
    conversionRate,
  };
}
