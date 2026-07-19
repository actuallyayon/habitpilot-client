import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { AuthProvider } from "@/contexts/AuthContext";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HabitPilot - AI-Powered Habit Tracking",
  description: "The first habit tracker that adapts to you, not the other way around. Powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
