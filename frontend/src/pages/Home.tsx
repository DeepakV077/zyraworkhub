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
import FeedbackCarousel from '../components/home/FeedbackCarousel';
import UpcomingWebinars from '../components/home/UpcomingWebinars';
import FeaturedProjects from '../components/home/FeaturedProjects';

export default function Home() {
  const stats = [
    { label: 'Webinars Conducted', value: '5+', icon: Calendar },
    { label: 'Students', value: '200+', icon: Users },
    { label: 'Projects Completed', value: '20+', icon: Award },
    { label: 'Expert Speakers', value: '50+', icon: Sparkles },
  ];

  const services = [
    {
      title: 'Expert-Led Webinars',
      description: 'Join industry leaders across tech, design, marketing, and more. Learn from the best and grow your skills.',
      icon: Users,
      color: 'from-primary-orange to-accent-yellow',
      href: '/webinars',
    },
    {
      title: 'Design Studio',
      description: 'Professional branding, posters, digital art, and web design services tailored to your vision.',
      icon: Palette,
      color: 'from-accent-blue to-blue-500',
      href: '/design-studio',
    },
    {
      title: 'Marketing Partnership',
      description: 'Strategic collaborations to amplify your brand and reach your target audience effectively.',
      icon: TrendingUp,
      color: 'from-accent-yellow to-primary-orange',
      href: '/marketing',
    },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Pushing boundaries with creative solutions and forward-thinking approaches.',
    },
    {
      icon: Target,
      title: 'Result-Driven',
      description: 'Focused on delivering measurable outcomes that matter to your success.',
    },
    {
      icon: Heart,
      title: 'Youth-Powered',
      description: 'Built by young minds for ambitious individuals and brands worldwide.',
    },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-orange/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="section-container relative z-10 text-center animate-fade-in">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-orange/10 to-accent-yellow/10 text-primary-orange font-accent font-semibold text-sm border border-primary-orange/20">
              Welcome to the Future of Learning & Design
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold mb-6 leading-tight">
            Empowering Youth
            <br />
            <span className="gradient-text">Through Innovation</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            World-class webinars, exceptional design services, and strategic marketing partnerships to fuel your growth journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/webinars" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group">
              <span>Explore Webinars</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/design-studio" className="btn-secondary text-lg px-8 py-4">
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
                <div className="text-3xl font-heading font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed to elevate your brand and skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="group glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-primary-orange font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UpcomingWebinars />

      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that drive everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <value.icon className="w-10 h-10 text-primary-orange" />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects />

      <FeedbackCarousel />

      <section className="section-spacing bg-gradient-to-br from-primary-orange via-accent-yellow to-accent-blue">
        <div className="section-container text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of learners and brands who trust Zyra WorkHub for growth and innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/webinars" className="bg-white text-primary-orange px-8 py-4 rounded-lg font-accent font-semibold text-lg hover:scale-105 transition-transform shadow-xl">
              Browse Webinars
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-accent font-semibold text-lg hover:bg-white hover:text-primary-orange transition-all shadow-xl">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
