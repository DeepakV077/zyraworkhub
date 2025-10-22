import { Target, Eye, Heart, Users, Award, Rocket } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description:
        'To empower the next generation through accessible, high-quality webinars and creative services that fuel growth, innovation, and entrepreneurial spirit.',
    },
    {
      icon: Eye,
      title: 'Vision',
      description:
        'To become the global hub where youth-driven innovation meets professional excellence, bridging the gap between learning and real-world success.',
    },
    {
      icon: Heart,
      title: 'Core Values',
      description:
        'Innovation, Integrity, Excellence, Collaboration, and Youth Empowerment drive everything we do at Zyra WorkHub.',
    },
  ];

  const team = [
    {
      name: 'Alex Rivera',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Marcus Chen',
      role: 'Marketing Director',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Sophia Johnson',
      role: 'Webinar Coordinator',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const achievements = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Community Members',
    },
    {
      icon: Award,
      value: '500+',
      label: 'Webinars Delivered',
    },
    {
      icon: Rocket,
      value: '350+',
      label: 'Projects Completed',
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white section-spacing">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-orange/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl"></div>
        </div>

        <div className="section-container relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6">
            About <span className="gradient-text">Zyra WorkHub</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A youth-driven startup on a mission to revolutionize learning and creativity through world-class webinars, exceptional design services, and strategic marketing partnerships.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-orange to-accent-yellow flex items-center justify-center shadow-glow">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making a difference, one connection at a time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="glass-card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <achievement.icon className="w-12 h-12 text-primary-orange" />
                </div>
                <div className="text-4xl font-heading font-bold text-gray-900 mb-2">
                  {achievement.value}
                </div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white" id="team">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate individuals driving innovation forward
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-orange font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-gradient-to-br from-primary-orange via-accent-yellow to-accent-blue text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Be part of a movement that's shaping the future of learning and creativity
          </p>
          <a
            href="/contact"
            className="bg-white text-primary-orange px-8 py-4 rounded-lg font-accent font-semibold text-lg hover:scale-105 transition-transform shadow-xl inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
