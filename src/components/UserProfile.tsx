import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { User, Calendar, Clock, LogOut, ChevronDown, ChevronUp } from 'lucide-react'
import moment from 'moment'
import type { Database } from '@/lib/supabase'

type Booking = Database['public']['Tables']['bookings']['Row']

interface UserProfileProps {
  user: any
  onSignOut: () => void
}

export default function UserProfile({ user, onSignOut }: UserProfileProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [showBookings, setShowBookings] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchBookings()
  }, [user])

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your bookings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onSignOut()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow text-yellow-foreground'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-lg text-secondary">{user.user_metadata?.full_name || user.email}</CardTitle>
                <CardDescription className="text-sm">{user.email}</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Calendar className="w-5 h-5 text-secondary" />
                My Bookings ({bookings.length})
              </CardTitle>
              <CardDescription>
                View and manage your lesson appointments
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBookings(!showBookings)}
            >
              {showBookings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        
        {showBookings && (
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bookings yet</p>
                <p className="text-sm">Book your first lesson below!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold capitalize">{booking.lesson_type}</h4>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {moment(booking.booking_date + ' ' + booking.booking_time).format('MMM Do, YYYY [at] h:mm A')}
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="text-sm text-muted-foreground">{booking.notes}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Booked on {moment(booking.created_at).format('MMM Do, YYYY')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}