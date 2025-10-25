import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Bolt, 
  GraduationCap, 
  Home, 
  Hammer,
  Sparkles,
  Leaf,
  Cog,
  CheckCircle,
  Users,
  Shield,
  Star,
  Search,
  UserCheck,
  MessageCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import heroImage from '@assets/generated_images/Service_professionals_at_work_ebdaf5c3.png';

export default function Landing() {
  const serviceCategories = [
    { name: "Plumbing", icon: Wrench, description: "Expert plumbers for all your water and pipe needs" },
    { name: "Electrical", icon: Bolt, description: "Certified electricians for safe installations" },
    { name: "Tutoring", icon: GraduationCap, description: "Professional tutors across all subjects" },
    { name: "Housekeeping", icon: Home, description: "Reliable housekeeping and home care" },
    { name: "Carpentry", icon: Hammer, description: "Skilled carpenters for furniture and repairs" },
    { name: "Cleaning", icon: Sparkles, description: "Professional cleaning for homes and offices" },
    { name: "Gardening", icon: Leaf, description: "Expert gardeners for beautiful outdoor spaces" },
    { name: "Appliance Repair", icon: Cog, description: "Quick repairs for all appliances" },
  ];

  const problems = [
    { 
      icon: Search, 
      title: "Hard to Find", 
      description: "Spending hours searching for reliable service providers through word-of-mouth" 
    },
    { 
      icon: Shield, 
      title: "Trust Issues", 
      description: "No way to verify credentials or read genuine reviews before hiring" 
    },
    { 
      icon: Phone, 
      title: "Communication Gap", 
      description: "Difficulty contacting professionals and getting quick responses" 
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Register & Browse",
      description: "Sign up as a buyer and explore verified service providers",
      icon: UserCheck,
    },
    {
      step: 2,
      title: "Find Your Match",
      description: "Search by category, location, and ratings to find the perfect provider",
      icon: Search,
    },
    {
      step: 3,
      title: "Connect & Hire",
      description: "Contact providers directly and get your work done affordably",
      icon: MessageCircle,
    },
  ];

  const stats = [
    { number: "500+", label: "Verified Providers" },
    { number: "1,000+", label: "Happy Customers" },
    { number: "50+", label: "Service Categories" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover-elevate" data-testid="badge-trusted">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Trusted by Thousands
                </Badge>
                <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight" data-testid="heading-hero">
                  Find Trusted Local
                  <span className="block text-primary">Service Providers</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl" data-testid="text-hero-subtitle">
                  Connect with verified professionals for plumbing, electrical work, tutoring, and more. 
                  One platform for all your service needs.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gap-2 hover-elevate active-elevate-2" 
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-register-buyer"
                >
                  Register as Buyer
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 hover-elevate active-elevate-2" 
                  onClick={() => window.location.href = '/register-seller'}
                  data-testid="button-register-seller"
                >
                  Register as Seller
                </Button>
              </div>

              <div className="flex gap-8 pt-4">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="space-y-1" data-testid={`stat-${idx}`}>
                    <div className="font-poppins font-bold text-3xl text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Service professionals at work" 
                  className="w-full h-auto object-cover"
                  data-testid="img-hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-muted/30" data-testid="section-problems">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-foreground" data-testid="heading-problem">
              The Problem We Solve
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Finding reliable local service providers shouldn't be a challenge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, idx) => (
              <Card key={idx} className="p-8 hover-elevate border-card-border" data-testid={`card-problem-${idx}`}>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24" data-testid="section-how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-foreground" data-testid="heading-how-it-works">
              How ServiceKart Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get connected with trusted professionals in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="relative" data-testid={`step-${idx}`}>
                <div className="space-y-4">
                  <div className="relative inline-flex">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-chart-2 flex items-center justify-center text-sm font-bold text-white shadow-md">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 md:py-24 bg-muted/30" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-foreground" data-testid="heading-categories">
              Popular Service Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our wide range of verified service providers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, idx) => (
              <Card 
                key={idx} 
                className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all border-card-border group"
                data-testid={`card-category-${idx}`}
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 md:py-24" data-testid="section-trust">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-foreground mb-4" data-testid="heading-why-trust">
              Why Trust ServiceKart?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover-elevate border-card-border" data-testid="card-trust-verification">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Verified Sellers</h3>
              <p className="text-muted-foreground">All service providers go through our verification process</p>
            </Card>

            <Card className="p-8 text-center hover-elevate border-card-border" data-testid="card-trust-ratings">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Ratings & Reviews</h3>
              <p className="text-muted-foreground">Transparent feedback from real customers</p>
            </Card>

            <Card className="p-8 text-center hover-elevate border-card-border" data-testid="card-trust-affordable">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Affordable Pricing</h3>
              <p className="text-muted-foreground">Direct contact with providers means fair prices</p>
            </Card>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center" data-testid={`stat-large-${idx}`}>
                <div className="font-poppins font-bold text-4xl md:text-5xl text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-primary/10" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4" data-testid="heading-cta">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and trusted service providers on ServiceKart today
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 hover-elevate active-elevate-2"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-cta-buyer"
            >
              Find Service Providers
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 hover-elevate active-elevate-2"
              onClick={() => window.location.href = '/register-seller'}
              data-testid="button-cta-seller"
            >
              Become a Seller
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-poppins font-bold text-xl mb-4 text-foreground">ServiceKart</h3>
              <p className="text-muted-foreground text-sm">
                Connecting buyers with trusted local service providers. Building trust, one service at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => window.location.href = '/api/login'} className="hover:text-primary transition-colors" data-testid="link-about">About Us</button></li>
                <li><button onClick={() => window.location.href = '/api/login'} className="hover:text-primary transition-colors" data-testid="link-services">Services</button></li>
                <li><button onClick={() => window.location.href = '/register-seller'} className="hover:text-primary transition-colors" data-testid="link-become-seller">Become a Seller</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@servicekart.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 1800-SERVICE
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mumbai, India
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ServiceKart. All rights reserved. Building trust and affordability.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
