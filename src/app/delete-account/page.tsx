import type { Metadata } from "next";
import Link from "next/link";
import { BizoraWordmark } from "@/components/BrandLogo";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import {
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
  IoTrashOutline,
  IoLockClosedOutline,
  IoInformationCircleOutline,
  IoTimeOutline,
  IoPhonePortraitOutline,
  IoDocumentTextOutline,
  IoWarningOutline,
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "Account & Data Deletion — Bizora",
  description:
    "Request permanent deletion of your Bizora account, personal data, attendance logs, and credentials in accordance with Google Play Developer Policies.",
};

export default function DeleteAccountPage() {
  return (
    <main className="doc-page">
      <div className="doc-container">
        <div className="doc-card">
          {/* Top navigation */}
          <div className="doc-nav-bar">
            <Link href="/" className="doc-nav-link" id="del-back-home">
              <IoArrowBackOutline style={{ fontSize: 16 }} /> Back to Bizora
            </Link>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link href="/about" className="doc-nav-link" id="del-to-about">
                About
              </Link>
              <Link href="/privacy" className="doc-nav-link" id="del-to-privacy">
                Privacy Policy
              </Link>
            </div>
          </div>

          <BizoraWordmark />

          {/* Header */}
          <div className="doc-header">
            <div className="doc-badge" style={{ background: "#FEF2F2", color: "#DC2626", borderColor: "#FECACA" }}>
              <IoShieldCheckmarkOutline style={{ fontSize: 14 }} /> Data Governance &amp; User Rights
            </div>
            <h1 className="doc-title">Request Account &amp; Data Deletion</h1>
            <p className="doc-subtitle">
              In accordance with Google Play Developer Policy and global data protection standards, you have the right to request permanent deletion of your Bizora account and all associated attendance and personal data.
            </p>
          </div>

          <div className="doc-meta-bar">
            <span><strong>Application:</strong> Bizora — Workforce Attendance OS (bizora.app)</span>
            <span><strong>Developer:</strong> Shivam Shankhdhar</span>
            <span><strong>Processing Time:</strong> Within 7 business days</span>
          </div>

          {/* Section 1: Overview */}
          <section className="doc-section">
            <h2 className="doc-h2">
              <IoInformationCircleOutline style={{ color: "var(--brand)" }} /> 1. How to Request Deletion
            </h2>
            <p className="doc-p">
              Users can request account deletion at any time without restriction, whether or not the mobile application is currently installed on their device. You may use either of the following two methods:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, marginTop: 8 }}>
              {/* Method A */}
              <div
                style={{
                  background: "var(--surface-muted)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "18px 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      background: "var(--brand-tint)",
                      color: "var(--brand)",
                      fontWeight: 700,
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                    }}
                  >
                    Method 1
                  </span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                    Submit the Online Request Form (No App Login Required)
                  </h3>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Fill out and submit the secure form below. This portal is open to all current and past users, employees, and administrators. A unique reference ticket will be generated immediately upon submission.
                </p>
              </div>

              {/* Method B */}
              <div
                style={{
                  background: "var(--surface-muted)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "18px 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      background: "#F3F4F6",
                      color: "#374151",
                      fontWeight: 700,
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                    }}
                  >
                    Method 2
                  </span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                    In-App Deletion Request (Instant)
                  </h3>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8 }}>
                  If you have the Bizora mobile app installed on your Android device:
                </p>
                <ol
                  style={{
                    paddingLeft: 22,
                    fontSize: 13,
                    color: "var(--text-primary)",
                    lineHeight: 1.6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <li>Open the <strong>Bizora</strong> app.</li>
                  <li>Tap the <strong>Profile</strong> tab in the bottom navigation bar.</li>
                  <li>Scroll to the <strong>Account &amp; Security</strong> section.</li>
                  <li>Tap <strong>Delete Account</strong> and confirm your decision in the prompt.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 2: Online Form Card */}
          <section className="doc-section" id="deletion-form-section">
            <h2 className="doc-h2">
              <IoTrashOutline style={{ color: "var(--danger)" }} /> 2. Online Deletion Request Form
            </h2>
            <p className="doc-p">
              Please enter your details below. We verify requests against our active database to ensure only authorized account holders can execute deletion.
            </p>

            <div style={{ marginTop: 8 }}>
              <DeleteAccountForm />
            </div>
          </section>

          {/* Section 3: Data Subject to Deletion */}
          <section className="doc-section">
            <h2 className="doc-h2">
              <IoDocumentTextOutline style={{ color: "var(--brand)" }} /> 3. What Data Is Deleted
            </h2>
            <p className="doc-p">
              When your deletion request is processed, the following categories of data are permanently and irreversibly purged from our active databases and cloud storage:
            </p>

            <ul className="doc-list">
              <li>
                <strong>Account Profile &amp; Identity:</strong> Your full name, account email address, Google OAuth Sub identifier, profile photo/avatar URL, and phone number.
              </li>
              <li>
                <strong>Authentication &amp; Security Tokens:</strong> Hashed MPIN codes, biometric verification tokens, session tokens, JWT refresh tokens, and FCM push notification tokens.
              </li>
              <li>
                <strong>Attendance &amp; Punch Logs:</strong> Daily check-in and check-out timestamps, shift duration logs, punch method records (QR scan, supervisor punch, or mobile punch).
              </li>
              <li>
                <strong>Geofence &amp; Verification Telemetry:</strong> Precise GPS coordinates captured during punch-in/out, office Wi-Fi SSID verification records, and hardware device identifiers.
              </li>
              <li>
                <strong>Workplace &amp; Team Memberships:</strong> Employee code, assigned team memberships, manager relationships, and pending workplace join invitations.
              </li>
              <li>
                <strong>Requests &amp; Records:</strong> Leave applications, attendance regularizations, overtime logs, and historical request notes.
              </li>
            </ul>
          </section>

          {/* Section 4: Data Retention Policy */}
          <section className="doc-section">
            <h2 className="doc-h2">
              <IoLockClosedOutline style={{ color: "var(--brand)" }} /> 4. Data Retention &amp; Legal Exceptions
            </h2>
            <div className="doc-callout">
              <div className="doc-callout-title">
                <IoWarningOutline style={{ fontSize: 16, color: "var(--pending)" }} /> Statutory Compliance &amp; Audit Logs
              </div>
              <p className="doc-callout-text">
                Under Google Play policy, apps must disclose if certain data must be retained for legal, financial, or tax compliance reasons.
              </p>
            </div>

            <p className="doc-p">
              In specific commercial enterprise deployments where Bizora is utilized as an employer-mandated time and wage tracking platform:
            </p>

            <ul className="doc-list">
              <li>
                <strong>Statutory Wage &amp; Labor Audit Records:</strong> If you are an employee of a registered organization, your workplace administrator may be legally required under local labor and taxation statutes to maintain payroll audit records for a retention period of <strong>up to 90 days</strong>.
              </li>
              <li>
                <strong>Anonymized Aggregates:</strong> Aggregated, non-identifiable numerical metrics (e.g. total workplace attendance count) that cannot be linked to any individual identity may be retained for platform performance reporting.
              </li>
              <li>
                <strong>Automated Expungement:</strong> Following the expiration of the statutory 90-day retention window, all archived backups and audit logs are automatically and permanently expunged.
              </li>
            </ul>
          </section>

          {/* Section 5: Timeline & Contact */}
          <section className="doc-section">
            <h2 className="doc-h2">
              <IoTimeOutline style={{ color: "var(--brand)" }} /> 5. Processing Timeline &amp; Support
            </h2>
            <p className="doc-p">
              Account deletion requests submitted via this web portal are acknowledged immediately with a tracking ticket ID and processed within <strong>7 business days</strong>.
            </p>
            <p className="doc-p">
              If you have any questions, require expedited deletion, or wish to follow up on an existing ticket, please reach out directly:
            </p>

            <div className="doc-meta-bar" style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              <span><strong>Data Privacy Officer:</strong> Shivam Shankhdhar</span>
              <span>
                <strong>Email:</strong>{" "}
                <a href="mailto:er.shivam1214@gmail.com" style={{ color: "var(--brand)", fontWeight: 600 }}>
                  er.shivam1214@gmail.com
                </a>
              </span>
              <span><strong>Product:</strong> Bizora (bizora.app)</span>
              <span><strong>Portal URL:</strong> https://www.bizora.shivamshankhdhar.online/delete-account</span>
            </div>
          </section>

          {/* Footer navigation */}
          <div className="footer-nav">
            <Link href="/">Home</Link>
            <span>&bull;</span>
            <Link href="/about">About Bizora</Link>
            <span>&bull;</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/delete-account" style={{ fontWeight: 700, color: "var(--brand)" }}>
              Delete Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
