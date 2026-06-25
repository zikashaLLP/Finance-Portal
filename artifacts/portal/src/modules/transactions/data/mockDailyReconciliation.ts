export interface BankAccountDay {
  opening: number;
  in: number;
  out: number;
  closing: number;
}

export interface DailyReconciliation {
  date: string;
  openingCash: number;
  cashIn: number;
  cashOut: number;
  closingCash: number;
  banks: Record<string, BankAccountDay>;
  txCount: number;
}

export const BANK_ACCOUNTS = ["HDFC Bank", "SBI Account"];

export const mockDailyReconciliation: DailyReconciliation[] = [
  {
    date: "2026-06-24",
    openingCash: 467000, cashIn: 0, cashOut: 12500, closingCash: 454500,
    banks: {
      "HDFC Bank":    { opening: 310000, in: 145000, out: 0,       closing: 455000 },
      "SBI Account":  { opening: 165300, in: 0,       out: 0,       closing: 165300 },
    },
    txCount: 2,
  },
  {
    date: "2026-06-23",
    openingCash: 417000, cashIn: 50000, cashOut: 0, closingCash: 467000,
    banks: {
      "HDFC Bank":    { opening: 310000, in: 0,       out: 0,       closing: 310000 },
      "SBI Account":  { opening: 525300, in: 0,       out: 360000,  closing: 165300 },
    },
    txCount: 2,
  },
  {
    date: "2026-06-22",
    openingCash: 417000, cashIn: 0, cashOut: 0, closingCash: 417000,
    banks: {
      "HDFC Bank":    { opening: 233500, in: 85000,   out: 8500,    closing: 310000 },
      "SBI Account":  { opening: 525300, in: 0,       out: 0,       closing: 525300 },
    },
    txCount: 2,
  },
  {
    date: "2026-06-21",
    openingCash: 399000, cashIn: 18000, cashOut: 0, closingCash: 417000,
    banks: {
      "HDFC Bank":    { opening: 233500, in: 0,       out: 0,       closing: 233500 },
      "SBI Account":  { opening: 570300, in: 0,       out: 45000,   closing: 525300 },
    },
    txCount: 2,
  },
  {
    date: "2026-06-20",
    openingCash: 399000, cashIn: 0, cashOut: 0, closingCash: 399000,
    banks: {
      "HDFC Bank":    { opening: 237700, in: 0,       out: 4200,    closing: 233500 },
      "SBI Account":  { opening: 497300, in: 73000,   out: 0,       closing: 570300 },
    },
    txCount: 2,
  },
  {
    date: "2026-06-19",
    openingCash: 375000, cashIn: 24000, cashOut: 0, closingCash: 399000,
    banks: {
      "HDFC Bank":    { opening: 252700, in: 0,       out: 15000,   closing: 237700 },
      "SBI Account":  { opening: 497300, in: 0,       out: 0,       closing: 497300 },
    },
    txCount: 2,
  },
  {
    date: "2026-06-18",
    openingCash: 312000, cashIn: 68000, cashOut: 5000, closingCash: 375000,
    banks: {
      "HDFC Bank":    { opening: 202700, in: 60000,   out: 10000,   closing: 252700 },
      "SBI Account":  { opening: 462300, in: 35000,   out: 0,       closing: 497300 },
    },
    txCount: 4,
  },
  {
    date: "2026-06-17",
    openingCash: 290000, cashIn: 42000, cashOut: 20000, closingCash: 312000,
    banks: {
      "HDFC Bank":    { opening: 154700, in: 78000,   out: 30000,   closing: 202700 },
      "SBI Account":  { opening: 422300, in: 40000,   out: 0,       closing: 462300 },
    },
    txCount: 5,
  },
  {
    date: "2026-06-16",
    openingCash: 260000, cashIn: 55000, cashOut: 25000, closingCash: 290000,
    banks: {
      "HDFC Bank":    { opening: 122700, in: 52000,   out: 20000,   closing: 154700 },
      "SBI Account":  { opening: 402300, in: 30000,   out: 10000,   closing: 422300 },
    },
    txCount: 3,
  },
  {
    date: "2026-06-15",
    openingCash: 210000, cashIn: 80000, cashOut: 30000, closingCash: 260000,
    banks: {
      "HDFC Bank":    { opening: 82700,  in: 70000,   out: 30000,   closing: 122700 },
      "SBI Account":  { opening: 372300, in: 50000,   out: 20000,   closing: 402300 },
    },
    txCount: 6,
  },
];
