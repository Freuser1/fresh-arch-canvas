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
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-monument mb-8 tracking-wide">
            VISIONARY
            <br />
            <span className="text-accent animate-text-shimmer bg-gradient-to-r from-accent via-white to-accent bg-[length:200%_auto] bg-clip-text text-transparent">
              DESIGN
            </span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/85 mb-12 font-light leading-relaxed animate-slide-in-left max-w-3xl mx-auto">
          Creating ethereal spaces that breathe life into Nordic minimalism. 
          Where every element speaks of intentional simplicity and timeless elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
          <Button 
            size="lg" 
            className="material-wood text-primary-foreground px-10 py-4 text-lg font-light
                       hover:shadow-[var(--shadow-elevation)] transition-[var(--transition-structure)]
                       rounded-sm tracking-wide"
          >
            Explore Vision
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/25 text-white hover:bg-white/5 px-10 py-4 text-lg font-light
                       backdrop-blur-sm transition-[var(--transition-structure)] rounded-sm tracking-wide"
          >
            Connect
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