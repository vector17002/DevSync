import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import NextTopLoader from 'nextjs-toploader';

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Sync",
  description: "Find amazing debuggers and collaborators for your projects and interact with them through video meet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/icon.png"/>
      </head>
      <body className={inter.className} >
        <ThemeProvider 
            attribute="class"
            defaultTheme="light"
            enableColorScheme>
          <Navbar/>
          <NextTopLoader/>
          <div className='main dark:hidden'>
          </div>
          {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
