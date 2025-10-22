import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type Feedback = Database['public']['Tables']['feedback']['Row'];

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    if (feedbacks.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [feedbacks.length]);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-accent-yellow text-accent-yellow' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              What People <span className="gradient-text">Say</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto glass-card p-12 animate-pulse">
            <div className="bg-gray-200 h-32 rounded mb-6"></div>
            <div className="bg-gray-200 h-6 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (feedbacks.length === 0) {
    return null;
  }

  const currentFeedback = feedbacks[currentIndex];

  return (
    <section className="section-spacing bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our clients, students, and partners
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-primary-orange" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                {renderStars(currentFeedback.rating)}
              </div>

              <p className="text-xl sm:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                "{currentFeedback.message}"
              </p>

              <div className="flex items-center justify-center space-x-4">
                {currentFeedback.photo_url && (
                  <img
                    src={currentFeedback.photo_url}
                    alt={currentFeedback.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
                <div className="text-center">
                  <div className="font-heading font-bold text-lg text-gray-900">
                    {currentFeedback.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {currentFeedback.role.charAt(0).toUpperCase() + currentFeedback.role.slice(1)}
                    {currentFeedback.organization && ` • ${currentFeedback.organization}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {feedbacks.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-primary-orange" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-primary-orange" />
              </button>

              <div className="flex justify-center space-x-2 mt-8">
                {feedbacks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary-orange w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
