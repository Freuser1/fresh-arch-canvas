import { Card, CardContent } from "@/components/ui/card";
import { Compass, Layers, Lightbulb } from "lucide-react";

export const About = () => {
  const principles = [
    {
      icon: Compass,
      title: "Nordic Essence",
      description: "Drawing inspiration from Scandinavian nature and light, creating spaces that embody tranquility and connection to the environment."
    },
    {
      icon: Layers,
      title: "Minimalist Poetry",
      description: "Every element serves a purpose, every space tells a story. Embracing the power of intentional simplicity and negative space."
    },
    {
      icon: Lightbulb,
      title: "Visionary Thinking", 
      description: "Challenging conventional boundaries through fresh perspectives on space, light, and human interaction with built environments."
    }
  ];

  return (
    <section id="about" className="section-modern bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Content */}
          <div className="animate-fade-in-up space-y-10">
            <h2 className="text-display mb-12 tracking-tight">
              DESIGN AS
              <br />
              <span className="text-hero">PHILOSOPHY</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-subtitle text-muted-foreground leading-relaxed">
                Based in Stockholm, I pioneer the next evolution of minimalist design—where 
                every space becomes a sanctuary of innovation and every detail shapes tomorrow's living.
              </p>
              
              <p className="text-subtitle text-muted-foreground leading-relaxed">
                My vision transcends traditional Nordic aesthetics, creating environments that 
                command attention while inspiring profound human connection.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-6 slide-reveal group">
                <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full group-hover:w-24 transition-[var(--transition-smooth)]"></div>
                <span className="text-subtitle font-medium text-foreground group-hover:text-accent transition-[var(--transition-smooth)]">Visionary Leadership</span>
              </div>
              <div className="flex items-center space-x-6 slide-reveal group">
                <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full group-hover:w-24 transition-[var(--transition-smooth)]"></div>
                <span className="text-subtitle font-medium text-foreground group-hover:text-accent transition-[var(--transition-smooth)]">Stockholm Innovation Hub</span>
              </div>
              <div className="flex items-center space-x-6 slide-reveal group">
                <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full group-hover:w-24 transition-[var(--transition-smooth)]"></div>
                <span className="text-subtitle font-medium text-foreground group-hover:text-accent transition-[var(--transition-smooth)]">Future-Forward Philosophy</span>
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