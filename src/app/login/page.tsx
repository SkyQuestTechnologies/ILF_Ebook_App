
import { Suspense } from "react";
import LoginClient from "./LoginClient";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto mb-8" />
        <div className="h-12 bg-blue-100 rounded w-full mb-4" />
        <div className="h-12 bg-blue-50 rounded w-full mb-4" />
        <div className="h-12 bg-gray-100 rounded w-full mb-6" />
        <div className="h-3 bg-gray-50 rounded w-1/3 mx-auto" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LoginClient />
    </Suspense>
  );
}
