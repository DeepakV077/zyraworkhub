import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Webinar = Database['public']['Tables']['webinars']['Row'];

export default function Webinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    fetchWebinars();
  }, [filterStatus]);

  const fetchWebinars = async () => {
    try {
      let query = supabase
        .from('webinars')
        .select('*')
        .order('date', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setWebinars(data || []);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
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

  const filteredWebinars = webinars.filter((webinar) =>
    webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webinar.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6">
            Expert-Led <span className="gradient-text">Webinars</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join industry leaders and expand your knowledge across various domains
          </p>
          <Link
            to="/speakers/apply"
            className="btn-primary inline-block"
          >
            Become a Speaker
          </Link>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search webinars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-primary-orange to-accent-yellow text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  filterStatus === 'upcoming'
                    ? 'bg-gradient-to-r from-primary-orange to-accent-yellow text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  filterStatus === 'completed'
                    ? 'bg-gradient-to-r from-primary-orange to-accent-yellow text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Past
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredWebinars.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                No webinars found
              </h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWebinars.map((webinar) => (
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
                    {webinar.status === 'completed' && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm text-white text-sm font-semibold">
                        Completed
                      </div>
                    )}
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

                    <div className="mt-6">
                      <button className="w-full btn-primary text-sm">
                        {webinar.status === 'upcoming' ? 'Register Now' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
