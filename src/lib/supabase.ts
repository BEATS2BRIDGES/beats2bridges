import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gwdgiooebvytnphlfljr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZGdpb29lYnZ5dG5waGxmbGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1OTEwMjgsImV4cCI6MjA3MjE2NzAyOH0.m8SIzr6JsRrULf-4A5HIvrCEVd8gN8geIUM1ZSLzajI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          lesson_type: string
          notes: string | null
          booking_date: string
          booking_time: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          lesson_type: string
          notes?: string | null
          booking_date: string
          booking_time: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          lesson_type?: string
          notes?: string | null
          booking_date?: string
          booking_time?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}