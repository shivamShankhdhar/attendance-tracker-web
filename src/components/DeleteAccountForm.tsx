"use client";

import { useState } from "react";
import {
  IoTrashOutline,
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoMailOutline,
  IoPersonOutline,
  IoBusinessOutline,
  IoTimeOutline,
  IoRefreshOutline,
} from "react-icons/io5";

interface SubmissionResult {
  ticketId: string;
  email: string;
  submittedAt: string;
  estimatedCompletionDays: number;
  dataPurged: string[];
}

export default function DeleteAccountForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [workplaceCode, setWorkplaceCode] = useState("");
  const [reason, setReason] = useState("No longer using the app");
  const [notes, setNotes] = useState("");
  const [confirmIrreversible, setConfirmIrreversible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid account email address.");
      return;
    }

    if (!confirmIrreversible) {
      setError("Please check the confirmation box to authorize permanent account deletion.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          workplaceCode: workplaceCode.trim(),
          reason,
          notes: notes.trim(),
          confirmIrreversible,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setResult({
        ticketId: data.ticketId,
        email: data.email,
        submittedAt: data.submittedAt,
        estimatedCompletionDays: data.estimatedCompletionDays || 7,
        dataPurged: data.dataPurged || [],
      });
    } catch (err: any) {
      setError(err.message || "Failed to process deletion request. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setWorkplaceCode("");
    setNotes("");
    setConfirmIrreversible(false);
    setResult(null);
    setError(null);
  };

  if (result) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "2px solid #A7F3D0",
          borderRadius: "var(--radius-xl)",
          padding: "32px 24px",
          boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#ECFDF5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#059669",
              flexShrink: 0,
            }}
          >
            <IoCheckmarkCircle style={{ fontSize: 32 }} />
          </div>
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "3px 8px",
                borderRadius: 999,
                background: "#DEF7EC",
                color: "#03543F",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Request Submitted
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>
              Account Deletion Registered
            </h3>
          </div>
        </div>

        <div
          style={{
            background: "var(--surface-muted)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
              Tracking Ticket ID:
            </span>
            <code
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--brand)",
                background: "var(--brand-tint)",
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              {result.ticketId}
            </code>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
              Target Account:
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
              {result.email}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
              Estimated Turnaround:
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
              Within {result.estimatedCompletionDays} business days
            </span>
          </div>
        </div>

        <div>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "var(--text-secondary)",
              marginBottom: 8,
            }}
          >
            Data Scheduled For Permanent Purge
          </h4>
          <ul
            style={{
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 13,
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            {result.dataPurged.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding: "12px 14px",
            background: "#EFF6FF",
            borderRadius: "var(--radius-md)",
            border: "1px solid #BFDBFE",
            fontSize: 12.5,
            color: "#1E40AF",
            lineHeight: 1.5,
          }}
        >
          A confirmation record has been logged. You can quote ticket <strong>{result.ticketId}</strong> to{" "}
          <a
            href="mailto:support@bizora.shivamshankhdhar.online"
            style={{ fontWeight: 700, textDecoration: "underline" }}
          >
            support@bizora.shivamshankhdhar.online
          </a>{" "}
          if you have any questions or need immediate verification.
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn-ghost"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            width: "100%",
          }}
        >
          <IoRefreshOutline style={{ fontSize: 16 }} /> Submit Another Deletion Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        padding: "28px 24px",
        boxShadow: "var(--shadow)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "var(--radius-md)",
            background: "var(--danger-tint)",
            color: "var(--danger)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoTrashOutline style={{ fontSize: 20 }} />
        </div>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>
            Online Account Deletion Form
          </h3>
          <p style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>
            Submit your details below to initiate account and data purge.
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            background: "var(--danger-tint)",
            border: "1px solid #FECACA",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            color: "var(--danger)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          <IoAlertCircleOutline style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Name Input */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="del-name"
          style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}
        >
          Full Name <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <div style={{ position: "relative" }}>
          <IoPersonOutline
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              fontSize: 16,
            }}
          />
          <input
            id="del-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Shivam Augustya"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px 14px 11px 36px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Email Input */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="del-email"
          style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}
        >
          Account Email Address <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <div style={{ position: "relative" }}>
          <IoMailOutline
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              fontSize: 16,
            }}
          />
          <input
            id="del-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. shivam@example.com"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px 14px 11px 36px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
            }}
          />
        </div>
        <span style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>
          Must match the Google account or email used to log in to Bizora.
        </span>
      </div>

      {/* Role Selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
          Your Role in Bizora
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button
            type="button"
            onClick={() => setRole("EMPLOYEE")}
            style={{
              padding: "10px",
              borderRadius: "var(--radius-md)",
              border: role === "EMPLOYEE" ? "2px solid var(--brand)" : "1.5px solid var(--border)",
              background: role === "EMPLOYEE" ? "var(--brand-tint)" : "var(--surface)",
              color: role === "EMPLOYEE" ? "var(--brand)" : "var(--text-primary)",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.15s ease",
            }}
          >
            Employee / Member
          </button>
          <button
            type="button"
            onClick={() => setRole("ORGANIZATION_OWNER")}
            style={{
              padding: "10px",
              borderRadius: "var(--radius-md)",
              border: role === "ORGANIZATION_OWNER" ? "2px solid var(--brand)" : "1.5px solid var(--border)",
              background: role === "ORGANIZATION_OWNER" ? "var(--brand-tint)" : "var(--surface)",
              color: role === "ORGANIZATION_OWNER" ? "var(--brand)" : "var(--text-primary)",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.15s ease",
            }}
          >
            Organization Owner
          </button>
        </div>
      </div>

      {/* Optional Workplace Code */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="del-wp"
          style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}
        >
          Workplace Code or Name <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-secondary)" }}>(optional)</span>
        </label>
        <div style={{ position: "relative" }}>
          <IoBusinessOutline
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              fontSize: 16,
            }}
          />
          <input
            id="del-wp"
            type="text"
            value={workplaceCode}
            onChange={(e) => setWorkplaceCode(e.target.value)}
            placeholder="e.g. BWP-4821-102 or Company Name"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px 14px 11px 36px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Reason for Deletion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="del-reason"
          style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}
        >
          Primary Reason for Deletion
        </label>
        <select
          id="del-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: "var(--radius-md)",
            border: "1.5px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-primary)",
            fontSize: 13.5,
            fontWeight: 500,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="No longer using the app">No longer using the app</option>
          <option value="Left the company or workplace">Left the company or workplace</option>
          <option value="Privacy or data concerns">Privacy or data governance concerns</option>
          <option value="Switching to another device/email">Switching to another device / account</option>
          <option value="Organization shutdown">Organization shutdown or migrated</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Irreversible Confirmation Checkbox */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "12px 14px",
          background: "var(--surface-muted)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border)",
        }}
      >
        <input
          id="del-confirm"
          type="checkbox"
          checked={confirmIrreversible}
          onChange={(e) => setConfirmIrreversible(e.target.checked)}
          disabled={loading}
          style={{
            width: 18,
            height: 18,
            marginTop: 2,
            accentColor: "var(--danger)",
            cursor: "pointer",
          }}
        />
        <label
          htmlFor="del-confirm"
          style={{
            fontSize: 12.5,
            color: "var(--text-primary)",
            lineHeight: 1.5,
            cursor: "pointer",
          }}
        >
          <strong>I confirm permanent deletion.</strong> I understand that this action is irreversible and all my attendance records, shift histories, geofence logs, and profile credentials will be permanently erased.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "var(--danger)",
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: 700,
          padding: "13px 20px",
          borderRadius: "var(--radius-md)",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 14px rgba(220, 38, 38, 0.25)",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.15s ease",
        }}
      >
        {loading ? (
          <>
            <IoRefreshOutline style={{ fontSize: 18, animation: "spin 1s linear infinite" }} />
            Processing Request...
          </>
        ) : (
          <>
            <IoTrashOutline style={{ fontSize: 18 }} />
            Submit Account Deletion Request
          </>
        )}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          color: "var(--text-secondary)",
        }}
      >
        <IoTimeOutline style={{ fontSize: 14 }} />
        <span>Processed within 7 business days</span>
      </div>
    </form>
  );
}
