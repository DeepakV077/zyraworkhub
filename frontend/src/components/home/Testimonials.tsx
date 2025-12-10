"use client";

import { useEffect, useState } from "react";
// lightweight: avoid external animation dependency to keep component self-contained
import { Star, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company?: string;
  image?: string;
  feedback: string;
  rating: number;
};

function ImageWithFallback({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    // simple fallback: initials with gradient background
    const initials = alt
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#FF7A00] to-[#FFB800] text-white font-semibold ${className ?? "w-full h-full"}`}
      >
        {initials}
      </div>
    );
  }

  return (
     
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Arjun Patel",
      role: "Computer Science Student",
      company: "IIT Delhi",
      image:
        "https://images.unsplash.com/photo-1646369505413-216676fef89c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjB0ZXN0aW1vbmlhbHxlbnwxfHx8fDE3NjEwNjE4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      feedback:
        "The AI & ML webinar was phenomenal! The speaker explained complex concepts in such a simple way. I've already started implementing what I learned in my projects.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Marketing Manager",
      company: "BrandCraft Agency",
      image:
        "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjEwMDQzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      feedback:
        "Zyra's design team created an absolutely stunning brand identity for our client. Their creativity and professionalism exceeded all expectations. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Startup Founder",
      company: "TechVentures",
      image:
        "https://images.unsplash.com/photo-1617386124435-9eb3935b1e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEwNjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      feedback:
        "Working with Zyra WorkHub on our marketing strategy was a game-changer. Their insights and execution helped us triple our reach in just 3 months!",
      rating: 5,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Design Student",
      company: "NIFT Mumbai",
      image:
        "https://images.unsplash.com/photo-1646369505413-216676fef89c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjB0ZXN0aW1vbmlhbHxlbnwxfHx8fDE3NjEwNjE4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      feedback:
        "The Design Thinking webinar opened my eyes to new methodologies. The practical exercises and real-world examples were incredibly valuable.",
      rating: 5,
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Product Manager",
      company: "StartupHub",
      image:
        "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjEwMDQzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      feedback:
        "Zyra's webinar on product strategy was exactly what I needed. Actionable insights from industry experts. Worth every minute!",
      rating: 5,
    },
    {
      id: 6,
      name: "Ananya Desai",
      role: "Freelance Designer",
      company: "Independent",
      image:
        "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjEwMDQzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      feedback:
        "As a freelancer, partnering with Zyra has been amazing. They provide consistent projects and fair compensation. Great community!",
      rating: 5,
    },
  ];

  useEffect(() => {
    if (testimonials.length > 1) {
      const id = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(id);
    }
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#FF7A00] font-semibold mb-2 block">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from students, professionals, and partners who have grown with Zyra WorkHub
          </p>
        </div>

        <div className="mb-12">
          <div className="p-12 bg-gradient-to-br from-[#FF7A00]/5 to-[#FFB800]/5 border-2 border-[#FF7A00]/20 rounded-lg">
            <Quote className="w-12 h-12 text-[#FF7A00] mb-6" />
            <p className="text-2xl mb-8 leading-relaxed">{current.feedback}</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <ImageWithFallback src={current.image} alt={current.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold">{current.name}</h4>
                <p className="text-sm text-muted-foreground">{current.role} • {current.company}</p>
                <div className="flex gap-1 mt-1" aria-hidden>
                  {Array.from({ length: current.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-gradient-to-r from-[#FF7A00] to-[#FFB800] w-8" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="p-6 h-full hover:shadow-xl transition-all duration-300 glass-card rounded-lg"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">{t.feedback}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
