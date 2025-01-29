import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar/Navbar";
import logo from "@/app/assets/Global-TIRH-logo-V-small.png";

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
        <NavBar navItems={navItems} logo={logo} />
        {children}
      </body>
    </html>
  );
}
