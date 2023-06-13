import "./globals.css";
import Home from "./Home";

export const metadata = {
  title: "Merry Post",
  description: "Saratch Tanapongwonglert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex bg-neutral-800">
          <Home />
          <div className="h-screen w-full  flex-col">
            <header className="sticky top-0 flex h-12 items-center border-b border-b-neutral-700 bg-neutral-900 px-4 py-2"></header>
            <section className="mt-12">{children}</section>
          </div>
        </main>
      </body>
    </html>
  );
}
