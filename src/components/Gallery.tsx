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
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      caption: "Morning light study",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
      caption: "Material textures",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      caption: "Urban geometry",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
      caption: "Shadow play",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      caption: "Concrete studies",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop",
      caption: "Light patterns",
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
                    className="polaroid-photo animate-scale-in"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 1)}deg)`
                    }}
                  >
                    <div className="polaroid-inner">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="polaroid-image"
                        loading="lazy"
                      />
                      <div className="polaroid-caption">
                        {photo.caption}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="polaroid-nav-button -left-12" />
            <CarouselNext className="polaroid-nav-button -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};