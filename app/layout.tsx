import AuthProvider from "./AuthProvider";
import "./globals.css";

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
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
