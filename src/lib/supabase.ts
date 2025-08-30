import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

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