export type PartyTag = "supplier" | "client" | "karigar" | "goldsmith";
export type LedgerFilter = "all" | "supplier" | "client" | "karigar";

export type LedgerEntry = {
  id: string;
  date: string;
  description: string;
  grams: number;
  amount: number;
};

export type LedgerParty = {
  id: string;
  name: string;
  tags: PartyTag[];
  phone: string;
  transactionCount: number;
  balanceAmount: number;
  balanceGrams: number;
  cashToGive: number;
  purchaseToGive: { amount: number; grams: number };
  paidToReceive: { amount: number; grams: number };
  purchaseEntries: LedgerEntry[];
  toGiveEntries: LedgerEntry[];
  purchaseTotal: { amount: number; grams: number };
  toGiveTotal: { amount: number; grams: number };
};

export const MOCK_PARTIES: LedgerParty[] = [
  {
    id: "p1",
    name: "Anjali Limited (LTD)",
    tags: ["supplier"],
    phone: "+91 98765 43210",
    transactionCount: 8,
    balanceAmount: 4,
    balanceGrams: 102.5,
    cashToGive: 12500,
    purchaseToGive: { amount: 84200, grams: 102.5 },
    paidToReceive: { amount: 71700, grams: 89.0 },
    purchaseEntries: [
      { id: "a1", date: "15 Jan", description: "Opening Balance — Gold bars 24K", grams: 45.0, amount: 32400 },
      { id: "a2", date: "18 Jan", description: "Gold purchase — Hallmark certified", grams: 28.5, amount: 20520 },
      { id: "a3", date: "22 Jan", description: "Diamond set purchase — 4 pcs", grams: 29.0, amount: 31280 },
    ],
    toGiveEntries: [
      { id: "a4", date: "16 Jan", description: "Gold bars returned — 24K", grams: 45.0, amount: 32400 },
      { id: "a5", date: "20 Jan", description: "Setting charges adjustment", grams: 15.0, amount: 10800 },
      { id: "a6", date: "23 Jan", description: "Diamond balance pending", grams: 29.0, amount: 28500 },
    ],
    purchaseTotal: { amount: 84200, grams: 102.5 },
    toGiveTotal: { amount: 71700, grams: 89.0 },
  },
  {
    id: "p2",
    name: "Aunty SJ",
    tags: ["client"],
    phone: "+91 99887 66554",
    transactionCount: 24,
    balanceAmount: 18500,
    balanceGrams: 0,
    cashToGive: 18500,
    purchaseToGive: { amount: 95400, grams: 0 },
    paidToReceive: { amount: 76900, grams: 0 },
    purchaseEntries: [
      { id: "b1", date: "10 Jan", description: "Necklace set — 22K gold", grams: 0, amount: 38500 },
      { id: "b2", date: "14 Jan", description: "Bangles pair — 18K", grams: 0, amount: 22400 },
      { id: "b3", date: "19 Jan", description: "Ring set — 4 pcs 22K", grams: 0, amount: 34500 },
    ],
    toGiveEntries: [
      { id: "b4", date: "11 Jan", description: "Advance payment received", grams: 0, amount: 30000 },
      { id: "b5", date: "15 Jan", description: "Partial payment — cash", grams: 0, amount: 26900 },
      { id: "b6", date: "20 Jan", description: "Balance outstanding", grams: 0, amount: 20000 },
    ],
    purchaseTotal: { amount: 95400, grams: 0 },
    toGiveTotal: { amount: 76900, grams: 0 },
  },
  {
    id: "p3",
    name: "Bhavesh Bhai",
    tags: ["supplier", "client"],
    phone: "+91 94567 12309",
    transactionCount: 15,
    balanceAmount: 6800,
    balanceGrams: 58.75,
    cashToGive: 6800,
    purchaseToGive: { amount: 121500, grams: 58.75 },
    paidToReceive: { amount: 114700, grams: 52.0 },
    purchaseEntries: [
      { id: "c1", date: "08 Jan", description: "Opening stock — old gold 22K", grams: 32.0, amount: 65800 },
      { id: "c2", date: "12 Jan", description: "Gold purchase — 24K bars", grams: 14.75, amount: 35700 },
      { id: "c3", date: "21 Jan", description: "Diamond purchase batch 3", grams: 12.0, amount: 20000 },
    ],
    toGiveEntries: [
      { id: "c4", date: "09 Jan", description: "Gold delivery — 22K", grams: 32.0, amount: 65800 },
      { id: "c5", date: "13 Jan", description: "Partial settlement", grams: 20.0, amount: 48900 },
    ],
    purchaseTotal: { amount: 121500, grams: 58.75 },
    toGiveTotal: { amount: 114700, grams: 52.0 },
  },
  {
    id: "p4",
    name: "Hiral Impex Limited",
    tags: ["supplier"],
    phone: "+91 90111 23456",
    transactionCount: 6,
    balanceAmount: 0,
    balanceGrams: 34.2,
    cashToGive: 0,
    purchaseToGive: { amount: 58900, grams: 34.2 },
    paidToReceive: { amount: 58900, grams: 0 },
    purchaseEntries: [
      { id: "d1", date: "05 Jan", description: "Import lot — 24K 100g bars", grams: 20.0, amount: 28900 },
      { id: "d2", date: "17 Jan", description: "Second lot — 22K jewellery", grams: 14.2, amount: 30000 },
    ],
    toGiveEntries: [
      { id: "d3", date: "06 Jan", description: "Payment cleared — lot 1", grams: 0, amount: 28900 },
      { id: "d4", date: "18 Jan", description: "Payment cleared — lot 2", grams: 0, amount: 30000 },
    ],
    purchaseTotal: { amount: 58900, grams: 34.2 },
    toGiveTotal: { amount: 58900, grams: 0 },
  },
  {
    id: "p5",
    name: "AGF",
    tags: ["karigar"],
    phone: "+91 87654 32109",
    transactionCount: 11,
    balanceAmount: 4200,
    balanceGrams: 12.5,
    cashToGive: 4200,
    purchaseToGive: { amount: 42000, grams: 12.5 },
    paidToReceive: { amount: 37800, grams: 0 },
    purchaseEntries: [
      { id: "e1", date: "03 Jan", description: "Making charges — necklace set", grams: 5.0, amount: 15000 },
      { id: "e2", date: "11 Jan", description: "Making charges — bangle set", grams: 4.5, amount: 14500 },
      { id: "e3", date: "20 Jan", description: "Making charges — ring set 4 pcs", grams: 3.0, amount: 12500 },
    ],
    toGiveEntries: [
      { id: "e4", date: "04 Jan", description: "Payment — necklace work", grams: 0, amount: 15000 },
      { id: "e5", date: "12 Jan", description: "Payment — bangle work", grams: 0, amount: 14500 },
      { id: "e6", date: "21 Jan", description: "Balance pending", grams: 0, amount: 8300 },
    ],
    purchaseTotal: { amount: 42000, grams: 12.5 },
    toGiveTotal: { amount: 37800, grams: 0 },
  },
  {
    id: "p6",
    name: "Gold-2200",
    tags: ["supplier"],
    phone: "+91 76543 21098",
    transactionCount: 4,
    balanceAmount: 22000,
    balanceGrams: 20.0,
    cashToGive: 22000,
    purchaseToGive: { amount: 76000, grams: 20.0 },
    paidToReceive: { amount: 54000, grams: 0 },
    purchaseEntries: [
      { id: "f1", date: "07 Jan", description: "Gold purchase — 22K 20g", grams: 20.0, amount: 76000 },
    ],
    toGiveEntries: [
      { id: "f2", date: "07 Jan", description: "Advance paid", grams: 0, amount: 40000 },
      { id: "f3", date: "14 Jan", description: "Part payment", grams: 0, amount: 14000 },
    ],
    purchaseTotal: { amount: 76000, grams: 20.0 },
    toGiveTotal: { amount: 54000, grams: 0 },
  },
  {
    id: "p7",
    name: "Arham Jewels (Sanjiv bhai)",
    tags: ["client", "supplier"],
    phone: "+91 98001 44332",
    transactionCount: 19,
    balanceAmount: 9500,
    balanceGrams: 22.8,
    cashToGive: 9500,
    purchaseToGive: { amount: 113000, grams: 22.8 },
    paidToReceive: { amount: 103500, grams: 0 },
    purchaseEntries: [
      { id: "g1", date: "02 Jan", description: "Opening Balance — exchange", grams: 10.0, amount: 42000 },
      { id: "g2", date: "09 Jan", description: "New gold jewellery order", grams: 8.8, amount: 40500 },
      { id: "g3", date: "16 Jan", description: "Diamond studded set", grams: 4.0, amount: 30500 },
    ],
    toGiveEntries: [
      { id: "g4", date: "03 Jan", description: "Cash received — advance", grams: 0, amount: 50000 },
      { id: "g5", date: "10 Jan", description: "Gold given back", grams: 0, amount: 35000 },
      { id: "g6", date: "17 Jan", description: "Pending balance", grams: 0, amount: 18500 },
    ],
    purchaseTotal: { amount: 113000, grams: 22.8 },
    toGiveTotal: { amount: 103500, grams: 0 },
  },
  {
    id: "p8",
    name: "JMD",
    tags: ["karigar"],
    phone: "+91 91234 56789",
    transactionCount: 7,
    balanceAmount: 3100,
    balanceGrams: 8.0,
    cashToGive: 3100,
    purchaseToGive: { amount: 31000, grams: 8.0 },
    paidToReceive: { amount: 27900, grams: 0 },
    purchaseEntries: [
      { id: "h1", date: "06 Jan", description: "Polishing — 12 pieces", grams: 3.5, amount: 13500 },
      { id: "h2", date: "18 Jan", description: "Engraving work — 8 pcs", grams: 4.5, amount: 17500 },
    ],
    toGiveEntries: [
      { id: "h3", date: "07 Jan", description: "Payment — polishing", grams: 0, amount: 13500 },
      { id: "h4", date: "19 Jan", description: "Partial payment", grams: 0, amount: 14400 },
    ],
    purchaseTotal: { amount: 31000, grams: 8.0 },
    toGiveTotal: { amount: 27900, grams: 0 },
  },
  {
    id: "p9",
    name: "PRETEGA-8",
    tags: ["client"],
    phone: "+91 88776 55443",
    transactionCount: 3,
    balanceAmount: 14800,
    balanceGrams: 0,
    cashToGive: 14800,
    purchaseToGive: { amount: 52000, grams: 0 },
    paidToReceive: { amount: 37200, grams: 0 },
    purchaseEntries: [
      { id: "i1", date: "13 Jan", description: "Engagement set — 22K", grams: 0, amount: 52000 },
    ],
    toGiveEntries: [
      { id: "i2", date: "13 Jan", description: "Token advance paid", grams: 0, amount: 20000 },
      { id: "i3", date: "20 Jan", description: "Second instalment", grams: 0, amount: 17200 },
    ],
    purchaseTotal: { amount: 52000, grams: 0 },
    toGiveTotal: { amount: 37200, grams: 0 },
  },
];

export function getFilteredParties(filter: LedgerFilter): LedgerParty[] {
  if (filter === "all") return MOCK_PARTIES;
  return MOCK_PARTIES.filter((p) => p.tags.includes(filter as PartyTag));
}

export function getSummary(parties: LedgerParty[]) {
  return parties.reduce(
    (acc, p) => ({
      cashToGive: acc.cashToGive + p.cashToGive,
      purchaseToGiveAmount: acc.purchaseToGiveAmount + p.purchaseToGive.amount,
      purchaseToGiveGrams: acc.purchaseToGiveGrams + p.purchaseToGive.grams,
      paidToReceiveAmount: acc.paidToReceiveAmount + p.paidToReceive.amount,
      paidToReceiveGrams: acc.paidToReceiveGrams + p.paidToReceive.grams,
    }),
    { cashToGive: 0, purchaseToGiveAmount: 0, purchaseToGiveGrams: 0, paidToReceiveAmount: 0, paidToReceiveGrams: 0 },
  );
}
