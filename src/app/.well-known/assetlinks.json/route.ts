import { NextResponse } from "next/server";

/**
 * assetlinks.json
 *
 * This file tells Android: "When a user taps a link to bizora.app/join/*,
 * open it directly in the Bizora app instead of Chrome."
 *
 * Requirements:
 *  1. Must be served over HTTPS.
 *  2. Content-Type must be "application/json".
 *  3. Fill ANDROID_PACKAGE_NAME and ANDROID_SHA256_FINGERPRINT in your env.
 *
 * To get your SHA-256 fingerprint:
 *   keytool -list -v -keystore your-release.jks -alias your-alias
 *   or from EAS: eas credentials
 *
 * In app.config.ts the mobile app already declares android.intentFilters
 * with autoVerify: true for the bizora.app domain.
 */
export function GET() {
  const packageName = process.env.ANDROID_PACKAGE_NAME || "com.yourcompany.bizora";
  const sha256 = process.env.ANDROID_SHA256_FINGERPRINT ||
    "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99";

  const assetLinks = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: packageName,
        sha256_cert_fingerprints: [sha256],
      },
    },
  ];

  return new NextResponse(JSON.stringify(assetLinks), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store",
    },
  });
}
