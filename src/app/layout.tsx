import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CopyExpress - Generación Inteligente de Documentos",
  description: "Crea contratos, actas, derechos de petición y más con base en la normatividad vigente de Colombia. Wizard guiado paso a paso con asistencia de IA.",
  keywords: ["documentos legales", "Colombia", "contratos", "actas", "derecho de petición", "ley colombiana", "copyexpress"],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%231B4F72'/%3E%3Cpath d='M30 20h40a5 5 0 0 1 5 5v50a5 5 0 0 1-5 5H30a5 5 0 0 1-5-5V25a5 5 0 0 1 5-5z' fill='none' stroke='%23FFFFFF' stroke-width='3'/%3E%3Cline x1='37' y1='35' x2='63' y2='35' stroke='%2328A745' stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='37' y1='45' x2='63' y2='45' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' opacity='0.6'/%3E%3Cline x1='37' y1='55' x2='55' y2='55' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' opacity='0.6'/%3E%3Cline x1='37' y1='65' x2='50' y2='65' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' opacity='0.4'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" themes={["light", "dark", "warm"]} enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}