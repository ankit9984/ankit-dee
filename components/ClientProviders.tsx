"use client";

import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  );
} 