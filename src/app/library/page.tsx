import { auth } from "@/auth";
import { redirect } from "next/navigation";

const FEATURED_BOOKS = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", buyUrl: "https://example.com/buy/gatsby" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", buyUrl: "https://example.com/buy/mockingbird" },
  { title: "1984", author: "George Orwell", buyUrl: "https://example.com/buy/1984" },
];

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string }>;
}) {
  const session = await auth();

  if (!session) {
    const params = await searchParams;
    const callbackUrl = params.campaign
      ? `/library?campaign=${encodeURIComponent(params.campaign)}`
      : "/library";
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const { campaign } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
          Your Library
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "0.5rem" }}>
          Welcome, {session.user?.email}
        </p>
        {campaign && (
          <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
            Campaign: <strong>{campaign}</strong>
          </p>
        )}

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.75rem" }}>
            Free Ebook
          </h2>
          <a
            href="/api/ebook/free"
            style={{
              display: "inline-block",
              padding: "0.6rem 1.25rem",
              backgroundColor: "#16a34a",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            ⬇ Download free ebook
          </a>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem" }}>
            Featured Books
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {FEATURED_BOOKS.map((book) => (
              <li
                key={book.title}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", margin: 0 }}>{book.title}</p>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>{book.author}</p>
                </div>
                <a
                  href={book.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.4rem 1rem",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  Buy
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
