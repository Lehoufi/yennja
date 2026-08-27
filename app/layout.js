import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext";

export const metadata = {
  title: "أنصار الخطاط ينجى | الجريدة الإلكترونية — الداخلة",
  description: "صفحة داعمة للسيد ينجا الخطاط، كتواكب أنشطتو ومبادراتو، وكتشارك كل ما يتعلق بمسيرتو وعملو من أجل تنمية جهة الداخلة–وادي الذهب. حزب الأصالة والمعاصرة.",
  keywords: "الخطاط ينجى, El Khattat Yenja, الداخلة, Dakhla, حزب الأصالة والمعاصرة, PAM, انتخابات",
  openGraph: {
    title: "أنصار الخطاط ينجى | الجريدة الإلكترونية",
    description: "صفحة داعمة للسيد ينجا الخطاط في الداخلة — حزب الأصالة والمعاصرة",
    type: "website",
    locale: "ar_MA",
    images: ["/yenja.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo2.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-bg-dark text-text-primary" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
