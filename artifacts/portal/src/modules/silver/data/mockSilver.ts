export type SilverType = "Pure Silver" | "Silver Jewelry";
export type SilverCategory = "Purchase" | "Sale";
export type PaymentMode = "Cash" | "Bank Transfer" | "UPI" | "Cheque";

export interface SilverTransaction {
  id: string;
  date: string;
  type: SilverType;
  category: SilverCategory;
  weight: number;
  purity: string;
  rate: number;
  amount: number;
  paymentMode: PaymentMode;
  vendor: string;
  description: string;
}

export const mockSilverTransactions: SilverTransaction[] = [
  { id: "st1",  date: "2026-06-25", type: "Pure Silver",    category: "Purchase", weight: 500.0,  purity: "999", rate: 95,  amount: 47500,  paymentMode: "Bank Transfer", vendor: "National Silver Co.",      description: "Monthly bulk silver purchase" },
  { id: "st2",  date: "2026-06-25", type: "Silver Jewelry", category: "Sale",     weight: 85.5,   purity: "925", rate: 110, amount: 9405,   paymentMode: "UPI",           vendor: "Walk-in Customer",         description: "Necklace & earring set" },
  { id: "st3",  date: "2026-06-24", type: "Pure Silver",    category: "Sale",     weight: 200.0,  purity: "999", rate: 97,  amount: 19400,  paymentMode: "Bank Transfer", vendor: "Sunrise Exports",          description: "Wholesale supply order" },
  { id: "st4",  date: "2026-06-24", type: "Silver Jewelry", category: "Purchase", weight: 120.0,  purity: "925", rate: 88,  amount: 10560,  paymentMode: "Cash",          vendor: "Artisan Crafts Mumbai",    description: "Handcrafted bangles lot" },
  { id: "st5",  date: "2026-06-23", type: "Pure Silver",    category: "Purchase", weight: 1000.0, purity: "999", rate: 94,  amount: 94000,  paymentMode: "Cheque",        vendor: "Bombay Bullion House",     description: "Large stock refill" },
  { id: "st6",  date: "2026-06-23", type: "Silver Jewelry", category: "Sale",     weight: 42.0,   purity: "925", rate: 115, amount: 4830,   paymentMode: "UPI",           vendor: "Retail Counter",           description: "Silver anklets pair" },
  { id: "st7",  date: "2026-06-22", type: "Pure Silver",    category: "Sale",     weight: 300.0,  purity: "999", rate: 96,  amount: 28800,  paymentMode: "Bank Transfer", vendor: "Mehta Silver Traders",     description: "Industrial silver supply" },
  { id: "st8",  date: "2026-06-22", type: "Silver Jewelry", category: "Purchase", weight: 65.0,   purity: "925", rate: 90,  amount: 5850,   paymentMode: "Cash",          vendor: "Rajkot Jewellery Works",   description: "Filigree work pieces" },
  { id: "st9",  date: "2026-06-21", type: "Pure Silver",    category: "Purchase", weight: 750.0,  purity: "999", rate: 93,  amount: 69750,  paymentMode: "Bank Transfer", vendor: "National Silver Co.",      description: "Weekend stock refill" },
  { id: "st10", date: "2026-06-21", type: "Silver Jewelry", category: "Sale",     weight: 110.0,  purity: "925", rate: 112, amount: 12320,  paymentMode: "UPI",           vendor: "Corporate Gift Order",     description: "Silver trophy sets" },
  { id: "st11", date: "2026-06-20", type: "Pure Silver",    category: "Sale",     weight: 150.0,  purity: "999", rate: 95,  amount: 14250,  paymentMode: "Cheque",        vendor: "Patel Exports Ltd",        description: "Export consignment" },
  { id: "st12", date: "2026-06-20", type: "Silver Jewelry", category: "Purchase", weight: 95.0,   purity: "925", rate: 87,  amount: 8265,   paymentMode: "Bank Transfer", vendor: "Kolkata Silversmiths",     description: "Antique finish items" },
  { id: "st13", date: "2026-06-19", type: "Pure Silver",    category: "Purchase", weight: 600.0,  purity: "999", rate: 92,  amount: 55200,  paymentMode: "Bank Transfer", vendor: "Bombay Bullion House",     description: "Festive season stocking" },
  { id: "st14", date: "2026-06-19", type: "Silver Jewelry", category: "Sale",     weight: 55.0,   purity: "925", rate: 118, amount: 6490,   paymentMode: "Cash",          vendor: "Walk-in Customer",         description: "Silver chain & pendant" },
  { id: "st15", date: "2026-06-18", type: "Pure Silver",    category: "Sale",     weight: 400.0,  purity: "999", rate: 96,  amount: 38400,  paymentMode: "Bank Transfer", vendor: "Sunrise Exports",          description: "Monthly export batch" },
  { id: "st16", date: "2026-06-18", type: "Silver Jewelry", category: "Purchase", weight: 78.0,   purity: "925", rate: 89,  amount: 6942,   paymentMode: "UPI",           vendor: "Artisan Crafts Mumbai",    description: "Silver rings batch" },
  { id: "st17", date: "2026-06-17", type: "Pure Silver",    category: "Purchase", weight: 850.0,  purity: "999", rate: 94,  amount: 79900,  paymentMode: "Cheque",        vendor: "Mehta Silver Traders",     description: "Large quantity procurement" },
  { id: "st18", date: "2026-06-17", type: "Silver Jewelry", category: "Sale",     weight: 68.0,   purity: "925", rate: 114, amount: 7752,   paymentMode: "UPI",           vendor: "Retail Counter",           description: "Bracelet & cuff set" },
  { id: "st19", date: "2026-06-16", type: "Pure Silver",    category: "Sale",     weight: 250.0,  purity: "999", rate: 97,  amount: 24250,  paymentMode: "Bank Transfer", vendor: "Gujarat Metals",           description: "Institutional order" },
  { id: "st20", date: "2026-06-16", type: "Silver Jewelry", category: "Purchase", weight: 130.0,  purity: "925", rate: 91,  amount: 11830,  paymentMode: "Cash",          vendor: "Jaipur Craft House",       description: "Meenakari silver items" },
  { id: "st21", date: "2026-06-15", type: "Pure Silver",    category: "Purchase", weight: 400.0,  purity: "999", rate: 93,  amount: 37200,  paymentMode: "Bank Transfer", vendor: "National Silver Co.",      description: "Mid-month top-up" },
  { id: "st22", date: "2026-06-15", type: "Silver Jewelry", category: "Sale",     weight: 92.0,   purity: "925", rate: 116, amount: 10672,  paymentMode: "UPI",           vendor: "Wedding Season Order",     description: "Bridal jewellery set" },
  { id: "st23", date: "2026-06-14", type: "Pure Silver",    category: "Sale",     weight: 180.0,  purity: "999", rate: 95,  amount: 17100,  paymentMode: "Cheque",        vendor: "Sunrise Exports",          description: "Partial export fulfillment" },
  { id: "st24", date: "2026-06-14", type: "Silver Jewelry", category: "Purchase", weight: 50.0,   purity: "925", rate: 88,  amount: 4400,   paymentMode: "Cash",          vendor: "Rajkot Jewellery Works",   description: "Small craft pieces" },
  { id: "st25", date: "2026-06-13", type: "Pure Silver",    category: "Purchase", weight: 550.0,  purity: "999", rate: 92,  amount: 50600,  paymentMode: "Bank Transfer", vendor: "Bombay Bullion House",     description: "Routine procurement" },
  { id: "st26", date: "2026-06-13", type: "Silver Jewelry", category: "Sale",     weight: 74.0,   purity: "925", rate: 113, amount: 8362,   paymentMode: "UPI",           vendor: "Retail Counter",           description: "Mixed silver items" },
  { id: "st27", date: "2026-06-12", type: "Pure Silver",    category: "Sale",     weight: 320.0,  purity: "999", rate: 96,  amount: 30720,  paymentMode: "Bank Transfer", vendor: "Patel Exports Ltd",        description: "Export lot #3" },
  { id: "st28", date: "2026-06-12", type: "Silver Jewelry", category: "Purchase", weight: 88.0,   purity: "925", rate: 90,  amount: 7920,   paymentMode: "Cash",          vendor: "Kolkata Silversmiths",     description: "Handmade necklaces" },
  { id: "st29", date: "2026-06-11", type: "Pure Silver",    category: "Purchase", weight: 700.0,  purity: "999", rate: 93,  amount: 65100,  paymentMode: "Cheque",        vendor: "Gujarat Metals",           description: "Advance stock purchase" },
  { id: "st30", date: "2026-06-11", type: "Silver Jewelry", category: "Sale",     weight: 60.0,   purity: "925", rate: 117, amount: 7020,   paymentMode: "UPI",           vendor: "Walk-in Customer",         description: "Silver earrings set" },
  { id: "st31", date: "2026-06-10", type: "Pure Silver",    category: "Sale",     weight: 220.0,  purity: "999", rate: 94,  amount: 20680,  paymentMode: "Bank Transfer", vendor: "Mehta Silver Traders",     description: "Trade supply" },
  { id: "st32", date: "2026-06-10", type: "Silver Jewelry", category: "Purchase", weight: 105.0,  purity: "925", rate: 87,  amount: 9135,   paymentMode: "Cash",          vendor: "Jaipur Craft House",       description: "Oxidised silver items" },
  { id: "st33", date: "2026-06-09", type: "Pure Silver",    category: "Purchase", weight: 900.0,  purity: "999", rate: 91,  amount: 81900,  paymentMode: "Bank Transfer", vendor: "National Silver Co.",      description: "Large monthly order" },
  { id: "st34", date: "2026-06-09", type: "Silver Jewelry", category: "Sale",     weight: 48.0,   purity: "925", rate: 115, amount: 5520,   paymentMode: "UPI",           vendor: "Retail Counter",           description: "Silver pendant & chain" },
  { id: "st35", date: "2026-06-08", type: "Pure Silver",    category: "Sale",     weight: 500.0,  purity: "999", rate: 95,  amount: 47500,  paymentMode: "Cheque",        vendor: "Sunrise Exports",          description: "Bulk export order" },
  { id: "st36", date: "2026-06-08", type: "Silver Jewelry", category: "Purchase", weight: 72.0,   purity: "925", rate: 89,  amount: 6408,   paymentMode: "Cash",          vendor: "Artisan Crafts Mumbai",    description: "Silver bangle set" },
  { id: "st37", date: "2026-06-07", type: "Pure Silver",    category: "Purchase", weight: 450.0,  purity: "999", rate: 92,  amount: 41400,  paymentMode: "Bank Transfer", vendor: "Bombay Bullion House",     description: "Week-start stock" },
  { id: "st38", date: "2026-06-07", type: "Silver Jewelry", category: "Sale",     weight: 82.0,   purity: "925", rate: 112, amount: 9184,   paymentMode: "UPI",           vendor: "Corporate Gift Order",     description: "Silver card holder sets" },
  { id: "st39", date: "2026-06-06", type: "Pure Silver",    category: "Sale",     weight: 280.0,  purity: "999", rate: 96,  amount: 26880,  paymentMode: "Bank Transfer", vendor: "Gujarat Metals",           description: "Industrial supply" },
  { id: "st40", date: "2026-06-06", type: "Silver Jewelry", category: "Purchase", weight: 140.0,  purity: "925", rate: 91,  amount: 12740,  paymentMode: "Cash",          vendor: "Rajkot Jewellery Works",   description: "Kundan silver base pieces" },
];
