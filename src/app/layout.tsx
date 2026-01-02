import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.caesell.net"),
  title: {
    default: "自動車営業ツール CARSELL | 自動車AI営業・自動車AI管理で売上を最大化",
    template: "%s | CARSELL - 自動車営業ツール",
  },
  description: "自動車営業ツール「CARSELL」は、自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。顧客管理から見積作成、営業目標管理まで一元化し、自動車販売の売上を最大化します。展示会アンケートスキャン、カンバン式顧客管理、営業目標管理など、自動車ディーラー向けの包括的な営業支援システム。",
  keywords: [
    "自動車営業ツール",
    "自動車AI営業",
    "自動車AI管理",
    "売り上げAI",
    "自動車販売システム",
    "営業支援システム",
    "CRM",
    "カーディーラー",
    "自動車ディーラー",
    "営業DX",
    "自動車営業管理",
    "AI営業ツール",
    "売上管理システム",
    "自動車見積システム",
    "営業効率化",
    "自動車販売管理",
    "ディーラー向けCRM",
    "自動車営業支援",
    "AI営業管理",
    "売上最大化システム",
  ],
  authors: [{ name: "CARSELL", url: "https://www.caesell.net" }],
  creator: "CARSELL",
  publisher: "CARSELL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "自動車営業ツール CARSELL | 自動車AI営業・自動車AI管理で売上を最大化",
    description: "自動車営業ツール「CARSELL」は、自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。顧客管理から見積作成、営業目標管理まで一元化し、自動車販売の売上を最大化します。",
    type: "website",
    locale: "ja_JP",
    siteName: "CARSELL",
    url: "https://www.caesell.net",
    images: [
      {
        url: "https://www.caesell.net/carsell-logo.png",
        width: 1200,
        height: 630,
        alt: "CARSELL - 自動車営業ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "自動車営業ツール CARSELL | 自動車AI営業・自動車AI管理で売上を最大化",
    description: "自動車営業ツール「CARSELL」は、自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。",
    images: ["https://www.caesell.net/carsell-logo.png"],
    creator: "@carsell",
  },
  alternates: {
    canonical: "/",
  },
  category: "ビジネスソフトウェア",
  classification: "営業支援システム",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.caesell.net/#organization",
        name: "CARSELL",
        url: "https://www.caesell.net",
        logo: {
          "@type": "ImageObject",
          url: "https://www.caesell.net/carsell-logo.png",
          width: 600,
          height: 200,
        },
        description: "自動車営業ツール「CARSELL」は、自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。",
        address: {
          "@type": "PostalAddress",
          addressLocality: "三条市",
          addressRegion: "新潟県",
          streetAddress: "石上１丁目10番33号",
          postalCode: "955-0084",
          addressCountry: "JP",
        },
        founder: {
          "@type": "Person",
          name: "加藤健資",
        },
        foundingDate: "2024-10-10",
        telephone: "070-9133-6957",
        email: "info@carsell.jp",
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "070-9133-6957",
          contactType: "customer service",
          areaServed: "JP",
          availableLanguage: "Japanese",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.caesell.net/#software",
        name: "CARSELL",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "自動車営業ツール「CARSELL」は、自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。顧客管理から見積作成、営業目標管理まで一元化し、自動車販売の売上を最大化します。",
        offers: [
          {
            "@type": "Offer",
            name: "スタータープラン",
            priceCurrency: "JPY",
            price: "1550000",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "1550000",
              priceCurrency: "JPY",
              valueAddedTaxIncluded: true,
            },
          },
          {
            "@type": "Offer",
            name: "スタンダードプラン",
            priceCurrency: "JPY",
            price: "4980000",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "4980000",
              priceCurrency: "JPY",
              valueAddedTaxIncluded: true,
            },
          },
        ],
        featureList: [
          "ダッシュボード機能",
          "顧客管理（カンバン）",
          "見積もり作成",
          "営業目標管理",
          "アンケートスキャン機能",
          "社内チャット機能",
          "自動車AI営業",
          "自動車AI管理",
          "売り上げAI",
        ],
        keywords: "自動車営業ツール,自動車AI営業,自動車AI管理,売り上げAI,営業支援システム",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "150",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.caesell.net/#website",
        url: "https://www.caesell.net",
        name: "CARSELL - 自動車営業ツール",
        description: "自動車営業ツール「CARSELL」は、自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。",
        publisher: {
          "@id": "https://www.caesell.net/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.caesell.net/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "ja-JP",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.caesell.net/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: "https://www.caesell.net",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.caesell.net/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "どのような業種に対応していますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "自動車ディーラー、キャンピングカー販売店、輸入車販売店、中古車販売店など、自動車販売に関わるすべての業態に対応しています。新車・中古車問わずご利用いただけます。",
            },
          },
          {
            "@type": "Question",
            name: "展示会で使えるアンケートスキャン機能の精度はどのくらいですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "スマートフォンやスキャナーで撮影した紙のアンケート用紙から、顧客情報を高精度で自動抽出します。JPG、PNG、HEIC、PDF形式に対応しており、複数枚を一度にアップロードすることも可能です。",
            },
          },
          {
            "@type": "Question",
            name: "導入までにどのくらいの期間がかかりますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "お申し込み後、最短で1週間程度でご利用を開始できます。初期設定やデータ移行のサポートも充実しており、スムーズに導入いただけます。",
            },
          },
          {
            "@type": "Question",
            name: "既存のシステムとの連携は可能ですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "エンタープライズプランでは、API連携や外部システム統合が可能です。既存の基幹システムやCRMとの連携についてはお気軽にご相談ください。",
            },
          },
        ],
      },
    ],
  };

  // Google Search Console 所有権確認用メタタグ
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#255668" />
        <meta name="format-detection" content="telephone=yes" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {googleSiteVerification && (
          <meta name="google-site-verification" content={googleSiteVerification} />
        )}
        <link rel="canonical" href="https://www.caesell.net" />
        <link rel="alternate" hrefLang="ja" href="https://www.caesell.net" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/carsell-logo.png" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
