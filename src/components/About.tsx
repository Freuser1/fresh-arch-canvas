import { Card, CardContent } from "@/components/ui/card";
import { Compass, Layers, Lightbulb } from "lucide-react";

export const About = () => {
  const principles = [
    {
      icon: Compass,
      title: "Structural Integrity",
      description: "Every design decision is rooted in engineering excellence and material honesty, ensuring buildings that stand the test of time."
    },
    {
      icon: Layers,
      title: "Spatial Harmony",
      description: "We orchestrate light, volume, and texture to create environments that resonate with human experience and natural rhythms."
    },
    {
      icon: Lightbulb,
      title: "Innovative Solutions", 
      description: "Pushing boundaries through thoughtful experimentation with forms, materials, and sustainable building practices."
    }
  ];

  return (
    <section id="about" className="section-architecture">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-display mb-6">
              ARCHITECTURE AS
              <br />
              <span className="text-accent">EXPRESSION</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe architecture is more than shelter—it's a medium for storytelling, 
              a canvas for light and shadow, and a framework for human connection.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our practice explores the intersection of artistic vision and functional necessity, 
              creating spaces that inspire, serve, and endure.
            </p>

            <div className="grid gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-accent"></div>
                <span className="text-lg font-medium">15+ Years of Experience</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-accent"></div>
                <span className="text-lg font-medium">50+ Projects Completed</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-accent"></div>
                <span className="text-lg font-medium">International Recognition</span>
              </div>
            </div>
          </div>

          {/* Principles Cards */}
          <div className="space-y-6 animate-slide-in-right">
            {principles.map((principle, index) => (
              <Card 
                key={principle.title} 
                className="structure-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="material-brass p-3 rounded-lg flex-shrink-0">
                      <principle.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-title mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
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