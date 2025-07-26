import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
