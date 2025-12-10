import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import type { Webinar } from '../../types/database';

export default function UpcomingWebinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingWebinars();
  }, []);

  const fetchUpcomingWebinars = async () => {
    try {
      const BACKEND = import.meta.env.DEV ? 'http://127.0.0.1:4000' : '';
      const res = await fetch(`${BACKEND}/api/webinars`);
      if (!res.ok) {
        console.error('Failed to fetch webinars:', res.status);
        setWebinars([]);
        return;
      }
      const data = await res.json();
      const now = new Date().toISOString();
      const upcoming = (data || [])
        .filter((w: Webinar) => w.status === 'upcoming' && w.date >= now)
        .sort((a: Webinar, b: Webinar) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
      setWebinars(upcoming as Webinar[]);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Upcoming <span className="gradient-text">Webinars</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-3"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (webinars.length === 0) {
    return (
      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Upcoming <span className="gradient-text">Webinars</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              New webinars coming soon! Check back later.
            </p>
            <Link to="/speakers/apply" className="btn-primary inline-flex items-center space-x-2">
              <span>Become a Speaker</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Upcoming <span className="gradient-text">Webinars</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join expert-led sessions and expand your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {webinars.map((webinar) => (
            <Link
              key={webinar.id}
              to={`/webinars/${webinar.id}`}
              className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-orange to-accent-blue overflow-hidden">
                {webinar.thumbnail_url ? (
                  <img
                    src={webinar.thumbnail_url}
                    alt={webinar.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white/50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary-orange text-sm font-semibold">
                  {webinar.domain}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-orange transition-colors line-clamp-2">
                  {webinar.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {webinar.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary-orange" />
                    <span>{formatDate(webinar.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary-orange" />
                    <span>{formatTime(webinar.date)} • {webinar.duration_minutes} mins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary-orange" />
                    <span>
                      {webinar.registered_count}/{webinar.capacity} registered
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-primary-orange font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Register Now</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/webinars" className="btn-primary inline-flex items-center space-x-2">
            <span>View All Webinars</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
