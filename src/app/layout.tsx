import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar/Navbar";

export const metadata: Metadata = {
  title: "Nextjs boilerplate frontend",
  description: "boilerplate frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [{ label: "Home", href: "/" }];

  return (
    <html lang="pt-BR">
      <body className="h-dvh">
        <NavBar navItems={navItems} />
        {children}
      </body>
    </html>
  );
}
