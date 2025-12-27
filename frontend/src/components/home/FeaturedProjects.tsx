import { ArrowRight, Palette, Megaphone, Users, Clock } from "lucide-react";

export default function FeaturedProjects() {
  const projects = [
    {
      title: "Design Creatives & Posters",
      description:
        "A growing collection of webinar posters, visual creatives, and design experiments crafted for student-led learning sessions.",
      icon: Palette,
      tag: "Design • Ongoing",
    },
    {
      title: "Webinar Marketing Campaigns",
      description:
        "Low-cost, high-impact marketing strategies used to promote Zyra webinars through WhatsApp communities and social platforms.",
      icon: Megaphone,
      tag: "Marketing • Active",
    },
    {
      title: "Student Learning Initiatives",
      description:
        "Educational initiatives including live webinars, peer-led sessions, and community-driven knowledge sharing.",
      icon: Users,
      tag: "Community • Live",
    },
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="section-container">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-orange-100 text-primary-orange">
            Our Work
          </span>

          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Featured <span className="gradient-text">Initiatives</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We focus on real impact — design, marketing, and learning experiences
            built by students, for students.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-8
                         hover:shadow-xl hover:border-orange-200 transition-all"
            >
              {/* ICON */}
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl
                              flex items-center justify-center mb-6">
                <project.icon className="w-7 h-7 text-white" />
              </div>

              {/* TAG */}
              <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full
                               bg-orange-100 text-primary-orange text-xs font-semibold">
                <Clock className="w-3 h-3" />
                {project.tag}
              </span>

              {/* CONTENT */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-gray-400 font-semibold">
                Case studies evolving
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
