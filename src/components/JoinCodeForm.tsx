"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractCodeFromInput } from "@/lib/api";
import { IoArrowForward, IoClipboardOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

interface Props {
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  buttonText?: string;
  compact?: boolean;
}

export default function JoinCodeForm({
  initialValue = "",
  placeholder = "Enter code (e.g. BWP-4821-102) or paste invite link",
  autoFocus = false,
  buttonText = "Preview & Join",
  compact = false,
}: Props) {
  const router = useRouter();
  const [inputVal, setInputVal] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pasted, setPasted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = extractCodeFromInput(inputVal);
    if (!clean) {
      setError("Please enter a valid workplace code, team code, or paste an invitation link.");
      return;
    }

    setError(null);
    setLoading(true);
    router.push(`/join?code=${encodeURIComponent(clean)}`);
  };

  const handlePaste = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          const clean = extractCodeFromInput(text);
          setInputVal(clean || text.trim());
          setPasted(true);
          setError(null);
          setTimeout(() => setPasted(false), 2000);
        }
      }
    } catch {
      // Clipboard permission denied or not supported
    }
  };

  return (
    <form onSubmit={handleSubmit} className="join-form-wrapper" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: compact ? "row" : "column",
          gap: 10,
          width: "100%",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={loading}
            className="join-input-field"
            style={{
              width: "100%",
              padding: "13px 80px 13px 14px",
              borderRadius: "var(--radius-md)",
              border: error ? "1.5px solid var(--danger)" : "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          />

          {/* Paste button inside input */}
          <button
            type="button"
            onClick={handlePaste}
            className="join-paste-btn"
            title="Paste from clipboard"
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: pasted ? "var(--success-tint)" : "var(--surface-muted)",
              color: pasted ? "var(--success)" : "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "5px 9px",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {pasted ? (
              <>
                <IoCheckmarkCircleOutline style={{ fontSize: 13 }} />
                <span>Pasted</span>
              </>
            ) : (
              <>
                <IoClipboardOutline style={{ fontSize: 13 }} />
                <span>Paste</span>
              </>
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="btn btn-primary"
          style={{
            padding: "13px 18px",
            fontSize: 14,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderRadius: "var(--radius-md)",
            cursor: loading || !inputVal.trim() ? "not-allowed" : "pointer",
            opacity: loading || !inputVal.trim() ? 0.65 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <span>{loading ? "Checking..." : buttonText}</span>
          <IoArrowForward style={{ fontSize: 16 }} />
        </button>
      </div>

      {error && (
        <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 6, fontWeight: 500 }}>
          {error}
        </p>
      )}

      {/* Helper tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginTop: 8,
          fontSize: 11,
          color: "var(--text-secondary)",
        }}
      >
        <span style={{ fontWeight: 600 }}>Supports:</span>
        <code style={{ background: "var(--surface-muted)", padding: "1px 6px", borderRadius: 4 }}>BWP-XXXX-XXX</code>
        <code style={{ background: "var(--surface-muted)", padding: "1px 6px", borderRadius: 4 }}>TMXXXXXX</code>
        <code style={{ background: "var(--surface-muted)", padding: "1px 6px", borderRadius: 4 }}>Shared invite links</code>
      </div>
    </form>
  );
}
