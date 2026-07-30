import { useState } from "react";
import { User, Mail, Phone, Building2, Lock, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "details" | "password";

const TABS: { id: Tab; label: string }[] = [
  { id: "details",  label: "Profile Details" },
  { id: "password", label: "Change Password"  },
];

/* ── mock logged-in user ── */
const INITIAL_USER = {
  fullName:  "Admin User",
  email:     "admin@portal.com",
  phone:     "+91 98765 43210",
  role:      "Administrator",
  branch:    "Main Branch",
  username:  "admin",
  joinedOn:  "1 Jan 2024",
};

function FieldRow({
  label, icon: Icon, value, onChange, type = "text", disabled = false, placeholder,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background",
            "focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30",
            "transition-colors placeholder:text-muted-foreground/50",
            disabled && "bg-muted/40 text-muted-foreground cursor-not-allowed",
          )}
        />
      </div>
    </div>
  );
}

function PasswordField({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-border bg-background",
            "focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30",
            "transition-colors placeholder:text-muted-foreground/50",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/* ── toast-style success banner ── */
function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("details");

  /* profile form */
  const [form, setForm]         = useState({ ...INITIAL_USER });
  const [saved, setSaved]       = useState(false);

  /* password form */
  const [pwForm, setPwForm]     = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError]   = useState("");
  const [pwSaved, setPwSaved]   = useState(false);

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (!pwForm.current) { setPwError("Enter your current password."); return; }
    if (pwForm.next.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError("New passwords do not match."); return; }
    setPwSaved(true);
    setPwForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 3000);
  }

  const avatarInitials = form.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-5">
        <div className="flex items-center gap-4 mb-5">
          {/* Avatar */}
          <div className="h-14 w-14 rounded-2xl bg-foreground flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-background">{avatarInitials}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">{form.fullName}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{form.role} · {form.branch}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px shrink-0",
                tab === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl">

        {/* ── Profile Details ── */}
        {tab === "details" && (
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow
                  label="Full Name" icon={User}
                  value={form.fullName}
                  onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
                  placeholder="Your full name"
                />
                <FieldRow
                  label="Username" icon={User}
                  value={form.username}
                  onChange={(v) => setForm((f) => ({ ...f, username: v }))}
                  placeholder="Username"
                />
                <FieldRow
                  label="Email Address" icon={Mail}
                  value={form.email} type="email"
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="email@example.com"
                />
                <FieldRow
                  label="Phone Number" icon={Phone}
                  value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">Work Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Role"        icon={User}      value={form.role}   disabled />
                <FieldRow label="Branch"      icon={Building2} value={form.branch} disabled />
                <FieldRow label="Member Since" icon={Building2} value={form.joinedOn} disabled />
              </div>
              <p className="text-xs text-muted-foreground">Role and branch are managed by your administrator.</p>
            </div>

            {saved && <SuccessBanner message="Profile updated successfully." />}

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* ── Change Password ── */}
        {tab === "password" && (
          <form onSubmit={handlePasswordSave} className="space-y-6">
            <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">Change Password</h2>
              <PasswordField
                label="Current Password"
                value={pwForm.current}
                onChange={(v) => setPwForm((f) => ({ ...f, current: v }))}
                placeholder="Enter current password"
              />
              <PasswordField
                label="New Password"
                value={pwForm.next}
                onChange={(v) => setPwForm((f) => ({ ...f, next: v }))}
                placeholder="At least 6 characters"
              />
              <PasswordField
                label="Confirm New Password"
                value={pwForm.confirm}
                onChange={(v) => setPwForm((f) => ({ ...f, confirm: v }))}
                placeholder="Repeat new password"
              />

              {/* strength hint */}
              {pwForm.next.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          pwForm.next.length >= i * 3
                            ? pwForm.next.length >= 10 ? "bg-emerald-500"
                              : pwForm.next.length >= 7  ? "bg-amber-400"
                              : "bg-red-400"
                            : "bg-muted",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {pwForm.next.length < 6 ? "Too short" : pwForm.next.length < 10 ? "Moderate" : "Strong"}
                  </p>
                </div>
              )}

              {pwError && (
                <p className="text-sm text-red-500 font-medium">{pwError}</p>
              )}
            </div>

            {pwSaved && <SuccessBanner message="Password changed successfully." />}

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Lock className="h-4 w-4" />
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
