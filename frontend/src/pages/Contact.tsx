import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '9176711456';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us - Get in Touch"
        description="Contact Zyra Academy for webinar inquiries, design services, marketing partnerships, or general questions. We're here to help empower your journey."
        keywords="contact zyra academy, get in touch, webinar inquiry, design services contact, partnership inquiry, student support"
        url="https://zyraacademy.com/contact"
      />
      <ContactContent />
    </>
  );
}

function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest_type: 'general' as
      | 'design-service'
      | 'partnership'
      | 'collaboration'
      | 'general',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!formData.message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setLoading(true);

    /* ---------------- WHATSAPP MESSAGE ---------------- */

    const interestLabel = {
      general: 'General Inquiry',
      'design-service': 'Design Service',
      partnership: 'Partnership',
      collaboration: 'Collaboration',
    }[formData.interest_type];

    const message = `
📩 *New Contact Form Submission – Zyra Academy*

👤 *Name:* ${formData.name.trim()}
📧 *Email:* ${formData.email.trim()}
📞 *Phone:* ${formData.phone || 'Not provided'}

📌 *Interested In:* ${interestLabel}

💬 *Message:*
${formData.message.trim()}

—  
Sent via Zyra Academy Website
`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = whatsappUrl;
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-white section-spacing overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-primary-orange">
            Contact Zyra Academy
          </span>

          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6 text-gray-900">
            Let’s <span className="gradient-text">Connect</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, idea, or opportunity in mind?
            We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* LEFT */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-gray-900">
                Start a Conversation
              </h2>

              <p className="text-gray-600 mb-10 leading-relaxed">
                Whether you’re interested in webinars, design services,
                collaborations, or partnerships — our team is ready to help.
              </p>

              <div className="space-y-6">
                <InfoItem icon={Mail} label="Email" value="zyra.teams.in@gmail.com" />
                <InfoItem icon={Phone} label="Phone" value="+91 91767 11456" />
                <InfoItem icon={MapPin} label="Location" value="Chennai, Tamil Nadu" />
              </div>

              <div className="mt-10 p-6 rounded-xl bg-yellow-50 border border-yellow-100">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  Join Our Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay connected with updates, workshops, and opportunities.
                </p>
                <a
                  href="https://chat.whatsapp.com/EkBuvSx9jKlIV002Jd9HqL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Join WhatsApp Group
                </a>
              </div>
            </div>

            {/* FORM */}
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: 'Full Name', name: 'name', type: 'text' },
                  { label: 'Email Address', name: 'email', type: 'email' },
                  { label: 'Phone Number', name: 'phone', type: 'tel' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      title={field.label}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-orange outline-none"
                      required={field.name !== 'phone'}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="interest_type" className="block font-medium text-gray-700 mb-2">
                    Interested In
                  </label>
                  <select
                    id="interest_type"
                    name="interest_type"
                    value={formData.interest_type}
                    onChange={handleChange}
                    title="Interested In"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-orange outline-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="design-service">Design Services</option>
                    <option value="partnership">Partnership</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    title="Message"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-orange outline-none resize-none"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Opening WhatsApp...' : 'Send Message'}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary-orange" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}
