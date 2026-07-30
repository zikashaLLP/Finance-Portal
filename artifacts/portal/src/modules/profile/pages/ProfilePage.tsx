import { useState } from "react";
import {
  User, Mail, Phone, Building2, Lock, Eye, EyeOff,
  Save, CheckCircle2, Pencil, X, Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "details" | "password";

const TABS: { id: Tab; label: string }[] = [
  { id: "details",  label: "Profile Details"  },
  { id: "password", label: "Change Password"   },
];

const INITIAL_USER = {
  fullName:  "Admin User",
  email:     "admin@portal.com",
  phone:     "+91 98765 43210",
  role:      "Administrator",
  branch:    "Main Branch",
  username:  "admin",
  joinedOn:  "1 Jan 2024",
};

/* ── inline field ── */
function Field({
  label, value, onChange, type = "text", disabled = false, placeholder, icon: Icon,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {disabled ? (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border">
          <Icon className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
          <span className="text-sm text-muted-foreground">{value}</span>
        </div>
      ) : (
        <div className="relative">
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-foreground/20 bg-background",
              "focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/40",
              "transition-colors placeholder:text-muted-foreground/40",
            )}
          />
        </div>
      )}
    </div>
  );
}

/* ── password field ── */
function PwField({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border border-border bg-background",
            "focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/40",
            "transition-colors placeholder:text-muted-foreground/40",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}

/* ── stat pill for work info ── */
function InfoPill({
  icon: Icon, label, value,
  editing, onChange,
}: {
  icon: React.ElementType; label: string; value: string;
  editing?: boolean; onChange?: (v: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-muted/40 border border-border flex-1 min-w-0">
      <div className="h-9 w-9 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      {editing && onChange ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full text-center text-sm font-semibold text-foreground bg-background",
            "border border-foreground/20 rounded-lg px-2 py-1",
            "focus:outline-none focus:ring-2 focus:ring-foreground/10",
          )}
        />
      ) : (
        <p className="text-sm font-semibold text-foreground text-center truncate w-full">{value}</p>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [tab, setTab]   = useState<Tab>("details");

  /* profile */
  const [form, setForm]         = useState({ ...INITIAL_USER });
  const [draft, setDraft]       = useState({ ...INITIAL_USER });
  const [editing, setEditing]   = useState(false);
  const [saved, setSaved]       = useState(false);

  /* password */
  const [pwForm, setPwForm]   = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const avatarInitials = form.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  function startEdit() {
    setDraft({ ...form });
    setEditing(true);
  }
  function cancelEdit() {
    setDraft({ ...form });
    setEditing(false);
  }
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setForm({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (!pwForm.current)          { setPwError("Enter your current password."); return; }
    if (pwForm.next.length < 6)   { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError("Passwords do not match."); return; }
    setPwSaved(true);
    setPwForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 3000);
  }

  return (
    <div className="h-full flex flex-col bg-white">

      {/* ── tab bar only ── */}
      <div className="bg-white border-b border-border px-6 shrink-0">
        <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setEditing(false); }}
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

      {/* ── centered content ── */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 bg-white">

        {/* ── Profile Details ── */}
        {tab === "details" && (
          <form onSubmit={handleSave} className="w-full max-w-xl">
            <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">

              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Profile Information</p>
                {!editing ? (
                  <button type="button" onClick={startEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted/50 transition-colors text-foreground">
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                ) : (
                  <button type="button" onClick={cancelEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted/50 transition-colors text-muted-foreground">
                    <X className="h-3 w-3" /> Cancel
                  </button>
                )}
              </div>

              {/* Personal fields */}
              <div className="px-6 pt-5 pb-4 grid grid-cols-2 gap-4">
                <Field label="Full Name"     icon={User}  value={draft.fullName}  onChange={(v) => setDraft((f) => ({ ...f, fullName: v }))}  disabled={!editing} placeholder="Full name" />
                <Field label="Username"      icon={User}  value={draft.username}  onChange={(v) => setDraft((f) => ({ ...f, username: v }))}  disabled={!editing} placeholder="Username" />
                <Field label="Email Address" icon={Mail}  value={draft.email}     onChange={(v) => setDraft((f) => ({ ...f, email: v }))}     disabled={!editing} placeholder="email@example.com" type="email" />
                <Field label="Phone Number"  icon={Phone} value={draft.phone}     onChange={(v) => setDraft((f) => ({ ...f, phone: v }))}     disabled={!editing} placeholder="+91 00000 00000" />
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-border" />

              {/* Work info pills */}
              <div className="px-6 pt-4 pb-5 flex gap-3">
                <InfoPill icon={User}      label="Role"         value={draft.role}     editing={editing} onChange={(v) => setDraft((f) => ({ ...f, role: v }))} />
                <InfoPill icon={Building2} label="Branch"       value={draft.branch}   editing={editing} onChange={(v) => setDraft((f) => ({ ...f, branch: v }))} />
                <InfoPill icon={Calendar}  label="Member Since" value={draft.joinedOn} />
              </div>

              {/* Footer: success + save */}
              {(saved || editing) && (
                <div className="px-6 pb-5 space-y-3">
                  {saved && <SuccessBanner message="Profile updated successfully." />}
                  {editing && (
                    <div className="flex justify-end">
                      <button type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
                        <Save className="h-4 w-4" /> Save Changes
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        )}

        {/* ── Change Password ── */}
        {tab === "password" && (
          <form onSubmit={handlePasswordSave} className="w-full max-w-sm">
            <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Change Password</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                <PwField label="Current Password"    value={pwForm.current} onChange={(v) => setPwForm((f) => ({ ...f, current: v }))} placeholder="Enter current password" />
                <PwField label="New Password"        value={pwForm.next}    onChange={(v) => setPwForm((f) => ({ ...f, next: v }))}    placeholder="At least 6 characters" />
                <PwField label="Confirm New Password" value={pwForm.confirm} onChange={(v) => setPwForm((f) => ({ ...f, confirm: v }))} placeholder="Repeat new password" />

                {/* strength bar */}
                {pwForm.next.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex gap-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          pwForm.next.length >= i * 3
                            ? pwForm.next.length >= 10 ? "bg-emerald-500" : pwForm.next.length >= 7 ? "bg-amber-400" : "bg-red-400"
                            : "bg-muted",
                        )} />
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {pwForm.next.length < 6 ? "Too short" : pwForm.next.length < 10 ? "Moderate" : "Strong"}
                    </p>
                  </div>
                )}

                {pwError && <p className="text-sm text-red-500 font-medium">{pwError}</p>}
                {pwSaved && <SuccessBanner message="Password changed successfully." />}
              </div>
              <div className="px-6 pb-5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Lock className="h-4 w-4" /> Update Password
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
