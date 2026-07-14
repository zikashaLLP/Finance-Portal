export type StockStatus   = "available" | "sold";
export type StockSource   = "purchased" | "karigar" | "opening_stock";
export type StockCategory = "Gold Jewellery" | "Diamond Jewellery";

export interface StockItem {
  id: string;
  stockId: string;
  category: StockCategory;
  itemName: string;
  goldWeight: number;
  diamondWeight: number;
  karat?: string;
  source: StockSource;
  sourceLot?: string;
  value: number;
  status: StockStatus;
  comment?: string;
  imageUrl?: string;
}

export const GOLD_STOCK: StockItem[] = [
  { id:"g1",  stockId:"20738",    category:"Gold Jewellery", itemName:"CHAIN",                                     goldWeight:4.190, diamondWeight:0,     karat:"18K", source:"purchased",    value:0,       status:"sold",      comment:""       },
  { id:"g2",  stockId:"GJ18/1011",category:"Gold Jewellery", itemName:"SQUARE ER - VISHAL BHAI C/O HEMALI MAM",   goldWeight:3.550, diamondWeight:0.960, karat:"18K", source:"karigar",      value:3358,    status:"available", comment:""       },
  { id:"g3",  stockId:"GP22/1001",category:"Gold Jewellery", itemName:"PENDANT - SUSHMA GUPTA",                   goldWeight:2.180, diamondWeight:0,     karat:"22K", source:"karigar",      value:3270,    status:"available", comment:""       },
  { id:"g4",  stockId:"GJ22/1019",category:"Gold Jewellery", itemName:"LETTERS - SUSHMA GUPTA",                   goldWeight:2.930, diamondWeight:0,     karat:"22K", source:"karigar",      value:4395,    status:"available", comment:""       },
  { id:"g5",  stockId:"CH18/2049",category:"Gold Jewellery", itemName:"MANGALSUTRA CHAIN",                        goldWeight:7.800, diamondWeight:0,     karat:"18K", source:"opening_stock", value:0,       status:"available", comment:""       },
  { id:"g6",  stockId:"ER18/188", category:"Gold Jewellery", itemName:"EARING",                                   goldWeight:0.970, diamondWeight:0.130, karat:"18K", source:"opening_stock", value:0,       status:"available", comment:"1PC ER" },
  { id:"g7",  stockId:"GJ22/1018",category:"Gold Jewellery", itemName:"BHAGWAN PHOTO - DARSHANA DIDI",            goldWeight:9.960, diamondWeight:0,     karat:"22K", source:"karigar",      value:4770,    status:"sold",      comment:""       },
  { id:"g8",  stockId:"20717",    category:"Gold Jewellery", itemName:"CHAIN",                                     goldWeight:4.540, diamondWeight:0,     karat:"18K", source:"purchased",    value:0,       status:"sold",      comment:""       },
  { id:"g9",  stockId:"20712",    category:"Gold Jewellery", itemName:"BACCHA KADI",                              goldWeight:7.670, diamondWeight:0,     karat:"18K", source:"purchased",    value:0,       status:"sold",      comment:""       },
  { id:"g10", stockId:"GJ22/1017",category:"Gold Jewellery", itemName:"TARKISH NK ER - BENNY SIR",               goldWeight:29.990,diamondWeight:0,     karat:"22K", source:"karigar",      value:29990,   status:"sold",      comment:""       },
  { id:"g11", stockId:"GN18/1000",category:"Gold Jewellery", itemName:"SQUARE VALA 5 PC CHAIN + ER - VISHAL BHAI C/O HEMALI MAM", goldWeight:7.160, diamondWeight:0, karat:"18K", source:"karigar", value:6480, status:"sold", comment:"" },
  { id:"g12", stockId:"GJ22/1016",category:"Gold Jewellery", itemName:"PINK STONE WALA - DIVYA REDDY COMPANY",   goldWeight:6.270, diamondWeight:0,     karat:"22K", source:"karigar",      value:6160,    status:"sold",      comment:""       },
  { id:"g13", stockId:"20686",    category:"Gold Jewellery", itemName:"CHAIN OAK 43",                             goldWeight:7.110, diamondWeight:0,     karat:"22K", source:"purchased",    value:0,       status:"sold",      comment:""       },
  { id:"g14", stockId:"20670",    category:"Gold Jewellery", itemName:"CHAIN 18KT",                               goldWeight:2.180, diamondWeight:0,     karat:"18K", source:"purchased",    value:29051,   status:"sold",      comment:""       },
  { id:"g15", stockId:"20641",    category:"Gold Jewellery", itemName:"CHINTAN SIR CHAIN",                        goldWeight:13.830,diamondWeight:0,     karat:"22K", source:"purchased",    value:179484,  status:"sold",      comment:""       },
  { id:"g16", stockId:"GJ22/1015",category:"Gold Jewellery", itemName:"NECKLACE SET - MAHAK MAM",                goldWeight:16.000,diamondWeight:0,     karat:"22K", source:"karigar",      value:15200,   status:"available", comment:""       },
  { id:"g17", stockId:"GJ22/1014",category:"Gold Jewellery", itemName:"NATH LOT - SJ STOCK",                     goldWeight:5.000, diamondWeight:0,     karat:"22K", source:"karigar",      value:4750,    status:"available", comment:""       },
  { id:"g18", stockId:"GJ18/1010",category:"Gold Jewellery", itemName:"PENDANT - OVAL CUSHION",                  goldWeight:1.000, diamondWeight:0,     karat:"18K", source:"karigar",      value:1200,    status:"available", comment:""       },
  { id:"g19", stockId:"20598",    category:"Gold Jewellery", itemName:"TANMANIYA",                                goldWeight:5.440, diamondWeight:0,     karat:"22K", source:"purchased",    value:0,       status:"sold",      comment:""       },
  { id:"g20", stockId:"20555",    category:"Gold Jewellery", itemName:"KADI BRACELET",                            goldWeight:8.220, diamondWeight:0,     karat:"22K", source:"purchased",    value:0,       status:"sold",      comment:""       },
];

export const DIAMOND_STOCK: StockItem[] = [
  { id:"d1",  stockId:"DJ18/501",  category:"Diamond Jewellery", itemName:"SOLITAIRE RING - CVD 2CT",             goldWeight:3.200, diamondWeight:2.000, karat:"18K", source:"karigar",      value:95000,   status:"available", comment:""       },
  { id:"d2",  stockId:"DJ18/502",  category:"Diamond Jewellery", itemName:"TENNIS BRACELET",                      goldWeight:8.500, diamondWeight:4.500, karat:"18K", source:"karigar",      value:280000,  status:"sold",      comment:""       },
  { id:"d3",  stockId:"DJ18/503",  category:"Diamond Jewellery", itemName:"NOSE PIN - ANJALI",                    goldWeight:0.420, diamondWeight:0.120, karat:"18K", source:"karigar",      value:8400,    status:"available", comment:""       },
  { id:"d4",  stockId:"DJ18/504",  category:"Diamond Jewellery", itemName:"PENDANT - DIVYA REDDY",                goldWeight:1.800, diamondWeight:0.750, karat:"18K", source:"karigar",      value:32000,   status:"sold",      comment:""       },
  { id:"d5",  stockId:"DJ22/201",  category:"Diamond Jewellery", itemName:"SQUARE EARRINGS - HEMALI MAM",         goldWeight:3.550, diamondWeight:0.960, karat:"18K", source:"karigar",      value:42000,   status:"available", comment:""       },
  { id:"d6",  stockId:"DJ18/505",  category:"Diamond Jewellery", itemName:"BANGLE SET - NATURAL DIAMOND",         goldWeight:22.000,diamondWeight:8.000, karat:"18K", source:"karigar",      value:560000,  status:"available", comment:""       },
  { id:"d7",  stockId:"DJ18/506",  category:"Diamond Jewellery", itemName:"RING - PAVÉ SET",                      goldWeight:4.200, diamondWeight:1.200, karat:"18K", source:"karigar",      value:67000,   status:"sold",      comment:""       },
  { id:"d8",  stockId:"DJ18/507",  category:"Diamond Jewellery", itemName:"MANGALSUTRA - CVD",                    goldWeight:7.800, diamondWeight:0.500, karat:"18K", source:"opening_stock", value:0,       status:"available", comment:""       },
  { id:"d9",  stockId:"DJ18/508",  category:"Diamond Jewellery", itemName:"EARRING DROPS - TANMAY SIR",           goldWeight:3.500, diamondWeight:1.200, karat:"18K", source:"karigar",      value:38000,   status:"available", comment:""       },
  { id:"d10", stockId:"DJ14/101",  category:"Diamond Jewellery", itemName:"BRACELET - DARSHANA DIDI",             goldWeight:14.002,diamondWeight:1.200, karat:"14K", source:"karigar",      value:620000,  status:"sold",      comment:""       },
];
