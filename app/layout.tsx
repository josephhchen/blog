import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ThemeScript from "./theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joe Chen",
  description: "Stuff I'm currently building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t border-gray-200/50 dark:border-gray-800/50 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p className="font-mono">© 2025 Joe Chen</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}