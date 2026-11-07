import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Header from "@/components/Header/Header";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import "./globals.css";
import { Suspense } from "react";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <QueryProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
