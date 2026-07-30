import { Redirect } from "wouter";

/** Legacy entry point — redirect to the first settings sub-route. */
export default function SettingsPage() {
  return <Redirect to="/settings/branches" />;
}
