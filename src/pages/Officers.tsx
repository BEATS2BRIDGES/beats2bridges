import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Music, Users, Target } from "lucide-react";
import officer1 from "@/assets/officer-1.jpg";
import officer2 from "@/assets/officer-2.jpg";
import officer3 from "@/assets/officer-3.jpg";

const Officers = () => {
  const officers = [
    {
      id: 1,
      name: "Anya Joseph",
      title: "Outreach",
      image: "/lovable-uploads/375e5b83-6d60-4922-b90c-7ecdd33bdbe6.png",
      hobbies: "I love to write and dance",
      instruments: "I play violin and saxophone",
      favoriteAlbum: "My favourite album is Californication by RHCP"
    },
    {
      id: 2,
      name: "Valerie Bui",
      title: "Secretary",
      image: "/lovable-uploads/67361dbc-c097-406d-b936-fb4c75bd8d60.png",
      hobbies: "Baking, Cheer, Kung fu",
      instruments: "I play piano",
      favoriteAlbum: "Give You the World - Steve Lacy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Our Officers</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our leadership team combines decades of experience in music, education, and community development. 
            Get to know the passionate individuals driving our mission forward.
          </p>
        </div>

        {/* Leadership Philosophy */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Music className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Musical Excellence</h3>
              <p className="text-muted-foreground">
                Committed to the highest standards in music education and performance
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-muted-foreground">
                Every decision is made with community impact and inclusivity in mind
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Purposeful Action</h3>
              <p className="text-muted-foreground">
                Strategic thinking combined with passionate execution for lasting change
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Officer Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {officers.map((officer) => (
            <Card key={officer.id} className="shadow-accent hover:shadow-glow transition-smooth">
              <CardHeader className="text-center pb-4">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-card shadow-card">
                  <img
                    src={officer.image}
                    alt={officer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">{officer.name}</CardTitle>
                <CardDescription className="text-base font-medium text-primary">
                  {officer.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="text-muted-foreground flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {officer.hobbies}
                  </li>
                  <li className="text-muted-foreground flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {officer.instruments}
                  </li>
                  <li className="text-muted-foreground flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {officer.favoriteAlbum}
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-glow bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-lg mb-6 text-primary-foreground/90">
                We're always looking for passionate individuals who share our vision of bringing communities 
                together through music. Explore opportunities to make a difference with BEATS2BRIDGES.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  View Open Positions
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Volunteer With Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Officers;