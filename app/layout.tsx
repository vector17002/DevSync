import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from 'nextjs-toploader';
import{ Toaster } from 'react-hot-toast'

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
        <link rel="icon" href="/assets/Logo.png"/>
      </head>
      <body className={inter.className} >
      <Toaster position="top-center"
              reverseOrder={false}/>
        <ThemeProvider 
            attribute="class"
            defaultTheme="light"
            enableColorScheme>
          <NextTopLoader/>
          <main>
          {children}
          </main>
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
