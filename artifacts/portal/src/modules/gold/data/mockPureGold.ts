export type GoldType = "Pure Gold" | "Old Gold" | "Coins";
export type GoldCategory = "Purchase" | "Sale";

export interface GoldTransaction {
  id: string;
  date: string;
  type: GoldType;
  category: GoldCategory;
  name: string;
  weight: number;
  purity: string;
  rate: number;
  amount: number;
  description: string;
}

export interface GoldDailyBalance {
  id: string;
  date: string;
  type: GoldType;
  openingWeight: number;
  purchases: number;
  sales: number;
  issues: number;
  closingWeight: number;
}

export const mockGoldTransactions: GoldTransaction[] = [
  { id: "gt1",  date: "2026-06-25", type: "Pure Gold", category: "Purchase", name: "Ramesh Jewellers",  weight: 100.0, purity: "24K", rate: 7200, amount: 720000, description: "Bulk purchase for festive stock" },
  { id: "gt2",  date: "2026-06-25", type: "Coins",     category: "Sale",     name: "Suresh Kumar",     weight: 20.0,  purity: "24K", rate: 7350, amount: 147000, description: "5 coins × 4g each" },
  { id: "gt3",  date: "2026-06-24", type: "Old Gold",  category: "Purchase", name: "Priya Sharma",     weight: 35.5,  purity: "22K", rate: 6500, amount: 230750, description: "Old bangles & chains" },
  { id: "gt4",  date: "2026-06-24", type: "Pure Gold", category: "Sale",     name: "Gold Palace",      weight: 50.0,  purity: "24K", rate: 7300, amount: 365000, description: "Wholesale supply" },
  { id: "gt5",  date: "2026-06-23", type: "Pure Gold", category: "Purchase", name: "National Refinery", weight: 200.0, purity: "24K", rate: 7150, amount: 1430000, description: "Monthly refinery purchase" },
  { id: "gt6",  date: "2026-06-23", type: "Old Gold",  category: "Sale",     name: "Meena Exports",    weight: 28.0,  purity: "18K", rate: 5400, amount: 151200, description: "Exported old jewellery" },
  { id: "gt7",  date: "2026-06-22", type: "Coins",     category: "Purchase", name: "MMTC-PAMP",        weight: 40.0,  purity: "24K", rate: 7100, amount: 284000, description: "10 × 4g coins" },
  { id: "gt8",  date: "2026-06-22", type: "Pure Gold", category: "Sale",     name: "Kavita Gems",      weight: 75.0,  purity: "24K", rate: 7280, amount: 546000, description: "Retail counter sale" },
  { id: "gt9",  date: "2026-06-21", type: "Old Gold",  category: "Purchase", name: "Walk-in Customer", weight: 12.3,  purity: "22K", rate: 6480, amount: 79704, description: "Old ring & earrings" },
  { id: "gt10", date: "2026-06-21", type: "Pure Gold", category: "Purchase", name: "City Bullion",     weight: 150.0, purity: "24K", rate: 7120, amount: 1068000, description: "Weekend stock refill" },
];

export const mockGoldDailyBalance: GoldDailyBalance[] = [
  { id: "db1", date: "2026-06-25", type: "Pure Gold", openingWeight: 1295.0, purchases: 100.0, sales: 50.0,  issues: 0,    closingWeight: 1345.0 },
  { id: "db2", date: "2026-06-25", type: "Old Gold",  openingWeight: 420.5,  purchases: 35.5,  sales: 28.0,  issues: 5.0,  closingWeight: 423.0  },
  { id: "db3", date: "2026-06-25", type: "Coins",     openingWeight: 180.0,  purchases: 0,     sales: 20.0,  issues: 0,    closingWeight: 160.0  },
  { id: "db4", date: "2026-06-24", type: "Pure Gold", openingWeight: 1220.0, purchases: 200.0, sales: 125.0, issues: 0,    closingWeight: 1295.0 },
  { id: "db5", date: "2026-06-24", type: "Old Gold",  openingWeight: 390.0,  purchases: 45.0,  sales: 14.5,  issues: 0,    closingWeight: 420.5  },
  { id: "db6", date: "2026-06-24", type: "Coins",     openingWeight: 220.0,  purchases: 40.0,  sales: 80.0,  issues: 0,    closingWeight: 180.0  },
  { id: "db7", date: "2026-06-23", type: "Pure Gold", openingWeight: 1100.0, purchases: 200.0, sales: 80.0,  issues: 0,    closingWeight: 1220.0 },
  { id: "db8", date: "2026-06-23", type: "Old Gold",  openingWeight: 360.0,  purchases: 30.0,  sales: 0,     issues: 0,    closingWeight: 390.0  },
  { id: "db9", date: "2026-06-23", type: "Coins",     openingWeight: 200.0,  purchases: 40.0,  sales: 20.0,  issues: 0,    closingWeight: 220.0  },
];
