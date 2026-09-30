import type { Metadata } from "next";
import Link from "next/link";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
import {
  IoQrCodeOutline,
  IoShieldCheckmarkOutline,
  IoAnalyticsOutline,
  IoPhonePortraitOutline,
  IoLockClosedOutline,
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "About Bizora — Workforce Attendance OS",
  description:
    "Learn about Bizora: smart QR attendance, bank-grade security, live workforce analytics, and seamless shift management.",
};

export default function AboutPage() {
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "#";

  return (
    <main className="doc-page">
      <div className="doc-container">
        <div className="doc-card">
          {/* Top navigation */}
          <div className="doc-nav-bar">
            <Link href="/" className="doc-nav-link" id="about-back-home">
              <IoArrowBackOutline style={{ fontSize: 16 }} /> Back to Bizora
            </Link>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link href="/privacy" className="doc-nav-link" id="about-to-privacy">
                Privacy Policy
              </Link>
            </div>
          </div>

          <BizoraWordmark />

          {/* Header */}
          <div className="doc-header">
            <div className="doc-badge">
              <IoShieldCheckmarkOutline style={{ fontSize: 14 }} /> Platform Overview
            </div>
            <h1 className="doc-title">About Bizora</h1>
            <p className="doc-subtitle">
              The modern attendance operating system built for fast, transparent, and secure workforce management.
            </p>
          </div>

          {/* Mission statement */}
          <section className="doc-section">
            <h2 className="doc-h2">Our Mission</h2>
            <p className="doc-p">
              Traditional paper registers, magnetic punch cards, and complicated biometric kiosks slow down operations and suffer from buddy-punching or data loss. Bizora replaces obsolete timeclocks with an elegant, mobile-first attendance platform that works seamlessly across smartphones, QR terminals, and desktop dashboards.
            </p>
            <p className="doc-p">
              Whether you are managing a small retail team, a medical clinic, a school faculty, or a distributed construction enterprise, Bizora empowers employers with instant visibility while giving employees a frictionless, transparent way to verify their hours.
            </p>
          </section>

          {/* Key Features Grid */}
          <section className="doc-section">
            <h2 className="doc-h2">Core Pillars</h2>
            <div className="doc-grid">
              <div className="doc-feature-card">
                <div className="doc-feature-icon">
                  <IoQrCodeOutline />
                </div>
                <div className="doc-feature-title">Smart QR Clock-In</div>
                <div className="doc-feature-desc">
                  Instant, tamper-proof QR scanning. Clock in or out in under 2 seconds with automatic shift calculation.
                </div>
              </div>

              <div className="doc-feature-card">
                <div className="doc-feature-icon">
                  <IoLockClosedOutline />
                </div>
                <div className="doc-feature-title">Bank-Grade Security</div>
                <div className="doc-feature-desc">
                  MPIN protection, Face ID &amp; Fingerprint biometric locking, and secure credential protection.
                </div>
              </div>

              <div className="doc-feature-card">
                <div className="doc-feature-icon">
                  <IoAnalyticsOutline />
                </div>
                <div className="doc-feature-title">Live Analytics &amp; Reports</div>
                <div className="doc-feature-desc">
                  Real-time workforce presence dashboard with 1-tap professional PDF, CSV, and Excel export.
                </div>
              </div>

              <div className="doc-feature-card">
                <div className="doc-feature-icon">
                  <IoPhonePortraitOutline />
                </div>
                <div className="doc-feature-title">Multi-Workplace &amp; Offline</div>
                <div className="doc-feature-desc">
                  Switch effortlessly between multiple businesses and clock in reliably even when network connectivity drops.
                </div>
              </div>
            </div>
          </section>

          {/* Security Deep Dive */}
          <section className="doc-section">
            <h2 className="doc-h2">Security &amp; Privacy Architecture</h2>
            <div className="doc-callout">
              <div className="doc-callout-title">
                <IoCheckmarkCircleOutline style={{ fontSize: 16 }} /> Privacy-First Philosophy
              </div>
              <p className="doc-callout-text">
                Your attendance and employee data belongs to you. Bizora never sells or trades user data. Camera feeds are processed strictly in device memory for QR code decoding and are never uploaded or recorded.
              </p>
            </div>
            <p className="doc-p">
              Bizora is architected with defense-in-depth security:
            </p>
            <ul className="doc-list">
              <li><strong>Encrypted Connections:</strong> All app communications are protected using secure HTTPS encryption.</li>
              <li><strong>Secure MPIN &amp; Passwords:</strong> Security keys and MPINs are protected with strong encryption and are never stored in readable text.</li>
              <li><strong>Secure Enclave Biometrics:</strong> Biometric authentication takes place directly on your phone&rsquo;s hardware enclave without sending raw biometrics over the wire.</li>
              <li><strong>Role-Based Access Control:</strong> Strict separation of employer, manager, and employee privileges prevents unauthorized data exposure.</li>
            </ul>
          </section>

          {/* Download App CTA */}
          <section className="doc-section" style={{ gap: 14 }}>
            <h2 className="doc-h2">Get Started with Bizora</h2>
            <p className="doc-p">
              Download the Bizora app on your mobile device to join your workplace or set up your team in minutes.
            </p>
            <div className="store-badge-wrap" style={{ maxWidth: 320 }}>
              <PlayStoreBadge href={playStoreUrl} id="about-playstore-btn" />
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
