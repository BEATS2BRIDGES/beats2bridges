import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Music, Users, Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import heroImage from "@/assets/hero-image.jpg";

const Homepage = () => {
  const carouselImages = [
    {
      url: "/lovable-uploads/886e34d8-3928-4831-ba84-fdd9ae90db7e.png",
      caption: "Connecting Communities Through Music"
    },
    {
      url: "/lovable-uploads/886e34d8-3928-4831-ba84-fdd9ae90db7e.png",
      caption: "Building Bridges With Every Beat"
    },
    {
      url: "/lovable-uploads/886e34d8-3928-4831-ba84-fdd9ae90db7e.png",
      caption: "Uniting Through Rhythm and Harmony"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-glow-pulse text-secondary">
              BEATS2BRIDGES
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Connecting communities through the power of music, one beat at a time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/booking">
                  Book With Us <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/donate">
                  Donate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-secondary">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Beats2Bridges helps young musicians from underprivileged communities by giving them access to music lessons, mentorship, and chances to perform. We work with <a href="https://hungryformusic.org/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Hungry For Music</a>, a well-known national organization that supports music access and education. Together, we connect talent with opportunity, helping young artists grow in creativity, confidence, and impact.
            </p>
            <h2 className="text-4xl font-bold text-secondary">The BEATS2BRIDGES Process</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-secondary">Music Lessons</h3>
                <p className="text-muted-foreground">
                  We offer low-cost music lessons and donate the proceeds to Hungry For Music to help more people gain access to instruments.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-secondary">Hungry For Music</h3>
                <p className="text-muted-foreground">
                  We donate instruments to Hungry For Music through our partnership with this national organization.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-secondary">Making Change</h3>
                <p className="text-muted-foreground">
                  Our low-cost lessons make learning an instrument accessible for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-secondary">Gallery</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-96 object-cover rounded-lg shadow-accent"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-xl font-semibold">{image.caption}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;