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
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-display mb-4 tracking-tight font-light">
            VISIONARY
          </h1>
          <h1 className="text-hero mb-12 tracking-tight animate-glow-pulse">
            DESIGN
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/90 mb-16 font-light leading-relaxed animate-slide-in-left max-w-4xl mx-auto">
          Crafting spaces that define tomorrow's minimalism. Where Scandinavian soul meets 
          visionary innovation, creating environments that captivate and inspire.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center animate-scale-in">
          <Button 
            size="lg" 
            className="material-accent text-primary-foreground px-12 py-6 text-lg font-medium
                       hover:animate-magnetic-hover transition-[var(--transition-smooth)]
                       rounded-2xl tracking-wide micro-bounce shadow-[var(--shadow-glow)]"
          >
            Explore Portfolio
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="glass-button text-white px-12 py-6 text-lg font-medium
                       rounded-2xl tracking-wide micro-bounce"
          >
            Start Conversation
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