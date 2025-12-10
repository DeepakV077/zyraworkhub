import { Target, Eye, Heart, Users, Award, Rocket } from "lucide-react";
import DeepakImg from "../assets/Deepak.jpg";
import LogeshImg from "../assets/logesh E.jpg";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To empower the next generation through accessible, high-quality webinars and creative services that fuel growth, innovation, and entrepreneurial spirit.",
    },
    {
      icon: Eye,
      title: "Vision",
      description:
        "To become the global hub where youth-driven innovation meets professional excellence, bridging the gap between learning and real-world success.",
    },
    {
      icon: Heart,
      title: "Core Values",
      description:
        "Innovation, Integrity, Excellence, Collaboration, and Youth Empowerment drive everything we do at Zyra Academy.",
    },
  ];

  const achievements = [
    { icon: Users, value: "10,000+", label: "Community Members" },
    { icon: Award, value: "500+", label: "Webinars Delivered" },
    { icon: Rocket, value: "350+", label: "Projects Completed" },
  ];

  const teams = [
    {
      title: "Leadership Team",
      members: [
        { name: "Deepak V", role: "Founder & CEO", photo: DeepakImg },
        { name: "Dilli", role: "Co-Founder & CTO" },
        { name: "Logesh", role: "Co-Founder & COO", photo: LogeshImg },
      ],
    },
    {
      title: "Strategic Management",
      members: [
        { name: "Krish", role: "Innovation & Strategy Manager", photo: "/images/team/krish.jpg" },
        { name: "Aditya", role: "Human Resources Manager" },
      ],
    },
    {
      title: "Creative Division",
      members: [
        { name: "Mithilesh", role: "Design Lead", photo: "/images/team/mithilesh.jpg" },
        { name: "Thiru", role: "Design Co-Lead", photo: "/images/team/thiru.jpg" },
      ],
    },
    {
      title: "Community & Outreach Division",
      members: [
        { name: "Will Bright", role: "Community Manager", photo: "/images/team/will.jpg" },
        { name: "Santhith", role: "Community Manager" },
        { name: "Dhinesh", role: "Outreach Coordinator", photo: "/images/team/dhinesh.jpg" },
      ],
    },
    {
      title: "Research & Content Division",
      members: [
        { name: "Sudharsan", role: "Content Strategist", photo: "/images/team/sudharsan.jpg" },
        { name: "Sanjeevan", role: "Research & Trend Analyst", photo: "/images/team/sanjeevan.jpg" },
        { name: "Kotti", role: "Documentation Lead" },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white section-spacing">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffb347]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffd700]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="section-container relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6">
            About <span className="gradient-text">Zyra Academy</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A youth-driven startup revolutionizing learning, innovation, and creativity
            through impactful webinars, design, and strategic collaborations.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Core Values */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#ff7b00] to-[#ffd700] flex items-center justify-center shadow-lg shadow-[#ffb347]/30">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making a difference, one connection at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="glass-card p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex justify-center mb-4">
                  <a.icon className="w-12 h-12 text-[#ff7b00]" />
                </div>
                <div className="text-4xl font-heading font-bold text-gray-900 mb-2">
                  {a.value}
                </div>
                <div className="text-gray-600">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing bg-white" id="team">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Meet the <span className="gradient-text">Zyra Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visionaries, creators, and innovators building the future together.
            </p>
          </div>

          {teams.map((group) => (
            <div key={group.title} className="mb-16">
              <h3 className="text-3xl font-heading font-bold text-[#ff7b00] text-center mb-10">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {group.members.map((m) => (
                  <div
                    key={m.name}
                    className="relative group glass-card text-center p-6 w-full sm:w-72 overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]"
                  >
                    {/* Square Photo with Soft Corners and Glow */}
                    <div className="relative w-40 h-40 mx-auto mb-6 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff7b00] to-[#ffd700] opacity-60 blur-md group-hover:blur-lg transition-all duration-700 rounded-xl"></div>
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="w-full h-full object-cover rounded-xl transform transition-all duration-700 group-hover:scale-105 shadow-lg shadow-[#ffb347]/40"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-[#ff7b00]/10 to-[#ffd700]/10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ff7b00] to-[#ffd700]">
                          {m.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Name and Role */}
                    <h4 className="text-2xl font-heading font-bold bg-gradient-to-br from-[#ff7b00] to-[#ffd700] bg-clip-text text-transparent mb-2">
                      {m.name}
                    </h4>
                    <p className="text-gray-600 font-medium mb-4">{m.role}</p>

                    <div className="inline-block px-4 py-1 rounded-full text-sm bg-gradient-to-r from-[#ff7b00]/20 to-[#ffd700]/20 text-[#ff7b00] font-semibold">
                      {group.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-gradient-to-br from-[#ff7b00] via-[#ffb347] to-[#ffd700] text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Be part of a movement shaping the future of learning and innovation.
          </p>
          <a
            href="/contact"
            className="bg-white text-[#ff7b00] px-8 py-4 rounded-lg font-accent font-semibold text-lg hover:scale-105 transition-transform shadow-xl inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
