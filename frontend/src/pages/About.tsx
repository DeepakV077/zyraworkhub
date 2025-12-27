import { Target, Eye, Heart, Users, Award, Rocket } from "lucide-react";
import SEO from "../components/SEO";
import DeepakImg from "../assets/Deepak.jpg";
import LogeshImg from "../assets/logesh E.jpg";
import DhineshImg from "../assets/Dhinesh.jpeg";
import DilliImg from "../assets/Dilli.jpg";
import AdithyaImg from "../assets/Adithya.jpg";
import KrishImg from "../assets/Krish.jpeg";
import MithileshImg from "../assets/Mithilesh.jpg";
import ThiruImg from "../assets/Thiru.jpeg";
import SudharsanImg from "../assets/Sudharsan.jpeg";
import SanjeevanImg from "../assets/Sanjeevan.jpg";
import KottiImg from "../assets/Kotti.jpeg";
import WillImg from "../assets/Bright.jpeg";
import SanthithImg from "../assets/Santhith.jpg";

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Youth-Driven Innovation"
        description="Meet the passionate team behind Zyra Academy. We're young innovators empowering youth through expert-led webinars, design services, and marketing support."
        keywords="about zyra academy, youth startup, student innovation, young entrepreneurs, tech education team, design studio team"
        url="https://zyraacademy.com/about"
      />
      <AboutContent />
    </>
  );
}

function AboutContent() {
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
    { icon: Users, value: "500+", label: "Community Members" },
    { icon: Award, value: "7", label: "Webinars Delivered" },
    { icon: Rocket, value: "3", label: "Projects Completed" },
  ];

  const teams = [
    {
      title: "Leadership Team",
      members: [
        { name: "Deepak V", role: "Founder & CEO", photo: DeepakImg },
        { name: "Dilli Baskaran K", role: "Co-Founder & CTO", photo: DilliImg },
        { name: "Logesh E", role: "Co-Founder & COO", photo: LogeshImg },
      ],
    },
    {
      title: "Strategic Management",
      members: [
        { name: "Krish Roshan R", role: "Innovation & Strategy Manager", photo: KrishImg },
        { name: "Adithya S", role: "Human Resources Manager", photo: AdithyaImg },
      ],
    },
    {
      title: "Creative Division",
      members: [
        { name: "Mithilesh R", role: "Design Lead", photo: MithileshImg },
        { name: "Thiruvarangan M", role: "Design Co-Lead", photo: ThiruImg },
      ],
    },
    {
      title: "Community & Outreach Division",
      members: [
        { name: "Will Bright", role: "Community Manager", photo: WillImg },
        { name: "Santhith P", role: "Community Manager", photo: SanthithImg },
        { name: "Dhinesh V N", role: "Outreach Coordinator", photo: DhineshImg },
      ],
    },
    {
      title: "Research & Content Division",
      members: [
        { name: "Sudharsan R", role: "Content Strategist", photo: SudharsanImg },
        { name: "Sanjeevan G", role: "Research & Trend Analyst", photo: SanjeevanImg },
        { name: "Kottishwaran R", role: "Documentation Lead", photo: KottiImg },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white section-spacing overflow-hidden">
        {/* subtle premium accents (NOT backgrounds) */}
        <div className="absolute top-16 left-16 w-56 h-56 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-16 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container relative z-10 text-center">
          {/* small premium label */}
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold badge-yellow">
            About Zyra Academy
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold mb-6 text-gray-900">
            Building the Future with{" "}
            <span className="gradient-text">Youth & Innovation</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            A youth-driven startup revolutionizing learning, innovation, and creativity
            through impactful webinars, design, and strategic collaborations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
            <a href="#team" className="btn-secondary">
              Meet the Team
            </a>
          </div>
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
                        <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-[#ff7b00] to-[#ffd700] text-4xl font-bold text-white">
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
