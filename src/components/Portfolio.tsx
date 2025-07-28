import { Card, CardContent } from "@/components/ui/card";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Light Sanctuary",
      category: "Residential",
      description: "A Stockholm apartment where Nordic light dances through minimalist spaces, creating moments of tranquil contemplation.",
      image: project1,
    },
    {
      id: 2,
      title: "Forest Retreat", 
      category: "Wellness",
      description: "A meditation pavilion nestled in Swedish woodlands, where nature and architecture become one harmonious experience.",
      image: project2,
    },
    {
      id: 3,
      title: "Archipelago Studio",
      category: "Creative",
      description: "An artist's workspace on the Stockholm archipelago, designed to capture the ever-changing moods of Nordic seasons.",
      image: project3,
    },
  ];

  return (
    <section id="portfolio" className="section-modern">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-6 animate-fade-in-up tracking-tight">
            CRAFTED
            <br />
            <span className="text-hero">VISIONS</span>
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto animate-slide-in-right leading-relaxed">
            Minimalist spaces where Scandinavian serenity meets modern innovation.
          </p>
        </div>

        {/* Portfolio Grid - Compact Design */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="modern-card group cursor-pointer animate-scale-in"
              style={{ 
                animationDelay: `${index * 0.2}s`
              }}
            >
              <CardContent className="p-0">
                {/* Compact Project Image */}
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-[var(--transition-smooth)] 
                               group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 
                                  transition-[var(--transition-smooth)]" />
                </div>

                {/* Compact Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-accent tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-title mb-3 font-medium tracking-tight group-hover:text-accent transition-[var(--transition-smooth)]">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};