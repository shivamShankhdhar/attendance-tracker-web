import type { Metadata } from "next";
import Link from "next/link";
import { BizoraWordmark } from "@/components/BrandLogo";
import { IoShieldCheckmarkOutline, IoArrowBackOutline, IoLockClosedOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Privacy Policy — Bizora",
  description:
    "Bizora Privacy Policy, Google AdMob disclosures, device identifier usage, data security, and user rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="doc-page">
      <div className="doc-container">
        <div className="doc-card">
          {/* Top navigation */}
          <div className="doc-nav-bar">
            <Link href="/" className="doc-nav-link" id="privacy-back-home">
              <IoArrowBackOutline style={{ fontSize: 16 }} /> Back to Bizora
            </Link>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link href="/about" className="doc-nav-link" id="privacy-to-about">
                About Bizora
              </Link>
            </div>
          </div>

          <BizoraWordmark />

          {/* Header */}
          <div className="doc-header">
            <div className="doc-badge">
              <IoShieldCheckmarkOutline style={{ fontSize: 14 }} /> Official Policy
            </div>
            <h1 className="doc-title">Privacy Policy &amp; AdMob Disclosure</h1>
            <p className="doc-subtitle">
              Transparency, security, and data governance for Bizora Workforce Attendance OS.
            </p>
          </div>

          <div className="doc-meta-bar">
            <span><strong>Effective Date:</strong> September 30, 2026</span>
            <span><strong>Last Updated:</strong> September 30, 2026</span>
            <span><strong>Applicability:</strong> Bizora Mobile Apps (iOS &amp; Android) and Web Services</span>
          </div>

          {/* Section 1: Overview */}
          <section className="doc-section">
            <h2 className="doc-h2">1. Introduction &amp; Overview</h2>
            <p className="doc-p">
              Bizora (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy and personal data. This Privacy Policy details how Bizora collects, uses, stores, and protects information when you access or use our mobile applications on Android and iOS, our website (
              <a href="https://www.bizora.shivamshankhdhar.online" target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)", fontWeight: 600 }}>
                bizora.shivamshankhdhar.online
              </a>
              ), and our cloud backend APIs.
            </p>
            <p className="doc-p">
              By installing, downloading, or using the Bizora mobile application or website, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 2: Advertising & AdMob SDK Disclosure (CRITICAL FOR ADMOB) */}
          <section className="doc-section">
            <h2 className="doc-h2">2. Advertising &amp; Google Mobile Ads (AdMob) Disclosure</h2>
            <div className="doc-callout">
              <div className="doc-callout-title">
                <IoShieldCheckmarkOutline style={{ fontSize: 16 }} /> Google AdMob Compliance Notice
              </div>
              <p className="doc-callout-text">
                Bizora displays advertisements to support our free workforce attendance tools. Third-party advertising partners, notably <strong>Google AdMob</strong>, may collect and use information about your device to serve relevant advertisements.
              </p>
            </div>

            <p className="doc-p">
              Our mobile application integrates the <strong>Google Mobile Ads SDK (AdMob)</strong> provided by Google LLC. When you use Bizora, Google AdMob and its advertising network partners may collect, process, and use certain technical and device data, including:
            </p>

            <ul className="doc-list">
              <li>
                <strong>Mobile Advertising Identifiers:</strong> Google Advertising ID (AAID) on Android devices, and Identifier for Advertisers (IDFA) on iOS devices.
              </li>
              <li>
                <strong>Device &amp; Hardware Details:</strong> Device model, manufacturer, operating system version, screen resolution, carrier, and language settings.
              </li>
              <li>
                <strong>Network Information:</strong> IP address, general coarse geographic location (derived from IP address, such as city or country), and connection type.
              </li>
              <li>
                <strong>Ad Interaction Metrics:</strong> Information on ad impressions, taps, views, and app session timestamps to measure ad delivery and prevent fraud.
              </li>
            </ul>

            <p className="doc-p">
              Google uses this information to deliver personalized advertisements (tailored to your interests and app activities) or non-personalized advertisements, as well as to detect fraudulent traffic and improve ad delivery.
            </p>

            <p className="doc-p">
              For complete details on how Google handles data collected through Google AdMob, please consult:
            </p>

            <ul className="doc-list">
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--brand)", fontWeight: 600 }}
                >
                  Google Privacy &amp; Terms
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--brand)", fontWeight: 600 }}
                >
                  How Google Uses Information From Sites or Apps That Use Our Services
                </a>
              </li>
            </ul>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginTop: 6 }}>
              How to Opt Out of Personalized Advertising
            </h3>
            <p className="doc-p">
              You can adjust your device settings at any time to opt out of interest-based or personalized advertising:
            </p>
            <ul className="doc-list">
              <li>
                <strong>On Android:</strong> Open <em>Settings &gt; Google &gt; Ads</em> and choose <em>&ldquo;Delete advertising ID&rdquo;</em> or toggle <em>&ldquo;Opt out of Ads Personalization&rdquo;</em>.
              </li>
              <li>
                <strong>On iOS:</strong> Open <em>Settings &gt; Privacy &amp; Security &gt; Tracking</em> and toggle off tracking permission for Bizora.
              </li>
              <li>
                <strong>Google Ad Settings:</strong> You can manage personalized ad preferences globally across Google services at{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--brand)", fontWeight: 600 }}
                >
                  adssettings.google.com
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 3: Information We Collect */}
          <section className="doc-section">
            <h2 className="doc-h2">3. Information We Collect Directly</h2>
            <p className="doc-p">
              To operate workplace attendance, generate shift logs, and verify team access, Bizora collects the following user data:
            </p>
            <ul className="doc-list">
              <li>
                <strong>Account &amp; Profile Information:</strong> Name, email address, phone number, profile photo URL (optional), and organization role (employer, manager, or employee).
              </li>
              <li>
                <strong>Workplace Records:</strong> Workplace name, address, business hours, attendance policies, and invitation tokens.
              </li>
              <li>
                <strong>Attendance Timestamps:</strong> Clock-in, clock-out, break intervals, total work duration, and attendance status (present, late, absent, half-day).
              </li>
              <li>
                <strong>App Lock &amp; Security Credentials:</strong> Your MPIN is protected with secure encryption and is never stored in readable text. Biometric data (Face ID, Touch ID, Fingerprint) is processed strictly on your device and is <em>never</em> transmitted or stored on our servers.
              </li>
            </ul>
          </section>

          {/* Section 4: Device Permissions */}
          <section className="doc-section">
            <h2 className="doc-h2">4. Device Permissions &amp; Hardware Usage</h2>
            <ul className="doc-list">
              <li>
                <strong>Camera Permission:</strong> Required strictly to scan QR codes for attendance clock-in and workplace onboarding. Camera frames are processed instantly in real-time memory. We do <em>not</em> take photos, capture videos, or upload camera imagery to any remote server.
              </li>
              <li>
                <strong>Location Permission (Optional):</strong> If enabled by your employer for geofenced workplaces, location is checked strictly at the instant of clocking in or out to confirm physical presence within the designated workplace perimeter. Bizora does <em>not</em> track your location continuously or in the background.
              </li>
              <li>
                <strong>Biometrics (Face ID / Fingerprint):</strong> Used solely to unlock the Bizora app on your device via the operating system&rsquo;s local authentication API.
              </li>
            </ul>
          </section>

          {/* Section 5: Security Measures */}
          <section className="doc-section">
            <h2 className="doc-h2">5. Data Security &amp; Protection</h2>
            <div className="doc-callout">
              <div className="doc-callout-title">
                <IoLockClosedOutline style={{ fontSize: 16 }} /> Industry-Standard Security
              </div>
              <p className="doc-callout-text">
                Bizora protects your data with end-to-end encrypted connections, secure app locks, and protected device credential storage.
              </p>
            </div>
            <p className="doc-p">
              We employ strict industry-standard measures to safeguard your data from unauthorized access, disclosure, or loss. All network communications are encrypted in transit. Passwords and security MPINs are securely protected and are never stored in plain readable text.
            </p>
          </section>

          {/* Section 6: Sharing & Disclosure */}
          <section className="doc-section">
            <h2 className="doc-h2">6. How We Share Information</h2>
            <p className="doc-p">
              <strong>We never sell, rent, or trade your personal data.</strong> Information is shared only in the following limited circumstances:
            </p>
            <ul className="doc-list">
              <li>
                <strong>With Your Workplace Administrator:</strong> When you join a workplace on Bizora, your attendance records, clock-in times, and basic profile info are visible to your workplace administrator or employer for payroll and workforce reporting.
              </li>
              <li>
                <strong>Trusted Infrastructure Providers:</strong> Managed database and cloud hosting providers under strict confidentiality agreements.
              </li>
              <li>
                <strong>Third-Party Advertising:</strong> Google AdMob, as disclosed in Section 2 above, for ad delivery.
              </li>
              <li>
                <strong>Legal Compliance:</strong> If required by valid court order, law enforcement inquiry, or applicable law.
              </li>
            </ul>
          </section>

          {/* Section 7: User Rights & Data Deletion */}
          <section className="doc-section">
            <h2 className="doc-h2">7. User Rights &amp; Account Deletion</h2>
            <p className="doc-p">
              You retain full control over your personal data. You have the right to:
            </p>
            <ul className="doc-list">
              <li>Access, export, or review all attendance and profile data associated with your account.</li>
              <li>Request correction of inaccurate personal information.</li>
              <li>
                <strong>Delete your account and records:</strong> You can request full account deletion directly within the mobile application settings or by contacting our data privacy team at{" "}
                <a href="mailto:support@bizora.shivamshankhdhar.online" style={{ color: "var(--brand)", fontWeight: 600 }}>
                  support@bizora.shivamshankhdhar.online
                </a>. Upon verification, your profile, authentication credentials, and personal records will be permanently purged from our active systems.
              </li>
            </ul>
          </section>

          {/* Section 8: Children's Privacy */}
          <section className="doc-section">
            <h2 className="doc-h2">8. Children&rsquo;s Privacy (COPPA)</h2>
            <p className="doc-p">
              Bizora is designed for workforce and commercial attendance management and is not directed at individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately so we can remove the data.
            </p>
          </section>

          {/* Section 9: Contact */}
          <section className="doc-section">
            <h2 className="doc-h2">9. Contact Us</h2>
            <p className="doc-p">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our AdMob disclosures, please contact us:
            </p>
            <div className="doc-meta-bar" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span><strong>Product:</strong> Bizora (Workforce Attendance OS)</span>
              <span>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@bizora.shivamshankhdhar.online" style={{ color: "var(--brand)", fontWeight: 600 }}>
                  support@bizora.shivamshankhdhar.online
                </a>
              </span>
              <span><strong>Website:</strong> https://www.bizora.shivamshankhdhar.online</span>
            </div>
          </section>

          {/* Bottom navigation */}
          <div className="footer-nav">
            <Link href="/">Home</Link>
            <span>&bull;</span>
            <Link href="/about">About Bizora</Link>
            <span>&bull;</span>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
