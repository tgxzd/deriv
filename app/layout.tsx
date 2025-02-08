import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Providers } from "./providers";
import { geistSans, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Trading",
  description: "Your intelligent trading companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
