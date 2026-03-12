import { redirect } from "next/navigation";

export default function UnlockedPage() {
  // Optionally, redirect to the main library
  redirect("/unlocked");
  return null;
}
