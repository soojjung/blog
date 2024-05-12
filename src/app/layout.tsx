import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "수야 기술 블로그",
  description: "프론트엔드 정수진 지식 기록장",
  category: "technology",
  openGraph: {
    title: "수야 기술 블로그",
    description: "프론트엔드 정수진 지식 기록장",
    url: "https://www.sooya.dev",
    siteName: "수야 기술 블로그",
    type: "website",
  },
  authors: [{ name: "Soojin" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="bg-white">
            <div className="max-w-5xl mx-auto px-5">
              <Topbar />
              <main className="pb-32">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
