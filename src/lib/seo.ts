// Auto-SEO engine — generates full SEO for any app from its data.
// The user never writes SEO manually; every page is formula-built.

import { AppData } from "./apps";

/** Page title: "[App Name] APK Download (v[Version]) — Latest Version | APKLane" */
export function appTitle(app: AppData): string {
  return `${app.name} APK Download (v${app.version}) — Latest Version | APKLane`;
}

/** Meta description: auto-composed, keyword-rich, under 160 chars */
export function appMetaDescription(app: AppData): string {
  const size = app.size_mb ? `${app.size_mb} MB` : "free";
  const android = app.min_android ? `, Android ${app.min_android}+ required` : "";
  return `Download ${app.name} APK v${app.version} for Android — latest version, ${size}${android}. Safe, scanned, direct download from APKLane.`;
}

/** Canonical URL */
export function appCanonical(app: AppData): string {
  return `https://www.apklane.com/apps/${app.slug}`;
}

/** Auto-FAQ — 5 questions generated from app data */
export function appFaq(app: AppData): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [
    {
      q: `Is ${app.name} APK safe to download?`,
      a: `Yes. Every APK on APKLane is scanned with VirusTotal before publishing. This version (v${app.version}) passed our safety checks.`,
    },
    {
      q: `What is the latest version of ${app.name}?`,
      a: `The latest version available on APKLane is v${app.version}${app.size_mb ? ` (${app.size_mb} MB)` : ""}.`,
    },
    {
      q: `Why is ${app.name} not on the Google Play Store?`,
      a: app.why_not_on_store || `${app.name} is distributed directly by its developer and is not listed on the Google Play Store.`,
    },
  ];

  if (app.min_android) {
    faqs.push({
      q: `What Android version do I need for ${app.name}?`,
      a: `${app.name} v${app.version} requires Android ${app.min_android} or higher.`,
    });
  }

  faqs.push({
    q: `How do I install the ${app.name} APK?`,
    a: `Download the APK, open it on your Android device, allow "Install unknown apps" when prompted, and follow the on-screen steps.`,
  });

  return faqs;
}

/** SoftwareApplication JSON-LD schema — auto-built */
export function appSchema(app: AppData): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android",
    softwareVersion: app.version,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: appCanonical(app),
    ...(app.developer ? { author: { "@type": "Organization", name: app.developer } } : {}),
    ...(app.size_mb ? { fileSize: `${app.size_mb}MB` } : {}),
    ...(app.icon_url ? { image: app.icon_url } : {}),
  };
}

/** FAQPage JSON-LD schema — auto-built */
export function appFaqSchema(app: AppData): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: appFaq(app).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList schema */
export function appBreadcrumbSchema(app: AppData): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.apklane.com" },
      { "@type": "ListItem", position: 2, name: app.category_name, item: `https://www.apklane.com/categories/${app.category}` },
      { "@type": "ListItem", position: 3, name: app.name },
    ],
  };
}
