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
    <section id="about" className="section-nordic bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="animate-fade-in-up space-y-8">
            <h2 className="text-display mb-8 tracking-wide">
              DESIGN AS
              <br />
              <span className="text-accent">PHILOSOPHY</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                Based in Stockholm, I believe in the transformative power of minimalist design—where 
                every space becomes a sanctuary of calm and every detail serves both beauty and purpose.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                My vision embraces the Nordic essence of light, nature, and intentional living, 
                creating environments that inspire contemplation and genuine human connection.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 fade-in-sequence">
                <div className="w-16 h-0.5 bg-accent"></div>
                <span className="text-lg font-light text-foreground">Visionary Approach</span>
              </div>
              <div className="flex items-center space-x-4 fade-in-sequence">
                <div className="w-16 h-0.5 bg-accent"></div>
                <span className="text-lg font-light text-foreground">Stockholm Based</span>
              </div>
              <div className="flex items-center space-x-4 fade-in-sequence">
                <div className="w-16 h-0.5 bg-accent"></div>
                <span className="text-lg font-light text-foreground">Nordic Philosophy</span>
              </div>
            </div>
          </div>

          {/* Principles Cards */}
          <div className="space-y-8 animate-slide-in-right">
            {principles.map((principle, index) => (
              <Card 
                key={principle.title} 
                className="nordic-card float-gentle"
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: `${6 + index}s`
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="material-wood p-4 rounded-sm flex-shrink-0">
                      <principle.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-title mb-3 font-light tracking-wide">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-light">
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