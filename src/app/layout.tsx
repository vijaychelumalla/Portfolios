import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vijay Chelumalla | Backend & Full Stack Developer Portfolio",
  description: "Explore the developer portfolio of Vijay Chelumalla, a backend specialist focused on Node.js, Express, MongoDB, REST APIs, authentication, and clean code architectures.",
  keywords: [
    "Vijay Chelumalla",
    "Backend Developer",
    "Full Stack Developer",
    "Node.js Developer",
    "Express.js API",
    "MongoDB Specialist",
    "REST API Security",
    "Software Engineer Portfolio",
    "Vercel Deployments"
  ],
  authors: [{ name: "Vijay Chelumalla", url: "https://github.com/vijaychelumalla" }],
  openGraph: {
    title: "Vijay Chelumalla | Backend & Full Stack Developer Portfolio",
    description: "Explore the developer portfolio of Vijay Chelumalla, showcasing robust backend systems, APIs, and full stack applications.",
    url: "https://github.com/vijaychelumalla",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth h-full`}
    >
      <body className="bg-dark-bg text-gray-100 font-sans antialiased selection:bg-primary/30 selection:text-blue-200 min-h-full flex flex-col">
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
