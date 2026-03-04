"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/library";

  const missingEnvVars =
    !process.env.NEXT_PUBLIC_AUTH_CONFIGURED;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Sign in to continue
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          Access your free ebook library
        </p>

        {missingEnvVars && (
          <div
            style={{
              backgroundColor: "#fef3c7",
              border: "1px solid #f59e0b",
              borderRadius: "8px",
              padding: "0.75rem",
              marginBottom: "1rem",
              fontSize: "0.8rem",
              color: "#92400e",
              textAlign: "left",
            }}
          >
            <strong>⚠ OAuth not configured.</strong> Set these environment variables:
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
              <li>AUTH_SECRET</li>
              <li>AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET</li>
              <li>AUTH_MICROSOFT_ID / AUTH_MICROSOFT_SECRET</li>
            </ul>
          </div>
        )}

        <button
          onClick={() => signIn("google", { callbackUrl })}
          style={{
            display: "block",
            width: "100%",
            padding: "0.75rem",
            marginBottom: "0.75rem",
            backgroundColor: "#4285f4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("microsoft-entra-id", { callbackUrl })}
          style={{
            display: "block",
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#0078d4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
