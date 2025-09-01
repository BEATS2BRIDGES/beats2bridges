import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonorInfo {
  name: string;
  email: string;
  phone?: string;
  instrumentType: string;
  condition?: string;
  description?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, donorInfo }: { type: string; donorInfo: DonorInfo } = await req.json();

    if (type !== "instrument") {
      throw new Error("Invalid donation type");
    }

    const emailContent = `
      <h2>New Instrument Donation Request</h2>
      <p><strong>Donor Information:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${donorInfo.name}</li>
        <li><strong>Email:</strong> ${donorInfo.email}</li>
        <li><strong>Phone:</strong> ${donorInfo.phone || "Not provided"}</li>
      </ul>
      
      <p><strong>Instrument Details:</strong></p>
      <ul>
        <li><strong>Type:</strong> ${donorInfo.instrumentType}</li>
        <li><strong>Condition:</strong> ${donorInfo.condition || "Not specified"}</li>
      </ul>
      
      ${donorInfo.description ? `<p><strong>Additional Details:</strong><br>${donorInfo.description}</p>` : ""}
      
      <p>Please contact the donor to arrange pickup/delivery of the instrument.</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Beats2Bridges <noreply@beats2bridges.org>",
        to: ["beats2bridges@gmail.com"],
        subject: `New Instrument Donation: ${donorInfo.instrumentType}`,
        html: emailContent,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});