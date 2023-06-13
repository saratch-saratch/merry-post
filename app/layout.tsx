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
        <main className="flex min-w-[64rem] gap-2">
          <Home />
          <div className="h-screen w-full  flex-col rounded-lg bg-neutral-800">
            <header className="sticky top-0 flex h-12 items-center rounded-t-lg border border-b-0 border-neutral-800 bg-neutral-900 px-4 py-2"></header>
            <section className="mt-12">{children}</section>
          </div>
        </main>
      </body>
    </html>
  );
}
