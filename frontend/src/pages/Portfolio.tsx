import { useState } from "react";
import { Search, X } from "lucide-react";

/* ---------------- LOCAL IMAGES ---------------- */
import html from "../assets/portfolio/webinar-html.png";
import uiux from "../assets/portfolio/webinar-uiux.jpeg";
import ai from "../assets/portfolio/webinar-ai.jpeg";
import ml from "../assets/portfolio/webinar-ml.png";
import dna from "../assets/portfolio/webinar-dna.jpeg";
import genai from "../assets/portfolio/webinar-genai.png";
import sketch from "../assets/portfolio/webinar-sketch.jpeg";

/* ---------------- TYPES ---------------- */
type Project = {
  id: string;
  order: number;
  title: string;
  description: string;
  client_name: string;
  category: string;
  image: string;
};

/* ---------------- STATIC DATA ---------------- */
const PROJECTS: Project[] = [
  {
    id: "1",
    order: 1,
    title: "HTML Bootcamp Poster",
    description: "Creative poster for our comprehensive HTML webinar bootcamp. Learn the foundations of web development from expert instructors in this interactive live session.",
    client_name: "Zyra Academy",
    category: "poster",
    image: html,
  },
  {
    id: "2",
    order: 2,
    title: "UI/UX Hands-on Workshop",
    description: "Modern design poster for our UI/UX hands-on webinar workshop. Master design principles and create stunning user experiences in this live collaborative session.",
    client_name: "Zyra Academy",
    category: "poster",
    image: uiux,
  },
  {
    id: "3",
    order: 3,
    title: "AI Unleashed Webinar",
    description: "Promotional creative for our AI Unleashed webinar. Explore cutting-edge artificial intelligence applications and learn how AI is transforming industries.",
    client_name: "Zyra Academy",
    category: "poster",
    image: ai,
  },
  {
    id: "4",
    order: 4,
    title: "Machine Learning Unplugged",
    description: "Minimal poster for our Machine Learning Unplugged webinar. Dive deep into ML fundamentals and algorithms with hands-on examples from industry experts.",
    client_name: "Zyra Academy",
    category: "poster",
    image: ml,
  },
  {
    id: "5",
    order: 5,
    title: "DNA Revolution Webinar",
    description: "Scientific themed poster for our DNA Revolution genomics webinar. Discover the latest breakthroughs in genetic science and biotechnology innovations.",
    client_name: "Zyra Academy",
    category: "poster",
    image: dna,
  },
  {
    id: "6",
    order: 6,
    title: "Generative AI Bootcamp",
    description: "Bold poster for our Generative AI Bootcamp webinar. Learn to harness the power of generative AI tools and build intelligent applications.",
    client_name: "Zyra Academy",
    category: "poster",
    image: genai,
  },
  {
    id: "7",
    order: 7,
    title: "From Sketch to Screen",
    description: "Creative poster for our From Sketch to Screen webinar. Follow the complete UI/UX journey from concept to final digital product with live demonstrations.",
    client_name: "Zyra Academy",
    category: "poster",
    image: sketch,
  },
];

export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // ❌ DO NOT CHANGE FILTER BUTTONS
  const categories = ["all", "poster", "branding", "digital-art", "marketing"];

  const filteredProjects = PROJECTS
    .sort((a, b) => a.order - b.order) // ✅ ORDER MAINTAINED
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        filterCategory === "all" || p.category === filterCategory;

      return matchSearch && matchCategory;
    });

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-yellow-50 to-white py-24">
        <div className="section-container text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-primary-orange">
            Design & Marketing
          </span>

          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Webinar posters and creative designs crafted to engage, inspire,
            and convert audiences.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-spacing bg-white">
        <div className="section-container">
          {/* SEARCH */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-orange"
            />
          </div>

          {/* FILTERS (UNCHANGED) */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize ${filterCategory === c
                    ? "bg-gradient-to-r from-primary-orange to-accent-yellow text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {c === "all" ? "All Projects" : c.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* GRID */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-24">
              <div className="max-w-xl mx-auto">
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                  Designs Coming Soon ✨
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We’re actively working on new{" "}
                  <span className="font-semibold text-primary-orange">
                    {filterCategory.replace("-", " ")}
                  </span>{" "}
                  projects.
                  <br />
                  Stay tuned — exciting creative work will be showcased here shortly.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveProject(project)}
                  role="button"
                  tabIndex={0}
                  className="glass-card overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Client: {project.client_name}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setActiveProject(null)}
            aria-label="Close modal"
            tabIndex={-1}
          />
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden animate-scaleIn relative z-10"
            role="document"
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X />
            </button>

            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6">
              <span className="inline-block mb-2 px-3 py-1 text-xs rounded-full bg-yellow-100 text-primary-orange font-semibold">
                poster
              </span>

              <h2 className="text-2xl font-heading font-extrabold mb-2">
                {activeProject.title}
              </h2>

              <p className="text-gray-600 mb-3">
                Client: <strong>{activeProject.client_name}</strong>
              </p>

              <p className="text-gray-700 leading-relaxed">
                {activeProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
