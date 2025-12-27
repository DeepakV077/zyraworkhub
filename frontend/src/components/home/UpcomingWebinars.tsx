import { Link } from "react-router-dom";
import { Calendar, Sparkles } from "lucide-react";

interface Webinar {
  id: string;
  title: string;
  date: string;
  description: string;
}

export default function UpcomingWebinars() {
  // No upcoming webinars for now
  const webinars: Webinar[] = [];

  return (
    <section className="section-spacing bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="section-container">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-primary-orange">
            Stay Tuned
          </span>

          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Upcoming <span className="gradient-text">Webinars</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            We’re preparing our next set of high-impact learning experiences.
            New sessions will be announced soon.
          </p>
        </div>

        {/* EMPTY STATE */}
        {webinars.length === 0 && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-yellow-100 shadow-md p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
                <Calendar className="w-10 h-10 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Upcoming Events Right Now
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              All our recent webinars have been successfully completed.
              We’re currently curating new sessions with industry experts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/webinars"
                className="btn-secondary px-8 py-3"
              >
                View Past Webinars
              </Link>

              <Link
                to="https://chat.whatsapp.com/IdSwA92LuvuLC9g2xZSUuc"
                className="btn-primary px-8 py-3 flex items-center gap-2 justify-center"
              >
                <Sparkles className="w-5 h-5" />
                Get Notified
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
