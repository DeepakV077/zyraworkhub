import { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SpeakerApplication() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    linkedin_url: '',
    twitter_url: '',
    website_url: '',
    expertise: '',
    abstract: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const expertiseArray = formData.expertise.split(',').map((item) => item.trim());

      const { error: submitError } = await supabase.from('speakers').insert([
        {
          ...formData,
          expertise: expertiseArray,
        },
      ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        bio: '',
        linkedin_url: '',
        twitter_url: '',
        website_url: '',
        expertise: '',
        abstract: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="section-container text-center">
          <Mic className="w-16 h-16 mx-auto mb-6 text-primary-orange" />
          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6">
            Become a <span className="gradient-text">Speaker</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Share your expertise with thousands of learners worldwide
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="section-container max-w-4xl">
          <div className="glass-card p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Speaker Application Form
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We're always looking for passionate experts to share their knowledge. Fill out this form and we'll review your application within 5-7 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block font-medium text-gray-700 mb-2">
                  Professional Bio *
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange resize-none"
                  placeholder="Tell us about your professional background and experience..."
                />
              </div>

              <div>
                <label htmlFor="expertise" className="block font-medium text-gray-700 mb-2">
                  Areas of Expertise *
                </label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                  placeholder="Web Development, AI, Marketing (comma-separated)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate multiple topics with commas
                </p>
              </div>

              <div>
                <label htmlFor="abstract" className="block font-medium text-gray-700 mb-2">
                  Talk Proposal/Abstract *
                </label>
                <textarea
                  id="abstract"
                  name="abstract"
                  required
                  value={formData.abstract}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange resize-none"
                  placeholder="Describe your proposed webinar topic, what attendees will learn, and why it's valuable..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="linkedin_url" className="block font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label htmlFor="twitter_url" className="block font-medium text-gray-700 mb-2">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    id="twitter_url"
                    name="twitter_url"
                    value={formData.twitter_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                    placeholder="https://twitter.com/..."
                  />
                </div>

                <div>
                  <label htmlFor="website_url" className="block font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website_url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  Thank you for applying! We'll review your submission and get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
