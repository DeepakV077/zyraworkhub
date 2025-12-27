import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Palette,
  Layout,
  Smartphone,
  Globe,
  PenTool,
  ArrowRight,
} from "lucide-react";

export default function DesignStudio() {
  return (
    <>
      <SEO
        title="Design Studio - Professional Creative Services"
        description="Zyra Academy Design Studio offers professional branding, logo design, posters, digital art, web design, and creative solutions for businesses and individuals."
        keywords="design studio, graphic design, branding services, logo design, poster design, web design, digital art, creative services, professional design"
        url="https://zyraacademy.com/design-studio"
      />
      <DesignStudioContent />
    </>
  );
}

function DesignStudioContent() {
  const services = [
    {
      icon: Palette,
      title: "Branding & Visual Identity",
      description:
        "Logos, color systems, typography, and brand guidelines that define your identity clearly and professionally.",
    },
    {
      icon: Layout,
      title: "UI / UX Design",
      description:
        "Clean, user-focused interface designs for websites and applications that feel intuitive and modern.",
    },
    {
      icon: Globe,
      title: "Website Design",
      description:
        "Responsive, conversion-focused website designs tailored for startups, portfolios, and communities.",
    },
    {
      icon: Smartphone,
      title: "App UI Design",
      description:
        "Mobile app interfaces designed for clarity, usability, and consistency across platforms.",
    },
    {
      icon: PenTool,
      title: "Posters & Social Creatives",
      description:
        "Event posters, Instagram creatives, banners, and marketing assets that stand out while staying elegant.",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-white section-spacing overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-primary-orange">
            Zyra Design Studio
          </span>

          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6 text-gray-900">
            Design That <span className="gradient-text">Builds Trust</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We craft thoughtful designs that help startups, students, and brands
            communicate clearly and grow confidently.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary px-8 py-4 text-lg">
              Start a Project
            </Link>
            <Link to="/portfolio" className="btn-secondary px-8 py-4 text-lg">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              What We <span className="gradient-text">Design</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, elegant, and purpose-driven design services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="glass-card p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-orange" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A clear and collaborative design workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "01",
                title: "Understand",
                desc: "We learn about your goals, audience, and vision.",
              },
              {
                step: "02",
                title: "Design",
                desc: "We create clean concepts with attention to detail.",
              },
              {
                step: "03",
                title: "Refine & Deliver",
                desc: "We iterate based on feedback and deliver polished designs.",
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-8">
                <div className="text-4xl font-bold text-primary-orange mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-white">
        <div className="section-container text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6 text-gray-900">
            Let’s Design Something{" "}
            <span className="gradient-text">Meaningful</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you’re a startup, student, or creator — we’re ready to help
            bring your ideas to life.
          </p>

          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-lg"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
