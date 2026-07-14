export type TeamRole = "Owner" | "Accounts Team" | "Karigar Team" | "Sales Team";

export interface TeamMember {
  id: string;
  fullName: string;
  username: string;
  role: TeamRole;
  email?: string;
  phone?: string;
  joinedAt: string;
}

export const mockTeamMembers: TeamMember[] = [];

export const ROLES: TeamRole[] = ["Owner", "Accounts Team", "Karigar Team", "Sales Team"];

export const ROLE_META: Record<TeamRole, { color: string; bg: string; initials: string }> = {
  "Owner":         { color: "#7C3AED", bg: "#EDE9FE", initials: "O" },
  "Accounts Team": { color: "#2563EB", bg: "#DBEAFE", initials: "A" },
  "Karigar Team":  { color: "#EA580C", bg: "#FFEDD5", initials: "K" },
  "Sales Team":    { color: "#16A34A", bg: "#DCFCE7", initials: "S" },
};
