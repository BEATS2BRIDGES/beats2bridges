import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Award, Handshake } from "lucide-react";
import partnerLogo from "/lovable-uploads/3b017f7d-141c-40f6-a8f2-16904e10c8fb.png";

const Partners = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're proud to collaborate with organizations that share our vision of bringing communities together through music. 
            Together, we're creating lasting impact and meaningful connections.
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Reach</h3>
              <p className="text-muted-foreground">
                Expand your impact through collaborative community programs
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recognition</h3>
              <p className="text-muted-foreground">
                Gain visibility as a champion of arts and community development
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Handshake className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-muted-foreground">
                Join forces with like-minded organizations for greater impact
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Partner */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Partner</h2>
          
          <Card className="shadow-accent">
            <CardHeader className="text-center pb-4">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-card shadow-card">
                <img
                  src={partnerLogo}
                  alt="Hungry for Music"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl">Hungry for Music</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline">Community Programs</Badge>
                <Badge variant="outline">Youth Development</Badge>
                <Badge variant="outline">Cultural Arts</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3">About Our Partnership</h4>
                  <p className="text-muted-foreground mb-4">
                    Since 2020, Hungry for Music has been our cornerstone partner in delivering 
                    transformative music education programs to underserved communities. Together, we've 
                    reached over 5,000 students and families through innovative workshops, performances, 
                    and mentorship programs.
                  </p>
                  <p className="text-muted-foreground">
                    Their commitment to excellence and community-first approach aligns perfectly with 
                    our mission to bridge divides through the universal language of music.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Partnership Highlights</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 50+ joint community events annually</li>
                      <li>• Scholarship program for aspiring musicians</li>
                      <li>• Mobile music education unit</li>
                      <li>• Instrument donation and repair program</li>
                      <li>• Professional development workshops</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="default" className="flex-1">
                      <ExternalLink className="mr-2" size={16} />
                      Visit Website
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Projects
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-glow bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
              <p className="text-lg mb-6 text-primary-foreground/90">
                Join our network of partners and help us expand the reach of music education and community building. 
                Together, we can create lasting change through the power of music.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Partnership Opportunities
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Partners;