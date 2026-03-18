// Ensure dashboard is never cached so session and data stay correct per request (e.g. on Vercel)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
