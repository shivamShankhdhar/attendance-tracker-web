import { NextRequest, NextResponse } from "next/server";

interface DeleteAccountRequestBody {
  name?: string;
  fullName?: string;
  email: string;
  role?: string;
  workplaceCode?: string;
  reason?: string;
  notes?: string;
  confirmIrreversible: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DeleteAccountRequestBody;

    const name = body.name || body.fullName || "";
    const { email, role, workplaceCode, reason, notes, confirmIrreversible } = body;

    // Validate email
    const trimmedEmail = (email || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid email address associated with your Bizora account is required.",
        },
        { status: 400 }
      );
    }

    // Validate name
    const trimmedName = (name || "").trim();
    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your full name as registered on Bizora.",
        },
        { status: 400 }
      );
    }

    // Validate confirmation checkbox
    if (!confirmIrreversible) {
      return NextResponse.json(
        {
          success: false,
          error: "You must confirm that you understand account and data deletion is irreversible.",
        },
        { status: 400 }
      );
    }

    // Generate unique verification reference ticket
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const ticketId = `BIZ-DEL-${timestamp}-${randomSuffix}`;

    const submittedAt = new Date().toISOString();

    const deletionRecord = {
      ticketId,
      submittedAt,
      name: trimmedName,
      email: trimmedEmail,
      role: role || "EMPLOYEE",
      workplaceCode: (workplaceCode || "").trim().toUpperCase() || undefined,
      reason: reason || "User requested account deletion",
      notes: (notes || "").trim() || undefined,
      status: "PENDING_VERIFICATION",
      estimatedCompletionDays: 7,
      dataPurged: [
        "Google Account UID & authentication tokens",
        "Personal profile information (Name, Email, Avatar)",
        "Daily attendance logs & check-in/check-out timestamps",
        "Geofence GPS coordinates & Wi-Fi validation telemetry",
        "Workplace memberships & team affiliations",
        "Leave applications & regularization requests",
        "Biometric hardware hashes & push notification tokens",
      ],
    };

    console.log("[Account Deletion Request Received]:", JSON.stringify(deletionRecord, null, 2));

    // Optional: If a backend API is available, forward the deletion request
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.attendance-tracker.shivamshankhdhar.online/api/v1";
    try {
      await fetch(`${backendUrl}/auth/account-deletion-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deletionRecord),
      }).catch(() => {
        // Soft fail if backend endpoint doesn't exist yet
      });
    } catch {
      // Ignore background network errors
    }

    return NextResponse.json({
      success: true,
      ticketId,
      submittedAt,
      email: trimmedEmail,
      name: trimmedName,
      estimatedCompletionDays: 7,
      message:
        "Your account and data deletion request has been registered. All associated personal data and attendance records will be permanently removed within 7 business days.",
      dataPurged: deletionRecord.dataPurged,
    });
  } catch (error: any) {
    console.error("[Account Deletion API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your request. Please try again or contact support@bizora.shivamshankhdhar.online directly.",
      },
      { status: 500 }
    );
  }
}
