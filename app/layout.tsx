import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "College Directory - Find Colleges and Courses",
  description: "Find colleges, compare courses, and discover intake capacities across various educational institutions",
  keywords: "colleges, education, courses, admission, intake capacity, college finder",
  metadataBase: new URL('https://college-directory.vercel.app'),
  authors: [{ name: "College Directory" }],
  openGraph: {
    title: "College Directory - Find Colleges and Courses",
    description: "Find colleges, compare courses, and discover intake capacities across various educational institutions",
    images: ['/og-image.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}