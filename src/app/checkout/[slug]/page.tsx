import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { books } from "@/lib/books";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("ilf_session")?.value;

  if (!token || token.split(".").length !== 3) {
    redirect(`/login?next=/checkout/${slug}`);
  }

  const book = books.find((b) => b.slug === slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
        <section className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-950 mb-1">Checkout</h1>
          {book && (
            <p className="text-sm text-neutral-500 mb-6">
              {book.title} &mdash; <span className="font-semibold text-blue-600">${book.price.toFixed(2)}</span>
            </p>
          )}
          <CheckoutForm slug={slug} />
        </section>
      </main>
      <Footer />
    </>
  );
}
