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
          <h1 className="text-4xl font-bold mb-4 text-white font-lexend">Our Partners</h1>
        </div>

        {/* Partner */}
        <div className="max-w-4xl mx-auto mb-16">
          
          <Card className="shadow-accent">
            <CardHeader className="text-center pb-4">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-card shadow-card">
                <img
                  src={partnerLogo}
                  alt="Hungry For Music"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl text-white">Hungry For Music</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline">Community Programs</Badge>
                <Badge variant="outline">Youth Development</Badge>
                <Badge variant="outline">Cultural Arts</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-white">About Our Partnership</h4>
                  <p className="text-muted-foreground mb-4">
                    Hungry For Music is a 501(c)(3) nonprofit organization dedicated to opening the world of music to children who otherwise would not have access. Their mission is simple but powerful: collect and redistribute instruments to young people with a hunger to play. Over the past 30 years, they have placed more than 22,000 instruments into the hands of aspiring musicians across all 50 states and 35 countries. From guitars and violins to trombones and xylophones, these donations have transformed the lives of thousands of children, providing the uplifting and life-changing gift of music.
                  </p>
                  <p className="text-muted-foreground">
                    At Beats2Bridges, we are proud to support Hungry For Music's mission by donating a portion of our proceeds to help them expand their reach. Through our contributions, we help put more instruments into the hands of kids who need them most—ensuring that the gift of music continues to inspire and change lives around the world.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 text-white">Partnership Highlights</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Coming soon</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button variant="default" className="flex-1" asChild>
                  <a href="https://hungryformusic.org/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2" size={16} />
                    Visit Website
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href="https://hungryformusic.org/events/" target="_blank" rel="noopener noreferrer">
                    View Projects
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="shadow-glow bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white font-lexend">Become a Partner</h3>
              <p className="text-lg mb-6 text-primary-foreground/90 font-lexend">
                Join our network of partners and help us expand the reach of music education and community building. 
                Together, we can create lasting change through the power of music.
              </p>
              <div className="flex justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <a href="/contact">
                    Contact Us to Become a Partner
                  </a>
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