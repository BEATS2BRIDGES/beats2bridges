import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, Users, Music, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Auth from "@/components/Auth";
import UserProfile from "@/components/UserProfile";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Booking = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lessonType: "",
    notes: ""
  });
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: boolean}>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sample existing events
  const existingEvents = [
    {
      id: 1,
      title: "Community Workshop",
      start: new Date(2024, 2, 15, 14, 0),
      end: new Date(2024, 2, 15, 16, 0),
      resource: "booked"
    },
    {
      id: 2,
      title: "DJ Performance", 
      start: new Date(2024, 2, 22, 19, 0),
      end: new Date(2024, 2, 22, 22, 0),
      resource: "booked"
    }
  ];

  // Add selected slot as a temporary event if one exists
  const events = selectedSlot 
    ? [...existingEvents, {
        id: 'selected',
        title: 'Selected Time Slot',
        start: selectedSlot.start,
        end: selectedSlot.end,
        resource: 'selected'
      }]
    : existingEvents;

  // Check if a time slot is available
  const isTimeAvailable = (date: Date): boolean => {
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (isWeekend) {
      return hour >= 8 && hour < 20; // 8am-8pm weekends
    } else {
      return hour >= 18 && hour < 20; // 6pm-8pm weekdays
    }
  };

  // Generate unavailable time slots for visual blocking
  const generateUnavailableSlots = () => {
    const slots = [];
    const now = new Date();
    const today = new Date();
    
    // Generate for next 30 days
    for (let d = 0; d < 30; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + d);
      
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Find continuous blocks of unavailable time
      let blockStart = null;
      let blockType = null;
      
      for (let h = 6; h <= 22; h++) {
        const slotStart = new Date(currentDate);
        slotStart.setHours(h, 0, 0, 0);
        
        // Mark as unavailable if: 1) past time, 2) outside business hours
        const isPastTime = slotStart < now;
        const isOutsideBusinessHours = !isTimeAvailable(slotStart);
        const isUnavailable = isPastTime || isOutsideBusinessHours;
        const currentType = isPastTime ? 'Past' : 'Unavailable';
        
        if (isUnavailable) {
          if (!blockStart || blockType !== currentType) {
            // Start new block or type changed
            if (blockStart) {
              // Finish previous block
              const blockEnd = new Date(currentDate);
              blockEnd.setHours(h, 0, 0, 0);
              slots.push({
                id: `unavailable-${d}-${blockStart.getHours()}-${h-1}`,
                title: '',
                start: blockStart,
                end: blockEnd,
                resource: 'unavailable'
              });
            }
            blockStart = new Date(slotStart);
            blockType = currentType;
          }
        } else {
          // Available time - close any open block
          if (blockStart) {
            const blockEnd = new Date(currentDate);
            blockEnd.setHours(h, 0, 0, 0);
            slots.push({
              id: `unavailable-${d}-${blockStart.getHours()}-${h-1}`,
              title: '',
              start: blockStart,
              end: blockEnd,
              resource: 'unavailable'
            });
            blockStart = null;
            blockType = null;
          }
        }
      }
      
      // Close any remaining block at end of day
      if (blockStart) {
        const blockEnd = new Date(currentDate);
        blockEnd.setHours(22, 0, 0, 0);
        slots.push({
          id: `unavailable-${d}-${blockStart.getHours()}-22`,
          title: '',
          start: blockStart,
          end: blockEnd,
          resource: 'unavailable'
        });
      }
    }
    return slots;
  };

  const unavailableSlots = generateUnavailableSlots();
  const allEvents = [...events, ...unavailableSlots];

  const lessonTypes = [
    { value: "guitar", label: "Guitar" },
    { value: "piano", label: "Piano" },
    { value: "vocals", label: "Vocals" },
    { value: "saxophone", label: "Saxophone" },
    { value: "trumpet", label: "Trumpet" },
    { value: "violin", label: "Violin" },
    { value: "percussion", label: "Percussion" },
    { value: "mridangam", label: "Mridangam" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectEvent = (event: any) => {
    if (event.resource === 'unavailable') return;
    
    if (event.resource === 'booked') {
      toast({
        title: "Time Slot Unavailable",
        description: `This time slot is already booked: ${moment(event.start).format('MMMM Do, YYYY [at] h:mm A')}`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Event Details",
        description: `${event.title} - ${moment(event.start).format('MMMM Do, YYYY [at] h:mm A')}`,
      });
    }
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const now = new Date();
    
    // Check if the selected time is in the past
    if (start < now) {
      toast({
        title: "Time Unavailable",
        description: "Cannot book appointments in the past.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isTimeAvailable(start)) {
      toast({
        title: "Time Unavailable",
        description: "Available hours: Weekdays 6PM-8PM, Weekends 8AM-8PM",
        variant: "destructive"
      });
      return;
    }

    // Create 1-hour slot
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    
    // Check if slot conflicts with existing bookings
    const hasConflict = existingEvents.some(event => {
      return (start < event.end && end > event.start);
    });
    
    if (hasConflict) {
      toast({
        title: "Time Slot Conflict",
        description: "This time overlaps with an existing booking.",
        variant: "destructive"
      });
      return;
    }

    setSelectedSlot({ start, end });
    setFieldErrors({}); // Clear any field errors when slot is selected
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast({
        title: "Please select a time slot",
        description: "Click on an available time slot in the calendar.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book a lesson.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const bookingData = {
        user_id: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lesson_type: formData.lessonType,
        notes: formData.notes,
        booking_date: moment(selectedSlot.start).format('YYYY-MM-DD'),
        booking_time: moment(selectedSlot.start).format('HH:mm:ss'),
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;

      // Send approval email to admin
      try {
        await supabase.functions.invoke('booking-approval/notify', {
          body: { bookingId: data.id }
        });
      } catch (emailError) {
        console.error('Error sending approval email:', emailError);
        // Don't fail the booking if email fails
      }

      toast({
        title: "Booking Request Submitted!",
        description: "We'll send you a confirmation text + email within 24hrs.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        lessonType: "",
        notes: ""
      });
      setSelectedSlot(null);
      setFieldErrors({});
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const eventStyleGetter = (event: any) => {
    let backgroundColor = 'hsl(var(--primary))';
    let color = 'hsl(var(--primary-foreground))';
    let opacity = '1';
    let border = 'none';
    let textDecoration = 'none';
    
    if (event.resource === 'unavailable') {
      backgroundColor = '#ef4444';
      color = 'white';
      opacity = '0.8';
      textDecoration = 'line-through';
      border = '2px solid #dc2626';
    } else if (event.resource === 'selected') {
      backgroundColor = 'hsl(var(--primary))';
      color = 'hsl(var(--primary-foreground))';
      opacity = '0.9';
      border = '2px solid hsl(var(--primary-glow))';
    }
    
    const style: any = {
      backgroundColor,
      color,
      opacity,
      border,
      borderRadius: '4px',
      textDecoration
    };

    // Add diagonal stripes for unavailable slots
    if (event.resource === 'unavailable') {
      style.backgroundImage = `
        linear-gradient(45deg, 
          transparent 25%, 
          rgba(255, 255, 255, 0.3) 25%, 
          rgba(255, 255, 255, 0.3) 50%, 
          transparent 50%, 
          transparent 75%, 
          rgba(255, 255, 255, 0.3) 75%
        )
      `;
      style.backgroundSize = '12px 12px';
    }

    return { style };
  };

  // Pre-fill form with user data when user is available
  useEffect(() => {
    if (user && user.user_metadata) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata.full_name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Book Your Lesson</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome back! Select a time slot below to book your personalized music lesson.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* User Profile Section */}
          <UserProfile user={user} onSignOut={() => setUser(null)} />

          <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary">
                  <CalendarIcon className="text-secondary" size={24} />
                  Available Time Slots
                </CardTitle>
                <CardDescription>
                  Click on an available time slot to select it for your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] mb-4">
                  <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    views={['month', 'week', 'day']}
                    defaultView="week"
                    step={60}
                    timeslots={1}
                    min={new Date(0, 0, 0, 6, 0, 0)}
                    max={new Date(0, 0, 0, 22, 0, 0)}
                    showMultiDayTimes
                    className="bg-background rounded-lg"
                    eventPropGetter={eventStyleGetter}
                  />
                </div>
                {selectedSlot && (
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <p className="font-semibold text-primary">
                      Selected: {moment(selectedSlot.start).format('MMMM Do, YYYY [at] h:mm A')} - {moment(selectedSlot.end).format('h:mm A')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Duration: 1 hour
                    </p>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Availability:</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Weekdays: 6:00 PM - 8:00 PM</p>
                    <p>• Weekends: 8:00 AM - 8:00 PM</p>
                    <p>• <span className="inline-block w-3 h-3 bg-red-500/60 border border-red-600 rounded mr-1"></span>Unavailable times</p>
                    <p>• <span className="inline-block w-3 h-3 bg-primary border border-primary-glow rounded mr-1"></span>Your selection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card className="shadow-accent">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Lesson Details</CardTitle>
              <CardDescription>
                {selectedSlot ? "Fill out your lesson details below" : "Please select a time slot first to enable the booking form"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={!selectedSlot ? "text-muted-foreground" : ""}>Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!selectedSlot}
                      required
                      placeholder="Your full name"
                      className={!selectedSlot ? "bg-muted/50 cursor-not-allowed" : ""}
                      onClick={() => !selectedSlot && setFieldErrors({...fieldErrors, name: true})}
                    />
                    {fieldErrors.name && !selectedSlot && (
                      <p className="text-xs text-red-500">Please select a time slot first</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className={!selectedSlot ? "text-muted-foreground" : ""}>Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!selectedSlot}
                      required
                      placeholder="your.email@example.com"
                      className={!selectedSlot ? "bg-muted/50 cursor-not-allowed" : ""}
                      onClick={() => !selectedSlot && setFieldErrors({...fieldErrors, email: true})}
                    />
                    {fieldErrors.email && !selectedSlot && (
                      <p className="text-xs text-red-500">Please select a time slot first</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className={!selectedSlot ? "text-muted-foreground" : ""}>Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!selectedSlot}
                      placeholder="(555) 123-4567"
                      className={!selectedSlot ? "bg-muted/50 cursor-not-allowed" : ""}
                      onClick={() => !selectedSlot && setFieldErrors({...fieldErrors, phone: true})}
                    />
                    {fieldErrors.phone && !selectedSlot && (
                      <p className="text-xs text-red-500">Please select a time slot first</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lessonType" className={!selectedSlot ? "text-muted-foreground" : ""}>Lesson Type *</Label>
                    <Select 
                      value={formData.lessonType} 
                      onValueChange={(value) => setFormData({...formData, lessonType: value})}
                      disabled={!selectedSlot}
                    >
                      <SelectTrigger 
                        className={!selectedSlot ? "bg-muted/50 cursor-not-allowed" : ""}
                        onClick={() => !selectedSlot && setFieldErrors({...fieldErrors, lessonType: true})}
                      >
                        <SelectValue placeholder="Select lesson type" />
                      </SelectTrigger>
                      <SelectContent>
                        {lessonTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.lessonType && !selectedSlot && (
                      <p className="text-xs text-red-500">Please select a time slot first</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className={!selectedSlot ? "text-muted-foreground" : ""}>Any Notes?</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    disabled={!selectedSlot}
                    rows={4}
                    placeholder="Tell us anything special about your lesson needs..."
                    className={`resize-none ${!selectedSlot ? "bg-muted/50 cursor-not-allowed" : ""}`}
                    onClick={() => !selectedSlot && setFieldErrors({...fieldErrors, notes: true})}
                  />
                  {fieldErrors.notes && !selectedSlot && (
                    <p className="text-xs text-red-500">Please select a time slot first</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!selectedSlot || submitting}>
                  <CheckCircle className="mr-2 text-accent" size={18} />
                  {submitting ? "Submitting..." : "Submit Booking Request"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * We'll send you a confirmation text + email within 24hrs
                </p>
              </form>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;