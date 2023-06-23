import Home from "@/app/home/Home";

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
