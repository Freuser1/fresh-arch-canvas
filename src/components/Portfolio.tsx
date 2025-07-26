import { Card, CardContent } from "@/components/ui/card";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Concrete Monumentality",
      category: "Residential",
      description: "A study in raw materials and geometric precision, exploring the beauty of exposed concrete and steel.",
      image: project1,
    },
    {
      id: 2,
      title: "Steel & Glass Symphony", 
      category: "Commercial",
      description: "Modern office complex that celebrates transparency and structural honesty in its design language.",
      image: project2,
    },
    {
      id: 3,
      title: "Minimalist Sanctuary",
      category: "Cultural",
      description: "A contemplative space where light and shadow create an ever-changing architectural experience.",
      image: project3,
    },
  ];

  return (
    <section id="portfolio" className="section-architecture bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 animate-fade-in-up">
            SELECTED WORKS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-right">
            Each project represents a dialogue between space, material, and human experience—
            architecture as both art and habitat.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid-structure">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="structure-card group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-[var(--transition-structure)] 
                               group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 
                                  transition-[var(--transition-structure)]" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-accent tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-title mb-3 group-hover:text-accent transition-[var(--transition-smooth)]">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
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