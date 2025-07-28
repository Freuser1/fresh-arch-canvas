import { Card, CardContent } from "@/components/ui/card";
import { Compass, Layers, Lightbulb } from "lucide-react";

export const About = () => {
  const principles = [
    {
      icon: Compass,
      title: "Scandinavian Roots",
      description: "Drawing from my Nordic heritage, I integrate natural light, clean lines, and sustainable materials into every design, creating spaces that feel both timeless and contemporary."
    },
    {
      icon: Layers,
      title: "Human-Centered Design",
      description: "I believe architecture should enhance daily life. Every space I design prioritizes comfort, functionality, and the emotional well-being of its inhabitants."
    },
    {
      icon: Lightbulb,
      title: "Sustainable Innovation", 
      description: "My practice focuses on environmentally conscious design, incorporating cutting-edge sustainable technologies while maintaining aesthetic integrity and budget considerations."
    }
  ];

  return (
    <section id="about" className="section-modern bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Content */}
          <div className="animate-fade-in-up space-y-10">
            <h2 className="text-display mb-12 tracking-tight">
              ABOUT
              <br />
              <span className="text-hero">MY WORK</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-subtitle text-muted-foreground leading-relaxed">
                Based in Stockholm, I'm passionate about creating architectural spaces that honor Scandinavian 
                design principles while pushing the boundaries of contemporary living. My work focuses on the 
                intersection of sustainability, beauty, and human experience.
              </p>
              
              <p className="text-subtitle text-muted-foreground leading-relaxed">
                With a background in both traditional craftsmanship and modern technology, I approach each 
                project as a unique opportunity to solve spatial challenges while creating environments that 
                inspire and nurture those who inhabit them.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-6 slide-reveal group">
                <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full group-hover:w-24 transition-[var(--transition-smooth)]"></div>
                <span className="text-subtitle font-medium text-foreground group-hover:text-accent transition-[var(--transition-smooth)]">Licensed Architect</span>
              </div>
              <div className="flex items-center space-x-6 slide-reveal group">
                <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full group-hover:w-24 transition-[var(--transition-smooth)]"></div>
                <span className="text-subtitle font-medium text-foreground group-hover:text-accent transition-[var(--transition-smooth)]">Stockholm Based</span>
              </div>
              <div className="flex items-center space-x-6 slide-reveal group">
                <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full group-hover:w-24 transition-[var(--transition-smooth)]"></div>
                <span className="text-subtitle font-medium text-foreground group-hover:text-accent transition-[var(--transition-smooth)]">Sustainable Focus</span>
              </div>
            </div>
          </div>

          {/* Principles Cards */}
          <div className="space-y-10 animate-slide-in-right">
            {principles.map((principle, index) => (
              <Card 
                key={principle.title} 
                className="modern-card interactive-hover float-modern"
                style={{ 
                  animationDelay: `${index * 0.4}s`,
                  animationDuration: `${8 + index}s`
                }}
              >
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-start space-x-8">
                    <div className="material-accent p-5 rounded-3xl flex-shrink-0 micro-bounce">
                      <principle.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-title font-medium tracking-tight">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-subtitle">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};