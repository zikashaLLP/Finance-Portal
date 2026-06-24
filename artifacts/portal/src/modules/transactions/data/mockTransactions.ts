export interface Transaction {
  id: string;
  dateTime: string;
  type: "income" | "expense";
  description: string;
  entity: string;
  amount: number;
  account: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    dateTime: "2026-06-24T10:30:00Z",
    type: "income",
    description: "Gold Sale - Bangle Set",
    entity: "Rahul Sharma",
    amount: 145000,
    account: "HDFC Bank",
  },
  {
    id: "tx-002",
    dateTime: "2026-06-24T11:15:00Z",
    type: "expense",
    description: "Karigar Payment - Making Charges",
    entity: "Ali Hassan",
    amount: 12500,
    account: "Cash",
  },
  {
    id: "tx-003",
    dateTime: "2026-06-23T14:20:00Z",
    type: "income",
    description: "Advance Payment for Necklace",
    entity: "Sunita Verma",
    amount: 50000,
    account: "Cash",
  },
  {
    id: "tx-004",
    dateTime: "2026-06-23T16:45:00Z",
    type: "expense",
    description: "24K Gold Purchase - 50g",
    entity: "Malabar Bullion",
    amount: 360000,
    account: "SBI Account",
  },
  {
    id: "tx-005",
    dateTime: "2026-06-22T09:30:00Z",
    type: "expense",
    description: "Shop Electricity Bill",
    entity: "BESCOM",
    amount: 8500,
    account: "HDFC Bank",
  },
  {
    id: "tx-006",
    dateTime: "2026-06-22T12:10:00Z",
    type: "income",
    description: "Diamond Ring Sale",
    entity: "Priya Desai",
    amount: 85000,
    account: "HDFC Bank",
  },
  {
    id: "tx-007",
    dateTime: "2026-06-21T10:00:00Z",
    type: "expense",
    description: "Staff Salary - June",
    entity: "Multiple",
    amount: 45000,
    account: "SBI Account",
  },
  {
    id: "tx-008",
    dateTime: "2026-06-21T13:40:00Z",
    type: "income",
    description: "Old Gold Exchange Balance",
    entity: "Karan Patel",
    amount: 18000,
    account: "Cash",
  },
  {
    id: "tx-009",
    dateTime: "2026-06-20T11:25:00Z",
    type: "expense",
    description: "Vendor Payment - Packaging",
    entity: "Supreme Packaging",
    amount: 4200,
    account: "HDFC Bank",
  },
  {
    id: "tx-010",
    dateTime: "2026-06-20T15:50:00Z",
    type: "income",
    description: "Gold Coin Sale (10g)",
    entity: "Amit Kumar",
    amount: 73000,
    account: "SBI Account",
  },
  {
    id: "tx-011",
    dateTime: "2026-06-19T09:15:00Z",
    type: "expense",
    description: "Security Services",
    entity: "SafeGuard Co.",
    amount: 15000,
    account: "HDFC Bank",
  },
  {
    id: "tx-012",
    dateTime: "2026-06-19T16:30:00Z",
    type: "income",
    description: "Silver Utensils Sale",
    entity: "Meera Reddy",
    amount: 24000,
    account: "Cash",
  }
];
