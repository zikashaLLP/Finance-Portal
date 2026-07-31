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

export type GeneralMasterType = "category" | "type" | "purity" | "diamond";
