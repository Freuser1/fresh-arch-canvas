import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Gallery = () => {
  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      caption: "Industrial framework",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
      caption: "Raw concrete",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      caption: "Steel structures",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1541976590-713941681591?w=400&h=300&fit=crop",
      caption: "Urban brutalism",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      caption: "Material contrast",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop",
      caption: "Geometric strength",
    },
  ];

  return (
    <section id="gallery" className="section-modern">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-6 animate-fade-in-up tracking-tight">
            VISUAL
            <br />
            <span className="text-hero">STUDIES</span>
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto animate-slide-in-right leading-relaxed">
            Moments captured during my architectural explorations and design process.
          </p>
        </div>

        {/* Polaroid Gallery Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {photos.map((photo, index) => (
                <CarouselItem key={photo.id} className="pl-2 md:pl-4 basis-auto">
                  <div 
                    className="industrial-photo animate-scale-in"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 0.5)}deg)`
                    }}
                  >
                    <div className="industrial-inner">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="industrial-image"
                        loading="lazy"
                      />
                      <div className="industrial-caption">
                        {photo.caption}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="industrial-nav-button -left-12" />
            <CarouselNext className="industrial-nav-button -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};