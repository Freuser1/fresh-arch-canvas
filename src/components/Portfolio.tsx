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
    <section id="portfolio" className="section-nordic">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display mb-6 animate-fade-in-up tracking-wide">
            CRAFTED
            <br />
            <span className="text-accent">VISIONS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right font-light leading-relaxed">
            Each space tells a story of Nordic serenity, where minimalist beauty meets purposeful design. 
            Discover environments that nurture the soul and inspire quiet contemplation.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid-nordic">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="nordic-card group cursor-pointer animate-scale-in float-gentle"
              style={{ 
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${8 + index}s`
              }}
            >
              <CardContent className="p-0">
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-[var(--transition-structure)] 
                               group-hover:scale-102 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 
                                  transition-[var(--transition-structure)]" />
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-light text-accent tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-title mb-4 font-light tracking-wide group-hover:text-accent transition-[var(--transition-smooth)]">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed font-light">
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