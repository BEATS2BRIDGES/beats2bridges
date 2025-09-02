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
      title: "Music Program Coordinator",
      image: "/lovable-uploads/375e5b83-6d60-4922-b90c-7ecdd33bdbe6.png",
      bio: "Anya brings her passion for music and movement to BEATS2BRIDGES as a multi-instrumentalist specializing in violin and saxophone. When not making music, she channels her creativity through writing and dance, believing that all forms of artistic expression can build meaningful connections within communities.",
      expertise: ["Violin Performance", "Saxophone", "Creative Writing", "Dance", "Music Appreciation"],
      email: "anya@beats2bridges.com",
      linkedin: "https://linkedin.com/in/anyajoseph"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Executive Director & Founder",
      image: officer1,
      bio: "With over 15 years in music education and community development, Sarah founded BEATS2BRIDGES to create meaningful connections through music. She holds a Master's in Music Education and has led programs that have impacted thousands of lives.",
      expertise: ["Music Education", "Community Outreach", "Program Development", "Arts Administration"],
      email: "sarah@beats2bridges.com",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      title: "Creative Director & DJ",
      image: officer2,
      bio: "Marcus brings 12 years of professional DJ experience and music production expertise to our team. He specializes in creating inclusive musical experiences that bring diverse communities together through innovative sound design and live performances.",
      expertise: ["Music Production", "Live Performance", "Event Planning", "Youth Mentorship"],
      email: "marcus@beats2bridges.com",
      linkedin: "https://linkedin.com/in/marcusrodriguez"
    },
    {
      id: 4,
      name: "Dr. Amira Patel",
      title: "Community Partnerships Manager",
      image: officer3,
      bio: "Dr. Patel holds a PhD in Community Psychology and has spent the last decade building bridges between organizations and communities. Her research focuses on how arts programs can strengthen social cohesion and cultural understanding.",
      expertise: ["Community Psychology", "Partnership Development", "Research & Evaluation", "Cultural Competency"],
      email: "amira@beats2bridges.com",
      linkedin: "https://linkedin.com/in/amirapatel"
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {officer.bio}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {officer.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail size={14} className="mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Linkedin size={14} className="mr-1" />
                    LinkedIn
                  </Button>
                </div>
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