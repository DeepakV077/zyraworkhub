import { Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Palette,
  TrendingUp,
  Calendar,
  Award,
  ArrowRight,
  Zap,
  Target,
  Heart,
} from 'lucide-react';

import UpcomingWebinars from '../components/home/UpcomingWebinars';
import FeaturedProjects from '../components/home/FeaturedProjects';

export default function Home() {
  const stats = [
    { label: 'Webinars Conducted', value: '7', icon: Calendar },
    { label: 'Students Reached', value: '750+', icon: Users },
    { label: 'Projects Completed', value: '5', icon: Award },
    { label: 'Student Speakers', value: '20+', icon: Sparkles },
  ];

  const services = [
    {
      title: 'Expert-Led Webinars',
      description:
        'Affordable student-led workshops across tech, design, career skills, and personal growth.',
      icon: Users,
      color: 'from-primary-orange to-accent-yellow',
      href: '/webinars',
    },
    {
      title: 'Design Studio',
      description:
        'Posters, branding, digital creatives, and UI work crafted by Zyra’s creative team.',
      icon: Palette,
      color: 'from-accent-blue to-blue-500',
      href: '/design-studio',
    },
    {
      title: 'Marketing Support',
      description:
        'Student-led promotion to reach campuses and communities at low cost.',
      icon: TrendingUp,
      color: 'from-accent-yellow to-primary-orange',
      href: '/marketing',
    },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description:
        'We experiment, learn fast, and build practical solutions driven by student creativity.',
    },
    {
      icon: Target,
      title: 'Impact Focused',
      description:
        'Every workshop and service is designed to deliver real learning and growth.',
    },
    {
      icon: Heart,
      title: 'Student Powered',
      description:
        'Built by students, for students — empowering young voices and leadership.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-yellow/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-6 px-4 py-2 rounded-full bg-yellow-100 text-primary-orange text-sm font-semibold">
            Student-Led • Affordable • Impact-Driven
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold mb-6 leading-tight">
            Empowering Students
            <br />
            <span className="gradient-text">Beyond Classrooms</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Zyra Academy delivers workshops, creative services, and real opportunities,
          built by students, for students.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/webinars" className="btn-primary px-8 py-4 text-lg">
              Explore Webinars
            </Link>
            <Link to="/design-studio" className="btn-secondary px-8 py-4 text-lg">
              View Our Work
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-orange to-accent-yellow flex items-center justify-center shadow-glow">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learning experiences and services designed for real-world growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="glass-card p-8 transition-none hover:shadow-none hover:scale-100 hover:translate-y-0"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-primary-orange font-semibold inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UpcomingWebinars />

      {/* CORE VALUES */}
      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <value.icon className="w-10 h-10 text-primary-orange" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects />

      {/* REAL FEEDBACK */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Real <span className="gradient-text">Voices</span> from Zyra
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Honest experiences from our students and speakers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text:
                  'Zyra gave me confidence to learn and interact. The workshops were practical and motivating.',
                role: 'Workshop Attendee',
              },
              {
                text:
                  'I became a speaker at Zyra after attending sessions. It was my first recognition as a mentor.',
                role: 'Student Speaker',
              },
              {
                text:
                  'It feels like a community, not just a platform. Students genuinely support each other.',
                role: 'Community Member',
              },
            ].map((f, i) => (
              <div key={i} className="glass-card p-8">
                <p className="text-gray-700 mb-6">“{f.text}”</p>
                <p className="font-semibold text-gray-900">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="section-container text-center relative z-10">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-100 text-primary-orange font-semibold">
            Start with ₹9. Grow Beyond Limits.
          </span>

          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Ready to Join <span className="gradient-text">Zyra?</span>
          </h2>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Learn, teach, and build your journey with a student-powered community.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/webinars" className="btn-primary px-8 py-4 text-lg">
              Browse Webinars
            </Link>
            <Link to="/contact" className="btn-secondary px-8 py-4 text-lg">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
