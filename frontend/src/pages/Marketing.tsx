import { useState } from "react";
import { Megaphone, Users, Calendar, Send, CheckCircle } from "lucide-react";

export default function Marketing() {
  const [form, setForm] = useState({
    name: "",
    event: "",
    college: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Zyra Team 👋\n\nI want to promote an event.\n\nName: ${form.name}\nEvent: ${form.event}\nCollege/Org: ${form.college}\nDetails: ${form.message}`
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-white section-spacing">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-primary-orange">
            Student-Focused Promotion
          </span>

          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Promote Your <span className="gradient-text">Event</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Zyra helps students, clubs, and communities promote workshops,
            hackathons, webinars, and opportunities through student-driven
            channels — without spam, without noise.
          </p>
        </div>
      </section>

      {/* WHAT WE PROMOTE */}
      <section className="section-spacing bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              What We <span className="gradient-text">Promote</span>
            </h2>
            <p className="text-gray-600">
              We focus only on student-relevant and value-driven content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "College Events",
                desc: "Workshops, hackathons, fests, bootcamps, webinars",
              },
              {
                icon: Users,
                title: "Student Communities",
                desc: "Clubs, tech communities, learning groups",
              },
              {
                icon: Megaphone,
                title: "Opportunities",
                desc: "Internships, calls for speakers, learning initiatives",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-orange to-accent-yellow flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              "You submit your event or opportunity details",
              "Our team reviews it for relevance & quality",
              "Approved posts are shared in student communities",
              "Interested students connect directly with you",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200"
              >
                <CheckCircle className="w-6 h-6 text-primary-orange flex-shrink-0" />
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING NOTE */}
      <section className="section-spacing bg-gray-50">
        <div className="section-container text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Student-Friendly Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We keep pricing affordable and flexible so that student initiatives
            and college events can get visibility without heavy costs.
            Final pricing depends on content type and reach.
          </p>
        </div>
      </section>

      {/* CTA + FORM */}
      <section className="section-spacing bg-white">
        <div className="section-container max-w-3xl">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">
              Promote Your Event
            </h2>

            <div className="space-y-4">
              <input
                className="input"
                placeholder="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                className="input"
                placeholder="Event / Opportunity Name"
                name="event"
                value={form.event}
                onChange={handleChange}
              />

              <input
                className="input"
                placeholder="College / Community Name"
                name="college"
                value={form.college}
                onChange={handleChange}
              />

              <textarea
                className="input h-28"
                placeholder="Brief details (date, mode, audience, link)"
                name="message"
                value={form.message}
                onChange={handleChange}
              />

              <a
                href={`https://wa.me/919176711456?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Promote Your Event
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
