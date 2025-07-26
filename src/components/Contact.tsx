import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="section-nordic bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-display mb-6 animate-fade-in-up tracking-wide">
            LET'S CONNECT
            <br />
            <span className="text-accent">& CREATE</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right font-light leading-relaxed">
            Ready to explore a vision that transforms spaces into sanctuaries? 
            I'd love to hear about your dreams and bring them to life through thoughtful design.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <Card className="nordic-card animate-fade-in-up">
            <CardContent className="p-10">
              <h3 className="text-title mb-8 font-light tracking-wide">Begin the Journey</h3>
              
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input 
                    placeholder="First Name" 
                    className="border-border focus:ring-accent transition-[var(--transition-smooth)]
                               bg-background/50 backdrop-blur-sm rounded-sm"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="border-border focus:ring-accent transition-[var(--transition-smooth)]
                               bg-background/50 backdrop-blur-sm rounded-sm"
                  />
                </div>
                
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="border-border focus:ring-accent transition-[var(--transition-smooth)]
                             bg-background/50 backdrop-blur-sm rounded-sm"
                />
                
                <Input 
                  placeholder="Project Vision" 
                  className="border-border focus:ring-accent transition-[var(--transition-smooth)]
                             bg-background/50 backdrop-blur-sm rounded-sm"
                />
                
                <Textarea 
                  placeholder="Share your inspiration and dreams..." 
                  rows={6}
                  className="border-border focus:ring-accent transition-[var(--transition-smooth)] 
                             resize-none bg-background/50 backdrop-blur-sm rounded-sm"
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full material-wood text-primary-foreground font-light tracking-wide
                             hover:shadow-[var(--shadow-elevation)] transition-[var(--transition-structure)]
                             rounded-sm py-4 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-12 animate-slide-in-right">
            <div className="text-center">
              <div className="material-wood p-6 rounded-sm inline-block mb-6 animate-breathe">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-title font-light mb-2 tracking-wide">Let's Connect</h4>
              <p className="text-lg text-muted-foreground font-light">hello@nordicvision.se</p>
            </div>

            <Card className="nordic-card material-linen">
              <CardContent className="p-8 text-center">
                <h4 className="text-title font-light mb-4 tracking-wide">Studio Location</h4>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Stockholm, Sweden<br />
                  Where Nordic light meets visionary design
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};