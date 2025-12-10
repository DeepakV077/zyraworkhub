import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, Search, Video, ArrowRight } from "lucide-react";
import type { Webinar } from "../types/database";

export default function Webinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all");

  const fetchWebinars = useCallback(async () => {
    try {
      const BACKEND = import.meta.env.DEV ? "http://127.0.0.1:4000" : "";
      const res = await fetch(`${BACKEND}/api/webinars`);
      if (!res.ok) {
        console.error("Failed to fetch webinars:", res.status);
        setWebinars([]);
        return;
      }
      const data = await res.json();
      let list: Webinar[] = (data as Webinar[]) || [];
      if (filterStatus !== "all") list = list.filter((w: Webinar) => w.status === filterStatus);
      setWebinars(list);
    } catch (error) {
      console.error("Error fetching webinars:", error);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Static featured webinars
  const featuredWebinars = [
    {
      id: "f1",
      title: "AI & Machine Learning: The Future of Technology",
      description: "Explore the breakthroughs shaping tomorrow’s intelligent systems.",
      speaker: "Dr. Sarah Chen",
      speakerRole: "AI Research Lead at TechCorp",
      date: "2025-11-15T18:00:00+05:30",
      duration_minutes: 90,
      platform: "Zoom",
      registered_count: 234,
      capacity: 500,
      domain: "AI & ML",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1758691736545-5c33b6255dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "f2",
      title: "Building Winning Product Strategies",
      description: "Learn frameworks to craft impactful product roadmaps and user journeys.",
      speaker: "Rahul Sharma",
      speakerRole: "Product Manager at StartupXYZ",
      date: "2025-11-22T19:00:00+05:30",
      duration_minutes: 120,
      platform: "Google Meet",
      registered_count: 156,
      capacity: 300,
      domain: "Product Strategy",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1603201667106-0e3e0ae584c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  // Merge featured + fetched webinars
  const allWebinars: Webinar[] = [...featuredWebinars, ...webinars];

  // Apply search
  const filteredWebinars = allWebinars.filter((webinar) => {
    const term = searchTerm.toLowerCase();
    return (
      webinar.title.toLowerCase().includes(term) ||
      (webinar.description || "").toLowerCase().includes(term) ||
      (webinar.domain || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#FF7A00] via-[#FF9F00] to-[#FFD65A] text-white py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Expert-Led{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
              Webinars
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Learn from innovators and industry leaders shaping the future.
          </p>
          <Link
            to="/speakers/apply"
            className="bg-white text-[#FF7A00] px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-yellow-50 transition-transform duration-300"
          >
            Become a Speaker
          </Link>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search webinars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
              />
            </div>

            <div className="flex gap-2">
              {(["all", "upcoming", "completed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? "bg-gradient-to-r from-[#FF7A00] to-[#FFD65A] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* COMBINED WEBINARS GRID */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg" />
              ))}
            </div>
          ) : filteredWebinars.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No webinars found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 group border border-yellow-50"
                >
                  <img
                    src={
                      (webinar as any).image ||
                      "https://images.unsplash.com/photo-1581091012184-7acb80ccedbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    }
                    alt={webinar.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-[#FF7A00] bg-orange-50 px-3 py-1 rounded-full">
                        {webinar.domain || "General"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {webinar.status === "upcoming" ? "Upcoming" : "Completed"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#FF7A00] transition-colors">
                      {webinar.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {webinar.description || "Join this insightful session to learn more."}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#FF7A00]" />
                        <span>{formatDate(webinar.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FF7A00]" />
                        <span>
                          {formatTime(webinar.date)} • {webinar.duration_minutes || 60} mins
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#FF7A00]" />
                        <span>
                          {webinar.registered_count || 0}/{webinar.capacity || 100} registered
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FFD65A] text-white py-2 rounded-full font-semibold hover:opacity-90 flex items-center justify-center gap-2">
                        {webinar.status === "upcoming" ? (
                          <>
                            Register Now <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          "View Details"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
