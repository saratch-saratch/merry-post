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
        <main className="flex min-w-[32rem] gap-2">
          <Home />
          {children}
        </main>
      </body>
    </html>
  );
}
