import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Igor Kendy | Full-Stack & DevOps Engineer",
  description:
    "Portfólio de Igor Kendy Sakaguchi — Desenvolvedor Full-Stack especializado em Backend, DevOps e Cloud. APIs escaláveis, automações e infraestrutura Kubernetes.",
  keywords: [
    "Igor Kendy",
    "Full-Stack Developer",
    "DevOps",
    "Backend",
    "Node.js",
    "Kubernetes",
    "Cloud",
    "Python",
  ],
  authors: [{ name: "Igor Kendy Sakaguchi" }],
  openGraph: {
    title: "Igor Kendy | Full-Stack & DevOps Engineer",
    description:
      "Desenvolvedor Full-Stack focado em Backend, DevOps e Cloud. Infraestruturas resilientes do servidor ao navegador.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased" style={{ backgroundColor: "#080808", color: "#F2F2F2" }}>
        {children}
      </body>
    </html>
  );
}
