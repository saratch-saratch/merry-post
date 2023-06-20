import Home from "@/components/Home/Home";

export const metadata = {
  title: "Merry Post",
  description: "Created by Saratch Tanapongwonglert",
};

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
