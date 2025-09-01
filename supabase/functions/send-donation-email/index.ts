import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    await resend.emails.send({
      from: 'Beats2Bridges <onboarding@resend.dev>',
      to: ['anayt1107@gmail.com'],
      subject: `New Instrument Donation: ${donorInfo.instrumentType}`,
      html: emailContent,
    });

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