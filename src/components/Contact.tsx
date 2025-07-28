import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="section-modern bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-display mb-8 animate-fade-in-up tracking-tight">
            LET'S
            <br />
            <span className="text-hero">COLLABORATE</span>
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-4xl mx-auto animate-slide-in-right leading-relaxed">
            I'm always excited to discuss new projects and creative challenges. Whether you're planning 
            a residential renovation, commercial space, or have an innovative concept in mind, let's explore how we can bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <Card className="modern-card animate-fade-in-up">
            <CardContent className="p-12 relative z-10">
              <h3 className="text-title mb-10 font-medium tracking-tight">Start a Project</h3>
              
              <form className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <Input 
                    placeholder="First Name" 
                    className="glass-button h-14 text-subtitle
                               focus:ring-accent focus:border-accent/50"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="glass-button h-14 text-subtitle
                               focus:ring-accent focus:border-accent/50"
                  />
                </div>
                
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="glass-button h-14 text-subtitle
                             focus:ring-accent focus:border-accent/50"
                />
                
                <Input 
                  placeholder="Project Type (e.g., Residential, Commercial)" 
                  className="glass-button h-14 text-subtitle
                             focus:ring-accent focus:border-accent/50"
                />
                
                <Textarea 
                  placeholder="Tell me about your project ideas and requirements..." 
                  rows={6}
                  className="glass-button text-subtitle resize-none 
                             focus:ring-accent focus:border-accent/50"
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full material-accent text-primary-foreground font-medium tracking-wide
                             micro-bounce rounded-2xl py-6 text-lg shadow-[var(--shadow-glow)]
                             hover:animate-magnetic-hover"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-16 animate-slide-in-right">
            <div className="text-center">
              <div className="material-accent p-8 rounded-3xl inline-block mb-8 animate-glow-pulse micro-bounce">
                <Mail className="h-10 w-10 text-primary-foreground" />
              </div>
              <h4 className="text-title font-medium mb-4 tracking-tight">Let's Connect</h4>
              <p className="text-subtitle text-muted-foreground">hello@nordicvision.se</p>
            </div>

            <Card className="modern-card">
              <CardContent className="p-10 text-center relative z-10">
                <h4 className="text-title font-medium mb-6 tracking-tight">Studio Location</h4>
                <p className="text-muted-foreground text-subtitle leading-relaxed">
                  Stockholm, Sweden<br />
                  Available for projects locally and internationally
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};