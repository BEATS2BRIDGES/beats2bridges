import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname

    if (path === '/booking-approval/notify' && req.method === 'POST') {
      const { bookingId } = await req.json()
      
      // Get booking details
      const { data: booking, error: bookingError } = await supabaseClient
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single()

      if (bookingError || !booking) {
        console.error('Error fetching booking:', bookingError)
        return new Response(JSON.stringify({ error: 'Booking not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Send approval email
      const resendApiKey = Deno.env.get('RESEND_API_KEY')
      if (!resendApiKey) {
        console.error('RESEND_API_KEY not found')
        return new Response(JSON.stringify({ error: 'Email service not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const approveUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/booking-approval/approve?id=${bookingId}`
      const denyUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/booking-approval/deny?id=${bookingId}`

      const emailBody = `
        <h2>New Booking Request</h2>
        <p><strong>Student:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone || 'Not provided'}</p>
        <p><strong>Lesson Type:</strong> ${booking.lesson_type}</p>
        <p><strong>Date:</strong> ${booking.booking_date}</p>
        <p><strong>Time:</strong> ${booking.booking_time}</p>
        <p><strong>Notes:</strong> ${booking.notes || 'None'}</p>
        
        <div style="margin: 30px 0;">
          <a href="${approveUrl}" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">Approve Booking</a>
          <a href="${denyUrl}" style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Deny Booking</a>
        </div>
        
        <p style="font-size: 12px; color: #666;">This booking was submitted on ${new Date(booking.created_at).toLocaleString()}</p>
      `

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'bookings@musiclessons.com',
          to: ['admin@musiclessons.com'], // Replace with actual admin email
          subject: `New Booking Request - ${booking.name}`,
          html: emailBody,
        }),
      })

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text()
        console.error('Resend error:', errorText)
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (path === '/booking-approval/approve' && req.method === 'GET') {
      const bookingId = url.searchParams.get('id')
      
      if (!bookingId) {
        return new Response('Missing booking ID', { status: 400 })
      }

      const { error } = await supabaseClient
        .from('bookings')
        .update({ status: 'approved' })
        .eq('id', bookingId)

      if (error) {
        console.error('Error approving booking:', error)
        return new Response('Error approving booking', { status: 500 })
      }

      return new Response(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #22c55e;">✓ Booking Approved</h1>
            <p>The booking has been successfully approved.</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    if (path === '/booking-approval/deny' && req.method === 'GET') {
      const bookingId = url.searchParams.get('id')
      
      if (!bookingId) {
        return new Response('Missing booking ID', { status: 400 })
      }

      const { error } = await supabaseClient
        .from('bookings')
        .update({ status: 'denied' })
        .eq('id', bookingId)

      if (error) {
        console.error('Error denying booking:', error)
        return new Response('Error denying booking', { status: 500 })
      }

      return new Response(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #ef4444;">✗ Booking Denied</h1>
            <p>The booking has been denied.</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    return new Response('Not found', { status: 404 })

  } catch (error) {
    console.error('Function error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})