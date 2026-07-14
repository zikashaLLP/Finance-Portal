export interface Karigar {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";
export type BillingStatus = "PENDING BILL" | "BILLED" | "PAID";
export type JewelleryType = "Gold Jewellery" | "Silver Jewellery" | "Diamond Jewellery";
export type GoldKarat = "14K" | "18K" | "20K" | "22K" | "24K";
export type GoldColor = "Yellow" | "White" | "Rose";

export interface KarigarOrder {
  id: string;
  orderNumber: string;
  karigarId: string;
  karigarName: string;
  client: string;
  jewelleryType: JewelleryType;
  itemType: string;
  itemName: string;
  goldWeight: number;
  diamond: number;
  goldKarat: GoldKarat;
  goldColor: GoldColor;
  labourPerGram: number;
  totalBudget: number;
  status: OrderStatus;
  billingStatus: BillingStatus;
  completionDate: string;
  description?: string;
}

export type DiamondQuality = "CVD" | "2D" | "3D" | "Natural";
export type DiamondStatus = "COMPLETED" | "OVER RECEIVED" | "PENDING";

export interface DiamondRecord {
  id: string;
  karigarName: string;
  orderNumber: string;
  client: string;
  quality: DiamondQuality;
  issueWeight: number;
  receivedWeight: number;
  balanceWeight: number;
  issueDate: string;
  status: DiamondStatus;
}

export const mockKarigars: Karigar[] = [
  { id: "k1", name: "DILIP BHAI SURAT", phone: "+91 98765 43210", address: "Surat, Gujarat" },
  { id: "k2", name: "BHAGIRATH DADA", phone: "+91 97654 32109", address: "Ahmedabad, Gujarat" },
  { id: "k3", name: "NOT FIX KAREIGAR", phone: "-", address: "-" },
  { id: "k4", name: "AMRESH DADA", phone: "+91 96543 21098", address: "Mumbai, Maharashtra" },
  { id: "k5", name: "NITIN KARIGAR UNIQUE", phone: "+91 95432 10987", address: "Jaipur, Rajasthan" },
  { id: "k6", name: "HIRANMAY DADA", phone: "+91 94321 09876", address: "Kolkata, West Bengal" },
];

export const mockOrders: KarigarOrder[] = [
  { id: "o1",  orderNumber: "#1519", karigarId: "k6", karigarName: "HIRANMAY DADA", client: "Divya Reddy", jewelleryType: "Diamond Jewellery", itemType: "Necklace", itemName: "Nose pin 2,3,4 ct",      goldWeight: 1.000, diamond: 0.090, goldKarat: "22K", goldColor: "Yellow", labourPerGram: 120, totalBudget: 25000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o2",  orderNumber: "#1514", karigarId: "k6", karigarName: "HIRANMAY DADA", client: "Custom Client",  jewelleryType: "Gold Jewellery",    itemType: "Pendant", itemName: "Oval + Cushion Pendant",   goldWeight: 1.000, diamond: 0,     goldKarat: "18K", goldColor: "White", labourPerGram: 150, totalBudget: 18000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o3",  orderNumber: "#1513", karigarId: "k6", karigarName: "HIRANMAY DADA", client: "Custom Client",  jewelleryType: "Gold Jewellery",    itemType: "Pendant", itemName: "Vea Pendant + Chain",       goldWeight: 4.998, diamond: 0,     goldKarat: "22K", goldColor: "Yellow", labourPerGram: 100, totalBudget: 55000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o4",  orderNumber: "#1512", karigarId: "k6", karigarName: "HIRANMAY DADA", client: "Custom Client",  jewelleryType: "Gold Jewellery",    itemType: "Pendant", itemName: "Neev Pendant",              goldWeight: 2.000, diamond: 0,     goldKarat: "18K", goldColor: "Rose",   labourPerGram: 130, totalBudget: 22000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o5",  orderNumber: "#1511", karigarId: "k6", karigarName: "HIRANMAY DADA", client: "Custom Client",  jewelleryType: "Gold Jewellery",    itemType: "Ring",    itemName: "Rubi Ring",                 goldWeight: 7.500, diamond: 0,     goldKarat: "22K", goldColor: "Yellow", labourPerGram: 90,  totalBudget: 82000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o6",  orderNumber: "#1510", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "SJ STOCK",   jewelleryType: "Gold Jewellery",    itemType: "Necklace_set", itemName: "SJ Stock Karigar Itm",  goldWeight: 3.200, diamond: 0,     goldKarat: "22K", goldColor: "Yellow", labourPerGram: 85,  totalBudget: 34000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o7",  orderNumber: "#1509", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "SJ STOCK",   jewelleryType: "Gold Jewellery",    itemType: "Necklace_set", itemName: "SJ Stock Karigar Itm",  goldWeight: 2.800, diamond: 0,     goldKarat: "22K", goldColor: "Yellow", labourPerGram: 85,  totalBudget: 29000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o8",  orderNumber: "#1508", karigarId: "k4", karigarName: "AMRESH DADA", client: "Meena Shah",      jewelleryType: "Diamond Jewellery", itemType: "Ring",    itemName: "Solitaire Ring",            goldWeight: 2.100, diamond: 0.250, goldKarat: "18K", goldColor: "White", labourPerGram: 200, totalBudget: 45000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "15/7/2026" },
  { id: "o9",  orderNumber: "#1507", karigarId: "k2", karigarName: "BHAGIRATH DADA", client: "Priya Joshi",  jewelleryType: "Gold Jewellery",    itemType: "Bangle",  itemName: "Gold Bangle Pair",          goldWeight: 12.500, diamond: 0,    goldKarat: "22K", goldColor: "Yellow", labourPerGram: 70, totalBudget: 135000, status: "PENDING",  billingStatus: "PENDING BILL", completionDate: "16/7/2026" },
  { id: "o10", orderNumber: "#1506", karigarId: "k5", karigarName: "NITIN KARIGAR UNIQUE", client: "Custom Client", jewelleryType: "Gold Jewellery", itemType: "Earrings", itemName: "Jhumka Set",        goldWeight: 5.800, diamond: 0,     goldKarat: "22K", goldColor: "Yellow", labourPerGram: 95,  totalBudget: 63000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "17/7/2026" },
  { id: "o11", orderNumber: "#1505", karigarId: "k3", karigarName: "NOT FIX KAREIGAR", client: "Custom Client", jewelleryType: "Silver Jewellery", itemType: "Chain",  itemName: "Silver Chain 24 inch",    goldWeight: 0,     diamond: 0,     goldKarat: "22K", goldColor: "Yellow", labourPerGram: 40,  totalBudget: 8000,  status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "18/7/2026" },
  { id: "o12", orderNumber: "#1504", karigarId: "k6", karigarName: "HIRANMAY DADA", client: "Sunita Patel",   jewelleryType: "Diamond Jewellery", itemType: "Bracelet", itemName: "Tennis Bracelet",         goldWeight: 6.200, diamond: 1.200, goldKarat: "18K", goldColor: "White", labourPerGram: 250, totalBudget: 125000, status: "PENDING",  billingStatus: "PENDING BILL", completionDate: "20/7/2026" },
  { id: "o13", orderNumber: "#1503", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "Anjali Singh", jewelleryType: "Gold Jewellery",   itemType: "Mangalsutra", itemName: "Traditional Mangalsutra", goldWeight: 8.000, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 75, totalBudget: 88000, status: "PENDING",   billingStatus: "PENDING BILL", completionDate: "21/7/2026" },
  // Executed orders
  { id: "o14", orderNumber: "1525", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "Divya Reddy company", jewelleryType: "Gold Jewellery", itemType: "Necklace_set", itemName: "Necklace Set Deluxe", goldWeight: 18.000, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 80,  totalBudget: 195000, status: "COMPLETED", billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o15", orderNumber: "1521", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "SJ STOCK",    jewelleryType: "Gold Jewellery",    itemType: "Necklace_set", itemName: "SJ Stock (Karigar Itm)", goldWeight: 4.500, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 85,  totalBudget: 48000, status: "COMPLETED", billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o16", orderNumber: "1522", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "SJ STOCK",    jewelleryType: "Gold Jewellery",    itemType: "Necklace_set", itemName: "SJ Stock (Karigar Itm)", goldWeight: 3.800, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 85,  totalBudget: 41000, status: "COMPLETED", billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o17", orderNumber: "1523", karigarId: "k1", karigarName: "DILIP BHAI SURAT", client: "SJ STOCK",    jewelleryType: "Gold Jewellery",    itemType: "Necklace_set", itemName: "SJ Stock (Karigar Itm)", goldWeight: 5.100, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 85,  totalBudget: 55000, status: "COMPLETED", billingStatus: "PENDING BILL", completionDate: "14/7/2026" },
  { id: "o18", orderNumber: "1518", karigarId: "k4", karigarName: "AMRESH DADA", client: "Reena Mehta",      jewelleryType: "Diamond Jewellery", itemType: "Ring",    itemName: "Solitaire Engagement Ring", goldWeight: 3.000, diamond: 0.500, goldKarat: "18K", goldColor: "White", labourPerGram: 220, totalBudget: 78000, status: "COMPLETED", billingStatus: "BILLED",       completionDate: "12/7/2026" },
  { id: "o19", orderNumber: "1516", karigarId: "k2", karigarName: "BHAGIRATH DADA", client: "Pooja Shah",    jewelleryType: "Gold Jewellery",    itemType: "Bangle",  itemName: "Kangan Set",                goldWeight: 10.200, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 72, totalBudget: 110000, status: "COMPLETED", billingStatus: "PAID",         completionDate: "10/7/2026" },
  { id: "o20", orderNumber: "1515", karigarId: "k5", karigarName: "NITIN KARIGAR UNIQUE", client: "Custom Client", jewelleryType: "Gold Jewellery", itemType: "Earrings", itemName: "Chandbali Set",          goldWeight: 6.400, diamond: 0,   goldKarat: "22K", goldColor: "Yellow", labourPerGram: 92,  totalBudget: 70000, status: "COMPLETED", billingStatus: "PENDING BILL", completionDate: "10/7/2026" },
];

export const mockDiamondRecords: DiamondRecord[] = [
  { id: "d1",  karigarName: "DILIP BHAI SURAT", orderNumber: "1525", client: "Divya Reddy company", quality: "CVD",     issueWeight: 3.170, receivedWeight: 3.170, balanceWeight: 0.000,  issueDate: "14/7/2026", status: "COMPLETED" },
  { id: "d2",  karigarName: "DILIP BHAI SURAT", orderNumber: "1524", client: "SJ STOCK",            quality: "2D",      issueWeight: 0.020, receivedWeight: 0.030, balanceWeight: -0.010, issueDate: "14/7/2026", status: "OVER RECEIVED" },
  { id: "d3",  karigarName: "DILIP BHAI SURAT", orderNumber: "1523", client: "SJ STOCK",            quality: "2D",      issueWeight: 0.050, receivedWeight: 0.050, balanceWeight: 0.000,  issueDate: "14/7/2026", status: "COMPLETED" },
  { id: "d4",  karigarName: "HIRANMAY DADA",    orderNumber: "1519", client: "Divya Reddy",         quality: "CVD",     issueWeight: 0.090, receivedWeight: 0.000, balanceWeight: 0.090,  issueDate: "14/7/2026", status: "PENDING" },
  { id: "d5",  karigarName: "AMRESH DADA",      orderNumber: "1518", client: "Reena Mehta",         quality: "Natural", issueWeight: 0.500, receivedWeight: 0.500, balanceWeight: 0.000,  issueDate: "12/7/2026", status: "COMPLETED" },
  { id: "d6",  karigarName: "HIRANMAY DADA",    orderNumber: "1512", client: "Custom Client",       quality: "CVD",     issueWeight: 1.200, receivedWeight: 0.000, balanceWeight: 1.200,  issueDate: "10/7/2026", status: "PENDING" },
  { id: "d7",  karigarName: "NITIN KARIGAR UNIQUE", orderNumber: "1508", client: "Sunita Patel",    quality: "3D",      issueWeight: 0.800, receivedWeight: 0.800, balanceWeight: 0.000,  issueDate: "08/7/2026", status: "COMPLETED" },
  { id: "d8",  karigarName: "BHAGIRATH DADA",   orderNumber: "1506", client: "Priya Joshi",         quality: "CVD",     issueWeight: 0.350, receivedWeight: 0.360, balanceWeight: -0.010, issueDate: "06/7/2026", status: "OVER RECEIVED" },
  { id: "d9",  karigarName: "DILIP BHAI SURAT", orderNumber: "1504", client: "Anjali Singh",        quality: "Natural", issueWeight: 2.000, receivedWeight: 1.800, balanceWeight: 0.200,  issueDate: "05/7/2026", status: "PENDING" },
  { id: "d10", karigarName: "AMRESH DADA",      orderNumber: "1502", client: "Meena Shah",          quality: "2D",      issueWeight: 0.150, receivedWeight: 0.150, balanceWeight: 0.000,  issueDate: "03/7/2026", status: "COMPLETED" },
];
