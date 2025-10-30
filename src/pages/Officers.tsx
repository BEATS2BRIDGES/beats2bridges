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
      id: 6,
      name: "Karthi Senthilkumar",
      title: "Founder",
      image: "/lovable-uploads/4f7e639f-a6c0-4502-b382-00fa61eb2980.png",
      hobbies: "My hobbies are listening to music, watching movies, and hanging out with friends",
      instruments: "I play guitar and piano",
      favoriteAlbum: "My favorite albums are Nothing Was The Same - Drake and Late Registration - Kanye"
    },
    {
      id: 7,
      name: "Aarush Dhiman",
      title: "Co-Founder",
      image: "/lovable-uploads/b9648911-8d9e-4f40-b781-a8c76052fae6.png",
      hobbies: "Sports (watching/playing basketball), music, spending time with family/friends",
      instruments: "I play guitar",
      favoriteAlbum: "My favorite album is Rodeo - Travis Scott"
    },
    {
      id: 3,
      name: "Anay Thakkar",
      title: "Creative Director",
      image: "/lovable-uploads/50fd21b9-1818-48ee-bd86-8090f8ce1a67.png",
      hobbies: "My hobbies are driving, coding, and going to the gym",
      instruments: null,
      favoriteAlbum: "My favorite album is DS4EVER by Gunna",
      funFact: "Fun fact: I made this website"
    },
    {
      id: 4,
      name: "Kedar Shankarram",
      title: "Creative Director",
      image: "/lovable-uploads/6526e6f9-0fb1-4f35-abe3-81af037ad076.png",
      hobbies: "My hobbies are biking, listening to music, chess, and hanging out with friends",
      instruments: "I play mridangam, and I'm also a western percussionist",
      favoriteAlbum: "My favorite albums are Take Care - Drake and Channel Orange - Frank Ocean"
    },
    {
      id: 9,
      name: "Shourya Kukkala",
      title: "Treasurer",
      image: "/lovable-uploads/aa8f1b5e-a963-413b-a283-4f03bee662ec.png",
      hobbies: "My hobby is running",
      instruments: null,
      favoriteAlbum: "My favorite album is HEROES & VILLAINS by Metro Boomin"
    },
    {
      id: 5,
      name: "Konstantinos Vatianou",
      title: "Outreach",
      image: "/lovable-uploads/3c751520-f2ea-4eb1-8699-b9ace7247521.png",
      hobbies: "My hobbies are volleyball, running, and quiz bowl",
      instruments: "I play trumpet",
      favoriteAlbum: "My favorite album is Walkin' by Miles Davis"
    },
    {
      id: 8,
      name: "Anirudh Suresh",
      title: "Outreach",
      image: "/lovable-uploads/4e5d7e1c-2c5f-4193-a3d1-f13a085a2dfa.png",
      hobbies: "My hobbies are mridangam, basketball, math, and running",
      instruments: "I play mridangam",
      favoriteAlbum: "My favorite song is WUNNA by Gunna"
    },
    {
      id: 10,
      name: "Ayush Saripalli",
      title: "Outreach",
      image: "/lovable-uploads/c591b96e-bc61-47cc-8cbe-c1eeba5e0591.png",
      hobbies: "I love to play basketball and video games",
      instruments: null,
      favoriteAlbum: "My favorite album is Black On Both Sides by Mos Def"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary font-lexend">Meet Our Officers</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-lexend">
            These are the people making our mission possible.
          </p>
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
                     className={`w-full h-full object-cover ${
                       officer.name === 'Karthi Senthilkumar' 
                         ? 'object-center scale-125 -translate-y-2' 
                         : 'object-center'
                     }`}
                   />
                 </div>
                <CardTitle className="text-xl text-primary">{officer.name}</CardTitle>
                <CardDescription className="text-base font-medium text-accent">
                  {officer.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="text-muted-foreground flex items-start">
                    <span className="text-muted-foreground mr-2">•</span>
                    {officer.hobbies}
                  </li>
                  {officer.instruments && (
                    <li className="text-muted-foreground flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      {officer.instruments}
                    </li>
                  )}
                  <li className="text-muted-foreground flex items-start">
                    <span className="text-muted-foreground mr-2">•</span>
                    {officer.favoriteAlbum}
                  </li>
                  {officer.funFact && (
                    <li className="text-muted-foreground flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      {officer.funFact}
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-glow bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white font-lexend">Join Our Mission</h3>
              <p className="text-lg mb-6 text-yellow-soft font-lexend">
                We're always looking for passionate individuals who share our vision of bringing communities 
                together through music. Explore opportunities to make a difference with BEATS2BRIDGES.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open('https://forms.gle/GKDUXWWnAXkN4pxaA', '_blank')}
                >
                  Apply to join as an Officer or Teacher
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