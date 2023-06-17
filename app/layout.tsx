import "./globals.css";
import Home from "./(home)/Home";

export const metadata = {
  title: "Merry Post",
  description: "Created by Saratch Tanapongwonglert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-w-[32rem]">
          <Home />
          {children}
        </main>
      </body>
    </html>
  );
}
