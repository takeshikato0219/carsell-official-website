"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6ECXY88QQ9";
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (gaMeasurementId && typeof window !== "undefined" && window.gtag) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", gaMeasurementId, {
        page_path: url,
        page_location: window.location.href,
      });
    }
  }, [pathname, searchParams, gaMeasurementId]);

  // デバッグ用：Google Analyticsの読み込み確認
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Google Analytics Measurement ID:", gaMeasurementId);
      console.log("Current URL:", window.location.href);
    }
  }, [gaMeasurementId]);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        onLoad={() => {
          console.log("Google Analytics script loaded");
        }}
        onError={() => {
          console.error("Failed to load Google Analytics script");
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_path: window.location.pathname,
              page_location: window.location.href,
            });
            console.log('Google Analytics initialized with ID: ${gaMeasurementId}');
          `,
        }}
      />
    </>
  );
}

