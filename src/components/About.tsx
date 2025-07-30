export const About = () => {
  return (
    <section id="about" className="section-modern bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-6 animate-fade-in-up tracking-tight">
            MEET THE
            <br />
            <span className="text-hero">ARCHITECT</span>
          </h2>
        </div>

        {/* Introduction Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Photo */}
          <div className="animate-scale-in">
            <div className="personal-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                alt="Architect portrait"
                className="personal-photo"
              />
            </div>
          </div>

          {/* Brief Introduction */}
          <div className="animate-fade-in-up space-y-8">
            <div className="space-y-6">
              <h3 className="text-title font-medium tracking-tight">
                Stockholm-based architect with a passion for sustainable design
              </h3>
              
              <p className="text-subtitle text-muted-foreground leading-relaxed">
                I create spaces that blend Scandinavian minimalism with modern functionality. 
                Every project is an opportunity to improve how we live and interact with our environment.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-subtitle text-muted-foreground">Licensed Architect</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-subtitle text-muted-foreground">Sustainable Design Focus</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-subtitle text-muted-foreground">Based in Stockholm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};