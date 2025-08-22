import { useState } from "react";
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
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Booking = () => {
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    duration: "",
    attendees: "",
    description: ""
  });

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
      return hour >= 16 && hour < 20; // 4pm-8pm weekdays
    }
  };

  // Generate unavailable time slots for visual blocking
  const generateUnavailableSlots = () => {
    const slots = [];
    const today = new Date();
    
    // Generate for next 30 days
    for (let d = 0; d < 30; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + d);
      
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Generate hourly slots for the day
      for (let h = 0; h < 24; h++) {
        const slotStart = new Date(currentDate);
        slotStart.setHours(h, 0, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setHours(h + 1, 0, 0, 0);
        
        if (!isTimeAvailable(slotStart)) {
          slots.push({
            id: `unavailable-${d}-${h}`,
            title: '',
            start: slotStart,
            end: slotEnd,
            resource: 'unavailable'
          });
        }
      }
    }
    return slots;
  };

  const unavailableSlots = generateUnavailableSlots();
  const allEvents = [...events, ...unavailableSlots];

  const eventTypes = [
    { value: "workshop", label: "Music Workshop" },
    { value: "performance", label: "Live Performance" },
    { value: "education", label: "Educational Program" },
    { value: "community", label: "Community Event" },
    { value: "private", label: "Private Lesson" },
    { value: "other", label: "Other" }
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
    if (!isTimeAvailable(start)) {
      toast({
        title: "Time Unavailable",
        description: "Available hours: Weekdays 4PM-8PM, Weekends 8AM-8PM",
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
    toast({
      title: "Time Slot Selected",
      description: `Selected: ${moment(start).format('MMMM Do, YYYY [at] h:mm A')} - ${moment(end).format('h:mm A')}`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast({
        title: "Please select a time slot",
        description: "Click on an available time slot in the calendar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Request Submitted!",
      description: "We'll confirm your booking within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      duration: "",
      attendees: "",
      description: ""
    });
    setSelectedSlot(null);
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
      opacity = '0.6';
      textDecoration = 'line-through';
      border = '2px solid #dc2626';
    } else if (event.resource === 'selected') {
      backgroundColor = 'hsl(var(--primary))';
      color = 'hsl(var(--primary-foreground))';
      opacity = '0.9';
      border = '2px solid hsl(var(--primary-glow))';
    }
    
    return {
      style: {
        backgroundColor,
        color,
        opacity,
        border,
        borderRadius: '4px',
        textDecoration
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book With Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring the power of music to your event? Use our scheduling tool to book workshops, 
            performances, or educational programs tailored to your community's needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Calendar Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="text-primary" size={24} />
                  Available Time Slots
                </CardTitle>
                <CardDescription>
                  Click on an available time slot to select it for your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 mb-4">
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
                    min={new Date(0, 0, 0, 8, 0, 0)}
                    max={new Date(0, 0, 0, 21, 0, 0)}
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
                    <p>• Weekdays: 4:00 PM - 8:00 PM</p>
                    <p>• Weekends: 8:00 AM - 8:00 PM</p>
                    <p>• <span className="inline-block w-3 h-3 bg-red-500/60 border border-red-600 rounded mr-1"></span>Unavailable times</p>
                    <p>• <span className="inline-block w-3 h-3 bg-primary border border-primary-glow rounded mr-1"></span>Your selection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Options */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <Music className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Live Performances</h3>
                  <p className="text-sm text-muted-foreground">Professional DJ and live music</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <h3 className="font-semibold">Workshops</h3>
                  <p className="text-sm text-muted-foreground">Interactive music education</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Form */}
          <Card className="shadow-accent">
            <CardHeader>
              <CardTitle className="text-2xl">Event Details</CardTitle>
              <CardDescription>
                Tell us about your event and we'll create a customized experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">Half day (4 hours)</SelectItem>
                        <SelectItem value="8">Full day (8 hours)</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendees">Expected Attendees</Label>
                    <Input
                      id="attendees"
                      name="attendees"
                      type="number"
                      value={formData.attendees}
                      onChange={handleInputChange}
                      placeholder="Number of people"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your event, goals, audience, and any special requirements..."
                    className="resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <CheckCircle className="mr-2" size={18} />
                  Submit Booking Request
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * We'll contact you within 24 hours to confirm availability and discuss details
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;