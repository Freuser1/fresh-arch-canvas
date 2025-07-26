import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="section-architecture bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 animate-fade-in-up">
            LET'S CREATE
            <br />
            <span className="text-accent">TOGETHER</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-right">
            Ready to transform your vision into architectural reality? 
            We'd love to discuss your project and explore the possibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="structure-card animate-fade-in-up">
            <CardContent className="p-8">
              <h3 className="text-title mb-6">Start a Conversation</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name" 
                    className="border-border focus:ring-accent transition-[var(--transition-smooth)]"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="border-border focus:ring-accent transition-[var(--transition-smooth)]"
                  />
                </div>
                
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="border-border focus:ring-accent transition-[var(--transition-smooth)]"
                />
                
                <Input 
                  placeholder="Project Type" 
                  className="border-border focus:ring-accent transition-[var(--transition-smooth)]"
                />
                
                <Textarea 
                  placeholder="Tell us about your vision..." 
                  rows={6}
                  className="border-border focus:ring-accent transition-[var(--transition-smooth)] resize-none"
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full material-brass text-primary-foreground font-medium
                             hover:shadow-[var(--shadow-elevation)] transition-[var(--transition-structure)]"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="material-brass p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">hello@structure.design</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="material-brass p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="material-brass p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Studio</h4>
                  <p className="text-muted-foreground">
                    123 Design District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <Card className="structure-card material-concrete">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Office Hours</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};