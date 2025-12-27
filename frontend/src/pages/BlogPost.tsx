import { useParams, Link } from "react-router-dom";
import { Sparkles, Users, Mic, Rocket } from "lucide-react";

type TimelineItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const TIMELINE: TimelineItem[] = [
  {
    title: "The Idea",
    description:
      "Zyra Workshop began with one belief, learning should be affordable and student talent deserves a stage.",
    icon: Sparkles,
  },
  {
    title: "First Workshop",
    description:
      "Our first online session had only a few participants, but the energy, curiosity, and engagement proved the idea was right.",
    icon: Mic,
  },
  {
    title: "Growing Community",
    description:
      "Within a few months, Zyra grew into a 13-member core team and reached 150+ students across colleges and schools.",
    icon: Users,
  },
  {
    title: "Beyond Workshops",
    description:
      "Beyond learning sessions, Zyra expanded into design services and marketing support, helping startups, student communities, and events with branding, promotion, and creative strategy while sustaining its educational mission.",
    icon: Rocket,
  },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  if (slug !== "success-stories") {
    return (
      <div className="section-container section-spacing text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link to="/blog" className="text-primary-orange font-semibold">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="section-container section-spacing">
      <article className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold mb-6 text-gray-900">
          Zyra Workshop: A Student-Led Success Story
        </h1>

        {/* Intro Highlight */}
        <p className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-md text-lg text-gray-800 font-medium mb-10">
          Zyra Workshop began with a simple belief — quality learning should be
          affordable, and student talent deserves a platform.
        </p>

        {/* Story Content */}
        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            What started as a small idea quickly turned into a growing learning
            community. Our very first online session had only a handful of
            participants, but the enthusiasm and engagement were overwhelming.
          </p>

          <p>
            Within just a few months, Zyra Workshop grew into a 13-member core
            team and reached students from multiple colleges and schools.
          </p>

          <p>
            What truly sets Zyra apart isn’t just affordability, it’s the
            people. Workshops are conducted by students, for students, creating
            an open and confidence-building learning environment.
          </p>

          <p>
            Many who once joined as attendees now confidently contribute as
            speakers, designers, and coordinators, gaining recognition and
            real-world exposure through Zyra.
          </p>
        </div>

        {/* Timeline */}
        <section className="mt-16">
          <h2 className="text-3xl font-heading font-bold mb-10 text-gray-900 text-center">
            Our Journey So Far
          </h2>

          <div className="relative border-l-2 border-yellow-300 ml-4 space-y-12">
            {TIMELINE.map((item, index) => (
              <div key={index} className="relative pl-10">
                <div className="absolute -left-6 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-orange to-accent-yellow flex items-center justify-center shadow-md">
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <p className="text-lg text-gray-800">
            From a simple idea to a growing movement, Zyra proves that learning,
            creativity, and opportunity can begin with belief and the courage
            to take the first step.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/webinars" className="btn-primary inline-block">
            Explore Zyra Sessions
          </Link>
        </div>

        {/* Back */}
        <div className="mt-10">
          <Link
            to="/blog"
            className="text-sm text-gray-500 hover:text-primary-orange"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
