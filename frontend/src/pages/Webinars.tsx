import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, ArrowRight, Linkedin, Star } from "lucide-react";
import SEO from "../components/SEO";

/* ===================== WEBINAR DATA ===================== */
const WEBINARS = [
  {
    title: "Web Foundations Bootcamp",
    domain: "Web Development",
    date: "August 23, 2025",
    time: "7:00 PM",
    duration: "90 mins",
    registered: "28 / 50",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7362827745204015104",
    status: "completed",
  },
  {
    title: "Introduction to HTML",
    domain: "HTML",
    date: "September 2, 2025",
    time: "7:00 PM",
    duration: "60 mins",
    registered: "33 / 50",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7366108094591811586",
    status: "completed",
  },
  {
    title: "Generative AI Bootcamp",
    domain: "Artificial Intelligence",
    date: "September 27, 2025",
    time: "7:00 PM",
    duration: "60 mins",
    registered: "40 / 80",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7376960320524865536",
    status: "completed",
  },
  {
    title: "AI Unleashed",
    domain: "AI",
    date: "October 12, 2025",
    time: "7:00 PM",
    duration: "60 mins",
    registered: "67 / 100",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7380237876392869888",
    status: "completed",
  },
  {
    title: "ML Unplugged",
    domain: "Machine Learning",
    date: "October 24, 2025",
    time: "7:00 PM",
    duration: "60 mins",
    registered: "77 / 100",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7384607146136473601",
    status: "completed",
  },
  {
    title: "The DNA Revolution",
    domain: "Biotech & Genomics",
    date: "November 3, 2025",
    time: "7:00 PM",
    duration: "60 mins",
    registered: "80 / 100",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7389368297768693761",
    status: "completed",
  },
  {
    title: "From Sketch to Screen",
    domain: "UI/UX Design",
    date: "December 20, 2025",
    time: "6:00 PM",
    duration: "60 mins",
    registered: "50 / 100",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7404768616711151617",
    status: "completed",
  },
];

/* ===================== COMPONENT ===================== */
export default function Webinars() {
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "ongoing">("all");
  const AVG_RATING = 4.7;

  return (
    <>
      <SEO
        title="Webinars - Expert-Led Online Learning | Zyra Academy"
        description="Join our expert-led webinars on AI, Web Development, UI/UX Design, Machine Learning, and more. Free and affordable sessions for students and young professionals."
        keywords="webinars, online courses, AI webinar, web development course, UI/UX design, machine learning, tech education, student webinars"
        url="https://zyraacademy.com/webinars"
      />
      <WebinarsContent filterStatus={filterStatus} setFilterStatus={setFilterStatus} avgRating={AVG_RATING} />
    </>
  );
}

function WebinarsContent({ 
  filterStatus, 
  setFilterStatus, 
  avgRating 
}: { 
  filterStatus: "all" | "completed" | "ongoing"; 
  setFilterStatus: (status: "all" | "completed" | "ongoing") => void;
  avgRating: number;
}) {
  const getStatusStyles = (status: string) =>
    status === "ongoing"
      ? "bg-orange-500 text-white"
      : "bg-white/90 text-[#FF7A00]";

  const filteredWebinars = WEBINARS
    .filter((w) => filterStatus === "all" || w.status === filterStatus)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section className="relative py-24 bg-gradient-to-br from-[#FF7A00] via-[#FF9F00] to-[#FFD65A] text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-sm font-semibold">
            Zyra Academy Webinars
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Expert-Led <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
              Learning Experiences
            </span>
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Carefully curated webinars designed to build real-world skills,
            confidence, and clarity — beyond textbooks.
          </p>

          {/* HERO CTA + RATING */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/speakers/apply"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[#FF7A00] font-semibold shadow-md hover:scale-105 transition"
            >
              Become a Speaker
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/40">
              <Star className="w-4 h-4" />
              <span className="font-semibold">{avgRating} Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {/* FILTER STATUS */}
        <div className="flex gap-2 justify-center mb-8">
          {(["all", "ongoing", "completed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filterStatus === s
                  ? "bg-gradient-to-r from-[#FF7A00] to-[#FFD65A] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        {/* GRID or Empty State */}
        {filteredWebinars.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No webinars found</h3>
            <p className="text-gray-600 mb-6">Try a different filter or check back soon — we update sessions regularly.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setFilterStatus("all")}
                className="px-5 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200"
              >
                View All
              </button>
              <Link
                to="/speakers/apply"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFD65A] text-white font-semibold"
              >
                Become a Speaker
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredWebinars.map((w, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* BADGES */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles(w.status)}`}>
                    {w.status === "ongoing" ? "Ongoing" : "Completed"}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/70 text-white">
                    ★ {w.rating}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">
                <span className="text-sm font-semibold text-[#FF7A00]">
                  {w.domain}
                </span>

                <h3 className="text-xl font-bold text-gray-900">
                  {w.title}
                </h3>

                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF7A00]" />
                    {w.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF7A00]" />
                    {w.time} • {w.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FF7A00]" />
                    {w.registered}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFD65A] text-white font-semibold transition-all duration-300 group-hover:gap-3"
                >
                  <Linkedin className="w-4 h-4" />
                  View on LinkedIn
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* SOFT GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-orange-400/10" />
              </div>
            </div>
          ))}
        </div>
        )}
      </section>
    </div>
  );
}
