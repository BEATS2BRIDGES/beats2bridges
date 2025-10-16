import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@2.0.0'

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

      // Send approval email to admin
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

      const approveUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/booking-approval/approve?id=${bookingId}`
      const denyUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/booking-approval/deny?id=${bookingId}`

      const bookingDate = new Date(booking.booking_date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      const bookingTime = new Date(`2000-01-01T${booking.booking_time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">New Booking Request 📅</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Student Information</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
            <p><strong>Phone:</strong> ${booking.phone || 'Not provided'}</p>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">Lesson Details</h3>
            <p><strong>Lesson Type:</strong> ${booking.lesson_type.charAt(0).toUpperCase() + booking.lesson_type.slice(1)}</p>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Time:</strong> ${bookingTime}</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <div style="margin: 40px 0; text-align: center;">
            <a href="${approveUrl}" style="display: inline-block; background: #22c55e; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 0 10px; font-weight: bold;">✓ Approve Booking</a>
            <a href="${denyUrl}" style="display: inline-block; background: #ef4444; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 0 10px; font-weight: bold;">✗ Deny Booking</a>
          </div>
          
          <p style="font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px;">
            Submitted on ${new Date(booking.created_at).toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}
          </p>
        </div>
      `

      try {
        await resend.emails.send({
          from: 'BEATS2BRIDGES <onboarding@resend.dev>',
          to: ['beats2bridges@gmail.com'],
          subject: `New Booking Request - ${booking.name} (${booking.lesson_type})`,
          html: emailBody,
        })
        
        console.log('Admin notification email sent successfully')
      } catch (emailError) {
        console.error('Resend error:', emailError)
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

      // Get booking details before updating
      const { data: booking } = await supabaseClient
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single()

      if (!booking) {
        return new Response('Booking not found', { status: 404 })
      }

      // Update booking status to confirmed
      const { error } = await supabaseClient
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId)

      if (error) {
        console.error('Error approving booking:', error)
        return new Response('Error approving booking', { status: 500 })
      }

      // Send confirmation email to user
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
      
      const bookingDate = new Date(booking.booking_date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      const bookingTime = new Date(`2000-01-01T${booking.booking_time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

      const userEmailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #22c55e;">🎉 Your Booking is Confirmed!</h1>
          
          <p>Hi ${booking.name},</p>
          
          <p>Great news! Your ${booking.lesson_type} lesson has been approved and confirmed.</p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #166534;">Lesson Details</h3>
            <p><strong>Lesson Type:</strong> ${booking.lesson_type.charAt(0).toUpperCase() + booking.lesson_type.slice(1)}</p>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Time:</strong> ${bookingTime}</p>
          </div>
          
          <p>We're looking forward to seeing you! If you need to make any changes, please contact us at beats2bridges@gmail.com.</p>
          
          <p style="margin-top: 30px;">See you soon!<br><strong>BEATS2BRIDGES Team</strong></p>
        </div>
      `

      try {
        await resend.emails.send({
          from: 'BEATS2BRIDGES <onboarding@resend.dev>',
          to: [booking.email],
          subject: '✓ Your Lesson is Confirmed!',
          html: userEmailBody,
        })
        console.log('User confirmation email sent successfully')
      } catch (emailError) {
        console.error('Error sending user email:', emailError)
      }

      return new Response(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0fdf4;">
            <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h1 style="color: #22c55e; font-size: 48px; margin: 0;">✓</h1>
              <h2 style="color: #166534; margin: 20px 0;">Booking Approved</h2>
              <p style="color: #4b5563; font-size: 16px;">The booking has been successfully approved and the student has been notified.</p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">Student: ${booking.name}<br>${bookingDate} at ${bookingTime}</p>
            </div>
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

      // Get booking details before updating
      const { data: booking } = await supabaseClient
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single()

      if (!booking) {
        return new Response('Booking not found', { status: 404 })
      }

      // Update booking status to cancelled
      const { error } = await supabaseClient
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)

      if (error) {
        console.error('Error denying booking:', error)
        return new Response('Error denying booking', { status: 500 })
      }

      // Send denial email to user
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
      
      const bookingDate = new Date(booking.booking_date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      const bookingTime = new Date(`2000-01-01T${booking.booking_time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

      const userEmailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ef4444;">Booking Update</h1>
          
          <p>Hi ${booking.name},</p>
          
          <p>Thank you for your interest in BEATS2BRIDGES. Unfortunately, we're unable to accommodate your booking request at this time.</p>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #991b1b;">Requested Booking</h3>
            <p><strong>Lesson Type:</strong> ${booking.lesson_type.charAt(0).toUpperCase() + booking.lesson_type.slice(1)}</p>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Time:</strong> ${bookingTime}</p>
          </div>
          
          <p>Please feel free to submit another booking request for a different time slot, or contact us directly at beats2bridges@gmail.com to discuss alternative options.</p>
          
          <p style="margin-top: 30px;">Thank you for your understanding.<br><strong>BEATS2BRIDGES Team</strong></p>
        </div>
      `

      try {
        await resend.emails.send({
          from: 'BEATS2BRIDGES <onboarding@resend.dev>',
          to: [booking.email],
          subject: 'Booking Update - Unable to Confirm',
          html: userEmailBody,
        })
        console.log('User denial email sent successfully')
      } catch (emailError) {
        console.error('Error sending user email:', emailError)
      }

      return new Response(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #fef2f2;">
            <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h1 style="color: #ef4444; font-size: 48px; margin: 0;">✗</h1>
              <h2 style="color: #991b1b; margin: 20px 0;">Booking Denied</h2>
              <p style="color: #4b5563; font-size: 16px;">The booking has been denied and the student has been notified.</p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">Student: ${booking.name}<br>${bookingDate} at ${bookingTime}</p>
            </div>
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