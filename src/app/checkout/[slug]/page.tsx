import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CheckoutPage({ params }) {
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=/checkout/${params.slug}`);
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-2">This is a placeholder checkout page for <span className="font-semibold">{params.slug}</span>.</p>
      <p className="text-gray-500">(Checkout functionality coming soon.)</p>
    </main>
  );
}
