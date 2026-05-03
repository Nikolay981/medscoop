import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-main",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "МедСкууп | Мистериозни кутии за медицински сестри",
  description: "Практични, сладурски и полезни неща за ежедневието в болницата и извън нея. Идеален подарък за медицински сестри.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <body className={font.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
