import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-architecture.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-monument mb-6 animate-fade-in-up">
          ARCHITECTURAL
          <br />
          <span className="text-accent">ARTISTRY</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed animate-slide-in-right">
          Crafting spaces where form meets function, where structure becomes sculpture, 
          and where every line tells a story of modern design excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button 
            size="lg" 
            className="material-brass text-primary-foreground px-8 py-3 text-lg font-medium
                       hover:shadow-[var(--shadow-elevation)] transition-[var(--transition-structure)]"
          >
            View Portfolio
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg
                       backdrop-blur-sm transition-[var(--transition-structure)]"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white/70" />
      </div>
    </section>
  );
};