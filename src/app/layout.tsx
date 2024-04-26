import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/topbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "수야 기술 블로그",
  description: "프론트엔드 정수진 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white">
          <div className="max-w-5xl mx-auto px-4 ">
            <Topbar />
            <main className="pb-32">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
