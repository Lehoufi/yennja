import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext";

export const metadata = {
  title: "الخطاط ينجى | أفعال حقيقية في الميدان من أجل مستقبل الداخلة",
  description: "الموقع الرسمي والجريدة الإلكترونية لدعم ومواكبة أنشطة ومبادرات السيد ينجا الخطاط. مشاريع تنموية، أخبار، وحلول لجهة الداخلة–وادي الذهب ضمن حزب الأصالة والمعاصرة (PAM).",
  keywords: ["الخطاط ينجى", "El Khattat Yenja", "الداخلة", "Dakhla", "حزب الأصالة والمعاصرة", "PAM", "تنمية الداخلة", "وادي الذهب", "المغرب", "المحور الأول", "المحور الثاني"],
  authors: [{ name: "أنصار الخطاط ينجى" }],
  creator: "أنصار الخطاط ينجى",
  publisher: "أنصار الخطاط ينجى",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
  openGraph: {
    title: "الخطاط ينجى | El Khattat Yenja — الداخلة",
    description: "صفحة داعمة للسيد ينجا الخطاط في الداخلة — حزب الأصالة والمعاصرة. نضع جهة الداخلة وادي الذهب في قلب الأولويات.",
    url: "/",
    siteName: "الخطاط ينجى - El Khattat Yenja",
    images: [
      {
        url: "/yenja.png",
        width: 1200,
        height: 630,
        alt: "الخطاط ينجى - El Khattat Yenja",
      }
    ],
    locale: "ar_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "الخطاط ينجى | El Khattat Yenja — الداخلة",
    description: "أفعال حقيقية في الميدان من أجل مستقبل الداخلة. صفحة داعمة للسيد ينجا الخطاط.",
    images: ["/yenja.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
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
