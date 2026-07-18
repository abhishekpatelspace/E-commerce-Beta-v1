/**
 * Google Sheets Form Submission via Google Apps Script
 * 
 * HOW TO SET UP:
 * 1. Go to https://sheets.google.com and create a new spreadsheet
 * 2. Name the columns in Row 1: Timestamp | Name | Email | Type | Company | Message
 * 3. Go to Extensions → Apps Script
 * 4. Paste the code from GOOGLE_APPS_SCRIPT.md into the script editor
 * 5. Click Deploy → New Deployment → Web App
 * 6. Set "Execute as" = Me, "Who has access" = Anyone
 * 7. Copy the Web App URL and paste it in your .env.local file as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

export interface EnquiryData {
  name: string;
  email: string;
  type: string;
  company: string;
  message: string;
}

export async function submitToGoogleSheet(data: EnquiryData): Promise<{ success: boolean; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Google Script URL not configured. Set NEXT_PUBLIC_GOOGLE_SCRIPT_URL in .env.local");
    // Return success in demo mode so the UI still works
    return { success: true };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Google Apps Script requires no-cors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        type: data.type,
        company: data.company || "N/A",
        message: data.message,
      }),
    });

    // With no-cors mode, we can't read the response, but if fetch didn't throw, it was sent
    return { success: true };
  } catch (error) {
    console.error("Failed to submit to Google Sheet:", error);
    return { success: false, error: "Failed to send enquiry. Please try again." };
  }
}
