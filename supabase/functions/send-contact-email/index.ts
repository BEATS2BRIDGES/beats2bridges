import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactInfo: ContactInfo = await req.json();

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Contact Information:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${contactInfo.name}</li>
        <li><strong>Email:</strong> ${contactInfo.email}</li>
        <li><strong>Phone:</strong> ${contactInfo.phone || "Not provided"}</li>
        <li><strong>Subject:</strong> ${contactInfo.subject}</li>
      </ul>
      
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007cba; margin: 15px 0;">
        ${contactInfo.message.replace(/\n/g, '<br>')}
      </div>
      
      <p><strong>Reply to:</strong> ${contactInfo.email}</p>
    `;

    await resend.emails.send({
      from: 'Beats2Bridges <onboarding@resend.dev>',
      to: ['beats2bridges@gmail.com'],
      subject: `Contact Form: ${contactInfo.subject}`,
      html: emailContent,
      replyTo: contactInfo.email,
    });

    console.log("Contact email sent successfully for:", contactInfo.name);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});