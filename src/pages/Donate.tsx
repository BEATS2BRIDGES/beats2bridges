import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Heart, Music, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Donate = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instrumentType: "",
    condition: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInstrumentDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-donation-email', {
        body: {
          type: 'instrument',
          donorInfo: formData
        }
      });

      if (error) throw error;

      toast({
        title: "Thank you for your donation!",
        description: "We've received your instrument donation request and will contact you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        instrumentType: "",
        condition: "",
        description: "",
      });
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: "Error",
        description: "There was an issue submitting your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalDonation = () => {
    // PayPal integration would go here
    window.open('https://www.paypal.com/paypalme/BEATS2BRIDGES', '_blank');
  };

  // Removed handleZelleDonation function as we're now using a popover

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
          <h1 className="text-5xl font-bold mb-6 text-accent font-lexend">Support Our Mission</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground font-lexend">
            Help us bridge communities through music by donating instruments or contributing financially 
            to support young musicians from underprivileged communities.
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="money" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="money" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Monetary Donation
              </TabsTrigger>
              <TabsTrigger value="instruments" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Donate Instruments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="money" className="mt-8">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-primary">
                    <DollarSign className="w-6 h-6" />
                    Make a Financial Contribution
                  </CardTitle>
                  <CardDescription>
                    Your monetary donations help us provide music lessons, mentorship, and performance opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={handlePayPalDonation} size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                        Donate via PayPal
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                            Donate via Zelle
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-6" align="center">
                          <div className="text-center space-y-4">
                            <h3 className="text-lg font-semibold">Scan to Pay with Zelle</h3>
                            <div className="flex justify-center">
                              <img 
                                src="/lovable-uploads/d61eab16-d3d9-4e81-bab6-c0c7677d1db0.png"
                                alt="Zelle QR Code for beats2bridges@gmail.com" 
                                className="w-48 h-48 object-contain"
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instruments" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Music className="w-6 h-6 text-primary" />
                    Donate Musical Instruments
                  </CardTitle>
                  <CardDescription>
                    Help us provide instruments to young musicians who need them most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInstrumentDonation} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instrumentType">Type of Instrument *</Label>
                      <Input
                        id="instrumentType"
                        name="instrumentType"
                        placeholder="e.g., Guitar, Piano, Violin, Drums"
                        value={formData.instrumentType}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition of Instrument</Label>
                      <Input
                        id="condition"
                        name="condition"
                        placeholder="e.g., Excellent, Good, Fair, Needs Repair"
                        value={formData.condition}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Additional Details</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Please provide any additional information about the instrument, its history, or special requirements for pickup/delivery"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      {isSubmitting ? "Submitting..." : "Submit Donation Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Donate;