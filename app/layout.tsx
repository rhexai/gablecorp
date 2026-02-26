import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Gablecorp",
    default: "Global Technology Consulting | Gablecorp Industries",
  },
  description: "Accelerating sustainable and inclusive growth through strategic consulting and innovative solutions.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen bg-white`}
        >
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
            {children}
          </div>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
