import Home from "@/components/Home/Home";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Home />
      {children}
    </main>
  );
}
