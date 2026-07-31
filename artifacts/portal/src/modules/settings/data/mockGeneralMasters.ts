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

// ── Shared master (Gold Purity, Diamond Filters) ──────────────────────────────
export interface GeneralMasterItem {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "Active" | "Inactive";
}

export const mockGoldPurity: GeneralMasterItem[] = [
  { id: "gp1", name: "24K (999)", code: "24K", description: "99.9% pure gold",  status: "Active" },
  { id: "gp2", name: "22K (916)", code: "22K", description: "91.6% pure gold",  status: "Active" },
  { id: "gp3", name: "18K (750)", code: "18K", description: "75% pure gold",    status: "Active" },
  { id: "gp4", name: "14K (585)", code: "14K", description: "58.5% pure gold",  status: "Active" },
];

export const mockDiamondFilters: GeneralMasterItem[] = [
  { id: "df1", name: "Round Brilliant", code: "RB", description: "Classic round cut",         status: "Active"   },
  { id: "df2", name: "Princess Cut",    code: "PC", description: "Square princess cut",        status: "Active"   },
  { id: "df3", name: "Emerald Cut",     code: "EC", description: "Step-cut emerald shape",     status: "Active"   },
  { id: "df4", name: "Oval Cut",        code: "OV", description: "Elongated oval shape",       status: "Active"   },
  { id: "df5", name: "Pear Shape",      code: "PS", description: "Teardrop shape",             status: "Inactive" },
];

export type GeneralMasterType = "category" | "type" | "purity" | "diamond";
