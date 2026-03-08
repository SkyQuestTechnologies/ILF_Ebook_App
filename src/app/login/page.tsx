import LoginCard from "./LoginCard";

// Next.js 16 App Router: searchParams is a Promise in async Server Components
type LoginPageProps = {
  searchParams?: Promise<{
    campaign?: string;
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const campaign = typeof params?.campaign === "string" ? params.campaign : undefined;
  const nextParam = typeof params?.next === "string" ? params.next : undefined;
  return <LoginCard campaign={campaign} nextParam={nextParam} />;
}
