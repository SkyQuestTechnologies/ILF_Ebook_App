import ReaderAuthForm from "./ReaderAuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; download?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = params.next || "/library";
  const download = params.download || "";

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-neutral-950">Welcome to iLFEbook</h1>
        <p className="mt-3 text-sm text-neutral-600">Sign in or create an account to download ebooks.</p>
        <ReaderAuthForm next={next} download={download} />
      </section>
    </main>
  );
}
