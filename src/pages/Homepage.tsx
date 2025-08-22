import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Music, Users, Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Homepage = () => {
  const carouselImages = [
    {
      url: heroImage,
      caption: "Connecting Communities Through Music"
    },
    {
      url: heroImage,
      caption: "Building Bridges With Every Beat"
    },
    {
      url: heroImage,
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-glow-pulse">
              BEATS2BRIDGES
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Connecting communities through the power of music, one beat at a time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/booking">
                  Book With Us <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At BEATS2BRIDGES, we believe music is the universal language that transcends all boundaries. 
              Our mission is to create meaningful connections between diverse communities through innovative 
              musical experiences, educational programs, and collaborative events that celebrate our 
              shared humanity through rhythm and melody.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Music className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Musical Excellence</h3>
                <p className="text-muted-foreground">
                  Promoting high-quality musical performances and education across all genres and styles.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community Building</h3>
                <p className="text-muted-foreground">
                  Fostering connections between diverse groups through collaborative musical projects.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Social Impact</h3>
                <p className="text-muted-foreground">
                  Creating positive change in communities through music therapy and outreach programs.
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
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Discover the moments that define our mission
            </p>
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