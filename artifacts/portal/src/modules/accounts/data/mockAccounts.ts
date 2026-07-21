export interface AccountTransaction {
  id: string;
  date: string;
  description: string;
  debit: number | null;
  credit: number | null;
  balance: number;
}

export interface Account {
  id: string;
  name: string;
  type: "bank" | "cash";
  bank?: string;
  accountNumber?: string;
  currentBalance: number;
  transactions: AccountTransaction[];
}

export const mockAccounts: Account[] = [
  {
    id: "hdfc",
    name: "HDFC Bank Account",
    type: "bank",
    bank: "HDFC Bank",
    accountNumber: "XXXX 4821",
    currentBalance: 5_42_180,
    transactions: [
      { id: "h1", date: "2026-07-21", description: "Client payment — Sharma Jewels",       debit: null,   credit: 95_000,  balance: 5_42_180 },
      { id: "h2", date: "2026-07-18", description: "Vendor payment — Gold Suppliers Ltd",  debit: 48_000,  credit: null,    balance: 4_47_180 },
      { id: "h3", date: "2026-07-15", description: "NEFT received — Mehta Brothers",       debit: null,   credit: 1_25_000, balance: 4_95_180 },
      { id: "h4", date: "2026-07-12", description: "Bank charges & GST",                   debit: 850,    credit: null,    balance: 3_70_180 },
      { id: "h5", date: "2026-07-10", description: "Sales proceeds — retail counter",      debit: null,   credit: 62_500,  balance: 3_71_030 },
      { id: "h6", date: "2026-07-07", description: "Karigar payment — Ramesh Kumar",       debit: 18_500,  credit: null,    balance: 3_08_530 },
      { id: "h7", date: "2026-07-04", description: "Cheque deposit — Patel & Sons",        debit: null,   credit: 75_000,  balance: 3_27_030 },
      { id: "h8", date: "2026-07-01", description: "Opening balance transfer",              debit: null,   credit: 2_52_030, balance: 2_52_030 },
    ],
  },
  {
    id: "sbi",
    name: "SBI Account",
    type: "bank",
    bank: "State Bank of India",
    accountNumber: "XXXX 7743",
    currentBalance: 3_03_140,
    transactions: [
      { id: "s1", date: "2026-07-20", description: "Wholesale client — Gupta Gold",        debit: null,   credit: 80_000,  balance: 3_03_140 },
      { id: "s2", date: "2026-07-17", description: "Import duty payment",                  debit: 22_600,  credit: null,    balance: 2_23_140 },
      { id: "s3", date: "2026-07-14", description: "Gold purchase — Mumbai market",        debit: 1_40_000, credit: null,   balance: 2_45_740 },
      { id: "s4", date: "2026-07-11", description: "RTGS received — Diamond Impex",        debit: null,   credit: 2_00_000, balance: 3_85_740 },
      { id: "s5", date: "2026-07-08", description: "Staff salaries",                       debit: 55_000,  credit: null,    balance: 1_85_740 },
      { id: "s6", date: "2026-07-05", description: "Insurance premium",                   debit: 12_600,  credit: null,    balance: 2_40_740 },
      { id: "s7", date: "2026-07-01", description: "Opening balance",                      debit: null,   credit: 2_53_340, balance: 2_53_340 },
    ],
  },
  {
    id: "cash",
    name: "Cash",
    type: "cash",
    currentBalance: 1_24_500,
    transactions: [
      { id: "c1", date: "2026-07-21", description: "Walk-in sale — gold chain",            debit: null,   credit: 18_000,  balance: 1_24_500 },
      { id: "c2", date: "2026-07-20", description: "Petty expenses — packaging & misc",   debit: 3_200,   credit: null,    balance: 1_06_500 },
      { id: "c3", date: "2026-07-19", description: "Walk-in sale — bangles set",           debit: null,   credit: 24_500,  balance: 1_09_700 },
      { id: "c4", date: "2026-07-17", description: "Cash advance to karigar",              debit: 8_000,   credit: null,    balance: 85_200   },
      { id: "c5", date: "2026-07-15", description: "Walk-in sale — earrings",              debit: null,   credit: 12_000,  balance: 93_200   },
      { id: "c6", date: "2026-07-13", description: "Market purchase — loose stones",       debit: 15_000,  credit: null,    balance: 81_200   },
      { id: "c7", date: "2026-07-10", description: "Walk-in sale — necklace",              debit: null,   credit: 45_000,  balance: 96_200   },
      { id: "c8", date: "2026-07-01", description: "Opening cash balance",                 debit: null,   credit: 51_200,  balance: 51_200   },
    ],
  },
];

export const accountsSummary = {
  totalCashIn:  mockAccounts.reduce((sum, a) =>
    sum + a.transactions.reduce((s, t) => s + (t.credit ?? 0), 0), 0),
  totalCashOut: mockAccounts.reduce((sum, a) =>
    sum + a.transactions.reduce((s, t) => s + (t.debit ?? 0), 0), 0),
  get netPosition() {
    return this.totalCashIn - this.totalCashOut;
  },
};
