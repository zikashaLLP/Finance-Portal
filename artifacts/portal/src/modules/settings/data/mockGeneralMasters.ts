export interface GeneralMasterItem {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "Active" | "Inactive";
}

export const mockJewelleryCategories: GeneralMasterItem[] = [
  { id: "jc1", name: "Necklace", code: "NEC", description: "All necklace types", status: "Active" },
  { id: "jc2", name: "Bangles", code: "BNG", description: "Bangles and bracelets", status: "Active" },
  { id: "jc3", name: "Rings", code: "RNG", description: "Finger rings", status: "Active" },
  { id: "jc4", name: "Earrings", code: "EAR", description: "Earrings and studs", status: "Active" },
  { id: "jc5", name: "Pendant", code: "PND", description: "Pendants and lockets", status: "Inactive" },
];

export const mockJewelleryTypes: GeneralMasterItem[] = [
  { id: "jt1", name: "Plain Gold", code: "PG", description: "Plain gold jewellery without stones", status: "Active" },
  { id: "jt2", name: "Diamond Studded", code: "DS", description: "Gold jewellery with diamonds", status: "Active" },
  { id: "jt3", name: "Kundan", code: "KN", description: "Traditional Kundan jewellery", status: "Active" },
  { id: "jt4", name: "Meenakari", code: "MK", description: "Enamel work jewellery", status: "Active" },
];

export const mockGoldPurity: GeneralMasterItem[] = [
  { id: "gp1", name: "24K (999)", code: "24K", description: "99.9% pure gold", status: "Active" },
  { id: "gp2", name: "22K (916)", code: "22K", description: "91.6% pure gold", status: "Active" },
  { id: "gp3", name: "18K (750)", code: "18K", description: "75% pure gold", status: "Active" },
  { id: "gp4", name: "14K (585)", code: "14K", description: "58.5% pure gold", status: "Active" },
];

export const mockDiamondFilters: GeneralMasterItem[] = [
  { id: "df1", name: "Round Brilliant", code: "RB", description: "Classic round cut", status: "Active" },
  { id: "df2", name: "Princess Cut", code: "PC", description: "Square princess cut", status: "Active" },
  { id: "df3", name: "Emerald Cut", code: "EC", description: "Step-cut emerald shape", status: "Active" },
  { id: "df4", name: "Oval Cut", code: "OV", description: "Elongated oval shape", status: "Active" },
  { id: "df5", name: "Pear Shape", code: "PS", description: "Teardrop shape", status: "Inactive" },
];

export type GeneralMasterType = "category" | "type" | "purity" | "diamond";
