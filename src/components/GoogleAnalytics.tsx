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
      });
    }
  }, [pathname, searchParams, gaMeasurementId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `,
        }}
      />
    </>
  );
}

