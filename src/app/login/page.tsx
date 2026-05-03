export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string;
    download?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;

  const next = params.next || "/library";
  const download = params.download || "";
  const hasInvalidEmailError = params.error === "invalid_email";

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-neutral-950">
          Continue to Download
        </h1>

        <p className="mt-3 text-sm text-neutral-600">
          Enter your email to unlock your free ebook.
        </p>

        <form action="/api/auth/login" method="post" className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <input type="hidden" name="download" value={download} />

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-800"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-950 outline-none focus:border-neutral-950"
            />
          </div>

          {hasInvalidEmailError && (
            <p className="text-sm font-medium text-red-600">
              Please enter a valid email address.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white hover:bg-neutral-800"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}