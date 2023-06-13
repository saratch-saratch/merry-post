import "./globals.css";

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
    <html lang="en" className="h-full">
      <body className="h-full bg-neutral-800">
        <main className=" flex h-full flex-col ">
          <div>
            <section>Home</section>
          </div>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
