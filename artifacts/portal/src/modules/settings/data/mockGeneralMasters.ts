// ── Jewellery Categories ──────────────────────────────────────────────────────
export interface JewelleryCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "Active" | "Inactive";
}

export const mockJewelleryCategories: JewelleryCategory[] = [
  { id: "jc1", name: "Gold Jewellery",    code: "GJ", description: "All gold jewellery items",       status: "Active" },
  { id: "jc2", name: "Diamond Jewellery", code: "DJ", description: "Diamond studded jewellery",      status: "Active" },
];

// ── Jewellery Types ───────────────────────────────────────────────────────────
export interface JewelleryTypeItem {
  id: string;
  name: string;
  code: string;
  category_id: string;
  description: string;
  status: "Active" | "Inactive";
}

export const mockJewelleryTypes: JewelleryTypeItem[] = [
  { id: "jt1",  name: "Necklace",         code: "NEC",  category_id: "jc1", description: "Gold necklaces and chains",    status: "Active"   },
  { id: "jt2",  name: "Bangles",          code: "BNG",  category_id: "jc1", description: "Gold bangles and bracelets",   status: "Active"   },
  { id: "jt3",  name: "Rings",            code: "RNG",  category_id: "jc1", description: "Gold finger rings",            status: "Active"   },
  { id: "jt4",  name: "Earrings",         code: "EAR",  category_id: "jc1", description: "Gold earrings and studs",      status: "Active"   },
  { id: "jt5",  name: "Pendant",          code: "PND",  category_id: "jc1", description: "Gold pendants and lockets",    status: "Active"   },
  { id: "jt6",  name: "Mangalsutra",      code: "MNG",  category_id: "jc1", description: "Traditional mangalsutra",      status: "Active"   },
  { id: "jt7",  name: "Necklace",         code: "DNEC", category_id: "jc2", description: "Diamond necklaces",            status: "Active"   },
  { id: "jt8",  name: "Rings",            code: "DRG",  category_id: "jc2", description: "Diamond finger rings",         status: "Active"   },
  { id: "jt9",  name: "Earrings",         code: "DEA",  category_id: "jc2", description: "Diamond earrings",             status: "Active"   },
  { id: "jt10", name: "Pendant",          code: "DPN",  category_id: "jc2", description: "Diamond pendants",             status: "Active"   },
  { id: "jt11", name: "Bracelet",         code: "DBR",  category_id: "jc2", description: "Diamond bracelets",            status: "Inactive" },
];

// ── Shared master (Diamond Filters) ───────────────────────────────────────────
export interface GeneralMasterItem {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "Active" | "Inactive";
}

// ── Gold Purity ───────────────────────────────────────────────────────────────
export interface GoldPurityItem {
  id: string;
  karat: string;          // e.g. "24K"
  purity: number;         // percentage e.g. 99.9
  rate_per_gram: number;  // current day rate in ₹
  description: string;
  status: "Active" | "Inactive";
  created_at: string;     // ISO date string
  updated_at: string;     // ISO date string
}

export const mockGoldPurity: GoldPurityItem[] = [
  { id: "gp1", karat: "24K", purity: 99.9, rate_per_gram: 7280, description: "Purest form of gold, 999 fineness",      status: "Active", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gp2", karat: "22K", purity: 91.6, rate_per_gram: 6670, description: "Standard jewellery gold, 916 fineness",  status: "Active", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gp3", karat: "18K", purity: 75.0, rate_per_gram: 5460, description: "Diamond jewellery base, 750 fineness",   status: "Active", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gp4", karat: "14K", purity: 58.5, rate_per_gram: 4260, description: "Budget jewellery option, 585 fineness",  status: "Active", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
];

// ── Diamond Filters ───────────────────────────────────────────────────────────
export interface DiamondFilterItem {
  id: string;
  filter_type: string;   // e.g. "Shape", "Color", "Clarity", "Cut"
  filter_name: string;   // e.g. "Round Brilliant"
  filter_value: string;  // short code e.g. "RB"
  created_at: string;
  updated_at: string;
}

export const DIAMOND_FILTER_TYPES = ["Shape", "Color", "Clarity", "Cut"] as const;

export const mockDiamondFilters: DiamondFilterItem[] = [
  { id: "df1",  filter_type: "Shape",   filter_name: "Round Brilliant",        filter_value: "RB",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df2",  filter_type: "Shape",   filter_name: "Princess Cut",           filter_value: "PC",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df3",  filter_type: "Shape",   filter_name: "Emerald Cut",            filter_value: "EC",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df4",  filter_type: "Shape",   filter_name: "Oval Cut",               filter_value: "OV",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df5",  filter_type: "Shape",   filter_name: "Pear Shape",             filter_value: "PS",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df6",  filter_type: "Color",   filter_name: "Colorless D",            filter_value: "D",    created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df7",  filter_type: "Color",   filter_name: "Colorless E",            filter_value: "E",    created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df8",  filter_type: "Color",   filter_name: "Near Colorless G",       filter_value: "G",    created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df9",  filter_type: "Clarity", filter_name: "Internally Flawless",    filter_value: "IF",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df10", filter_type: "Clarity", filter_name: "Very Very Slight Incl 1",filter_value: "VVS1", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df11", filter_type: "Clarity", filter_name: "Very Slight Included 1", filter_value: "VS1",  created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df12", filter_type: "Cut",     filter_name: "Excellent",              filter_value: "EX",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df13", filter_type: "Cut",     filter_name: "Very Good",              filter_value: "VG",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "df14", filter_type: "Cut",     filter_name: "Good",                   filter_value: "GD",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
];

// ── Gold Types ────────────────────────────────────────────────────────────────
export type GoldPurityType = "Pure" | "Mixed";

export interface GoldTypeItem {
  id: string;
  type_name: string;          // e.g. "Pure Gold", "Hallmark Gold"
  purity_type: GoldPurityType;
  gold_purity_ids: string[];  // references GoldPurityItem.id
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

export const mockGoldTypes: GoldTypeItem[] = [
  { id: "gt1", type_name: "Pure Gold",      purity_type: "Pure",  gold_purity_ids: ["gp1"],             status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gt2", type_name: "Hallmark Gold",  purity_type: "Pure",  gold_purity_ids: ["gp2"],             status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gt3", type_name: "Diamond Gold",   purity_type: "Pure",  gold_purity_ids: ["gp3"],             status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gt4", type_name: "Mixed Alloy",    purity_type: "Mixed", gold_purity_ids: ["gp2", "gp3"],      status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gt5", type_name: "Budget Range",   purity_type: "Mixed", gold_purity_ids: ["gp3", "gp4"],      status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "gt6", type_name: "Multi-Karat",    purity_type: "Mixed", gold_purity_ids: ["gp1","gp2","gp3"], status: "Inactive", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
];

// ── Diamond Quality ───────────────────────────────────────────────────────────
export type DiamondQualityType = "Parcel" | "Solitaire";

export interface DiamondQualityItem {
  id: string;
  quality_name: string;      // e.g. "VVS1", "SI2", "1D"
  description: string;
  type: DiamondQualityType;  // Parcel | Solitaire
  status: "Active" | "Deactive";
  created_at: string;
  updated_at: string;
}

export const mockDiamondQualities: DiamondQualityItem[] = [
  { id: "dq1",  quality_name: "VVS1", description: "Very Very Slightly Included 1 — near flawless",        type: "Solitaire", status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq2",  quality_name: "VVS2", description: "Very Very Slightly Included 2",                        type: "Solitaire", status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq3",  quality_name: "VS1",  description: "Very Slightly Included 1 — minor inclusions",         type: "Solitaire", status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq4",  quality_name: "VS2",  description: "Very Slightly Included 2",                             type: "Solitaire", status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq5",  quality_name: "SI1",  description: "Slightly Included 1 — inclusions visible under 10x",  type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq6",  quality_name: "SI2",  description: "Slightly Included 2",                                  type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq7",  quality_name: "1D",   description: "Top quality parcel diamonds — D colour flawless",      type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq8",  quality_name: "2D",   description: "EF colour VVS parcel",                                 type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq9",  quality_name: "3D",   description: "GH colour VS parcel",                                  type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq10", quality_name: "4D",   description: "IJ colour SI parcel",                                  type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq11", quality_name: "CVD",  description: "Chemical Vapour Deposition lab-grown diamond",         type: "Parcel",    status: "Active",   created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
  { id: "dq12", quality_name: "SHADE","description": "Tinted / off-colour parcel",                         type: "Parcel",    status: "Deactive", created_at: "2024-01-01T00:00:00Z", updated_at: "2026-07-31T00:00:00Z" },
];

// ── Opening Stock ─────────────────────────────────────────────────────────────
export interface GoldOpeningItem {
  id: string;
  gold_type_id: string;     // ref GoldTypeItem.id
  opening_stock_g: number;  // grams
  opening_set: boolean;
  set_date: string | null;  // ISO date string
  notes: string;
}

export interface DiamondOpeningItem {
  id: string;
  quality_id: string;        // ref DiamondQualityItem.id
  opening_stock_ct: number;  // carats
  opening_set: boolean;
  set_date: string | null;
  notes: string;
}

export const mockGoldOpenings: GoldOpeningItem[] = [
  { id: "go1", gold_type_id: "gt1", opening_stock_g: 500.000, opening_set: true,  set_date: "2026-04-01", notes: "Opening stock from previous year"        },
  { id: "go2", gold_type_id: "gt2", opening_stock_g: 820.500, opening_set: true,  set_date: "2026-04-01", notes: "Hallmark inventory carry-forward"         },
  { id: "go3", gold_type_id: "gt3", opening_stock_g: 315.750, opening_set: true,  set_date: "2026-04-01", notes: "18K base gold for diamond jewellery"      },
  { id: "go4", gold_type_id: "gt4", opening_stock_g: 0,       opening_set: false, set_date: null,         notes: ""                                         },
  { id: "go5", gold_type_id: "gt5", opening_stock_g: 0,       opening_set: false, set_date: null,         notes: ""                                         },
  { id: "go6", gold_type_id: "gt6", opening_stock_g: 0,       opening_set: false, set_date: null,         notes: ""                                         },
];

export const mockDiamondOpenings: DiamondOpeningItem[] = [
  { id: "do1",  quality_id: "dq1",  opening_stock_ct: 25.50, opening_set: true,  set_date: "2026-04-01", notes: "VVS1 solitaires carried from FY25"  },
  { id: "do2",  quality_id: "dq2",  opening_stock_ct: 18.25, opening_set: true,  set_date: "2026-04-01", notes: ""                                   },
  { id: "do3",  quality_id: "dq3",  opening_stock_ct: 42.00, opening_set: true,  set_date: "2026-04-01", notes: "VS1 stock from supplier consignment" },
  { id: "do4",  quality_id: "dq4",  opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do5",  quality_id: "dq5",  opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do6",  quality_id: "dq6",  opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do7",  quality_id: "dq7",  opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do8",  quality_id: "dq8",  opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do9",  quality_id: "dq9",  opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do10", quality_id: "dq10", opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do11", quality_id: "dq11", opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
  { id: "do12", quality_id: "dq12", opening_stock_ct: 0,     opening_set: false, set_date: null,         notes: ""                                   },
];

export type GeneralMasterType = "category" | "type" | "purity" | "diamond" | "quality";
