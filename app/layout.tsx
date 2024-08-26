import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collaborators Cohort",
  description: "Find amazing debuggers and collaborators for your projects",
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
        <link rel="icon" href="/assets/logo-final.png"/>
      </head>
      <body className={inter.className}>
        <ThemeProvider 
            attribute="class"
            defaultTheme="light"
            enableColorScheme>
          <Navbar/>
          {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
