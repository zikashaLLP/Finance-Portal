export type FinanceType = "Client" | "Vendor" | "Karigar";
export type FinanceDirection = "receive" | "pay";

export interface FinanceEntry {
  id: string;
  name: string;
  type: FinanceType;
  amount: number;
  since: string;
  daysOld: number;
  direction: FinanceDirection;
  timeline: string | null;
}

export const mockFinanceEntries: FinanceEntry[] = [
  { id: "f001", name: "Ramesh Jewellers",      type: "Client",  amount: 285000, since: "2026-01-15", daysOld: 179, direction: "receive", timeline: null },
  { id: "f002", name: "Suresh Gold Suppliers", type: "Vendor",  amount: 142500, since: "2026-03-10", daysOld: 125, direction: "pay",     timeline: null },
  { id: "f003", name: "Mahesh Kumar",           type: "Karigar", amount:  38000, since: "2026-04-01", daysOld: 103, direction: "pay",     timeline: null },
  { id: "f004", name: "Priya Ornaments",        type: "Client",  amount: 175000, since: "2026-04-20", daysOld:  84, direction: "receive", timeline: null },
  { id: "f005", name: "Anjali Gems & Co",       type: "Client",  amount:  92000, since: "2026-05-01", daysOld:  73, direction: "receive", timeline: null },
  { id: "f006", name: "Vikram Bullion House",   type: "Vendor",  amount: 310000, since: "2026-05-05", daysOld:  69, direction: "pay",     timeline: null },
  { id: "f007", name: "Raju Karigar",           type: "Karigar", amount:  24500, since: "2026-05-12", daysOld:  62, direction: "pay",     timeline: null },
  { id: "f008", name: "Sheela Jewel Mart",      type: "Client",  amount: 410000, since: "2026-05-18", daysOld:  56, direction: "receive", timeline: null },
  { id: "f009", name: "Laxmi Gold Works",       type: "Vendor",  amount:  88000, since: "2026-05-22", daysOld:  52, direction: "pay",     timeline: null },
  { id: "f010", name: "Arvind Goldsmith",       type: "Karigar", amount:  52000, since: "2026-06-01", daysOld:  42, direction: "pay",     timeline: null },
  { id: "f011", name: "Deepak Trading Co",      type: "Client",  amount: 225000, since: "2026-06-03", daysOld:  40, direction: "receive", timeline: null },
  { id: "f012", name: "National Bullion Pvt",   type: "Vendor",  amount: 195000, since: "2026-06-05", daysOld:  38, direction: "pay",     timeline: null },
  { id: "f013", name: "Ganesh Karigar Centre",  type: "Karigar", amount:  17500, since: "2026-06-08", daysOld:  35, direction: "pay",     timeline: null },
  { id: "f014", name: "Meena Collections",      type: "Client",  amount: 135000, since: "2026-06-10", daysOld:  33, direction: "receive", timeline: null },
  { id: "f015", name: "Hari Om Jewels",         type: "Client",  amount:  68000, since: "2026-06-12", daysOld:  31, direction: "receive", timeline: null },
  { id: "f016", name: "Star Gems Suppliers",    type: "Vendor",  amount: 240000, since: "2026-06-14", daysOld:  29, direction: "pay",     timeline: null },
  { id: "f017", name: "Kiran Goldsmith",        type: "Karigar", amount:  31000, since: "2026-06-15", daysOld:  28, direction: "pay",     timeline: null },
  { id: "f018", name: "Radha Ornaments",        type: "Client",  amount: 182000, since: "2026-06-16", daysOld:  27, direction: "receive", timeline: null },
  { id: "f019", name: "Pavan Bullion Ltd",      type: "Vendor",  amount: 127000, since: "2026-06-17", daysOld:  26, direction: "pay",     timeline: null },
  { id: "f020", name: "Sunil Karigar Works",    type: "Karigar", amount:  43000, since: "2026-06-18", daysOld:  25, direction: "pay",     timeline: null },
  { id: "f021", name: "Nagpur Gold House",      type: "Client",  amount: 360000, since: "2026-06-19", daysOld:  24, direction: "receive", timeline: null },
  { id: "f022", name: "Diamond & Gold Impex",   type: "Vendor",  amount: 420000, since: "2026-06-20", daysOld:  23, direction: "pay",     timeline: null },
  { id: "f023", name: "Prakash Karigar",        type: "Karigar", amount:  28000, since: "2026-06-21", daysOld:  22, direction: "pay",     timeline: null },
  { id: "f024", name: "Savita Jewellery",       type: "Client",  amount:  95000, since: "2026-06-22", daysOld:  21, direction: "receive", timeline: null },
  { id: "f025", name: "Premium Gold Alloys",    type: "Vendor",  amount: 165000, since: "2026-06-23", daysOld:  20, direction: "pay",     timeline: null },
  { id: "f026", name: "Mohan Karigar",          type: "Karigar", amount:  19500, since: "2026-06-24", daysOld:  19, direction: "pay",     timeline: null },
  { id: "f027", name: "Punit Fine Jewels",      type: "Client",  amount: 278000, since: "2026-06-25", daysOld:  18, direction: "receive", timeline: null },
  { id: "f028", name: "Raj Metal Mart",         type: "Vendor",  amount:  74000, since: "2026-06-26", daysOld:  17, direction: "pay",     timeline: null },
  { id: "f029", name: "Lakshmi Karigar Group",  type: "Karigar", amount:  36500, since: "2026-06-27", daysOld:  16, direction: "pay",     timeline: null },
  { id: "f030", name: "Vishal Gold Traders",    type: "Client",  amount: 510000, since: "2026-06-28", daysOld:  15, direction: "receive", timeline: null },
  { id: "f031", name: "Kohinoor Suppliers",     type: "Vendor",  amount: 385000, since: "2026-06-29", daysOld:  14, direction: "pay",     timeline: null },
  { id: "f032", name: "Bharat Karigar Shed",    type: "Karigar", amount:  22000, since: "2026-06-30", daysOld:  13, direction: "pay",     timeline: null },
  { id: "f033", name: "Anand Ornament House",   type: "Client",  amount: 148000, since: "2026-07-01", daysOld:  12, direction: "receive", timeline: null },
  { id: "f034", name: "Sunrise Bullion Co",     type: "Vendor",  amount: 215000, since: "2026-07-02", daysOld:  11, direction: "pay",     timeline: null },
  { id: "f035", name: "Dilip Karigar",          type: "Karigar", amount:  47500, since: "2026-07-03", daysOld:  10, direction: "pay",     timeline: null },
  { id: "f036", name: "Mittal Fine Gold",       type: "Client",  amount: 325000, since: "2026-07-04", daysOld:   9, direction: "receive", timeline: null },
  { id: "f037", name: "Evershine Metal Works",  type: "Vendor",  amount:  98000, since: "2026-07-05", daysOld:   8, direction: "pay",     timeline: null },
  { id: "f038", name: "Santosh Karigar",        type: "Karigar", amount:  15000, since: "2026-07-06", daysOld:   7, direction: "pay",     timeline: null },
  { id: "f039", name: "Crystal Jewel Palace",   type: "Client",  amount: 195000, since: "2026-07-07", daysOld:   6, direction: "receive", timeline: null },
  { id: "f040", name: "Shree Gold Refiners",    type: "Vendor",  amount: 275000, since: "2026-07-08", daysOld:   5, direction: "pay",     timeline: null },
];
