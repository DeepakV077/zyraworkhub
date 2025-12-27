import { Star } from "lucide-react";
import SEO from "../components/SEO";

/* ---------------- TYPES ---------------- */

type Testimonial = {
  name: string;
  session: string;
  rating: number;
  highlight: string;
};

/* ---------------- UNIQUE REAL FEEDBACK ---------------- */

const testimonials: Testimonial[] = [
  {
    name: "Santhith P",
    session: "UI/UX Hands-on Workshop",
    rating: 5,
    highlight:
      "Clear explanations with a strong focus on quality UI and user experience thinking.",
  },
  {
    name: "Logapriya D",
    session: "UI/UX Hands-on Workshop",
    rating: 4,
    highlight:
      "Very practical session — learning by doing made the concepts easy to grasp.",
  },
  {
    name: "Punithaa Bhagyalakshmi G",
    session: "UI/UX Hands-on Workshop",
    rating: 5,
    highlight:
      "Designing interfaces live in Figma boosted my confidence instantly.",
  },
  {
    name: "Sulaka B",
    session: "HTML Bootcamp",
    rating: 5,
    highlight:
      "I didn’t know even basic HTML earlier — now I’m motivated to learn CSS and JavaScript.",
  },
  {
    name: "Anikasri B",
    session: "HTML Bootcamp",
    rating: 4,
    highlight:
      "Step-by-step teaching with hands-on practice made everything clear.",
  },
  {
    name: "Sundareshwaran D",
    session: "AI Unleashed",
    rating: 5,
    highlight:
      "The future of AI was explained clearly with real-world relevance.",
  },
  {
    name: "Abishek E",
    session: "DNA Revolution",
    rating: 5,
    highlight:
      "Real-life examples made complex biology topics exciting for engineers.",
  },
];

/* ---------------- CALCULATIONS ---------------- */

const averageRating =
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

/* ---------------- UI COMPONENTS ---------------- */

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="min-w-[320px] max-w-[320px] rounded-2xl bg-white border border-yellow-100 p-6 shadow-sm hover:shadow-xl transition-all">
      <div className="flex gap-1 mb-3">
        {[...Array(t.rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />
        ))}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">
        “{t.highlight}”
      </p>

      <div className="pt-3 border-t text-sm">
        <p className="font-semibold text-gray-900">{t.name}</p>
        <p className="text-primary-orange">{t.session}</p>
      </div>
    </div>
  );
}

function MovingRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-6 w-max ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function FeedbackPage() {
  return (
    <>
      <SEO
        title="Blog - Success Stories & Insights"
        description="Read success stories, webinar feedback, and insights from Zyra Academy students. Learn from their experiences and growth journeys."
        keywords="blog, success stories, student feedback, webinar reviews, learning journey, tech education blog, student testimonials"
        url="https://zyraacademy.com/blog"
      />
      <div className="bg-white">
      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-24 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-primary-orange">
            Real Student Feedback
          </span>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold mb-6 text-gray-900">
            Trusted by Learners Across{" "}
            <span className="gradient-text">Zyra Academy</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Affordable ₹9 workshops. Real learning. Honest feedback from students
            who experienced Zyra sessions firsthand.
          </p>

          {/* ⭐ AVERAGE RATING BLOCK */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-yellow-200 px-6 py-3 rounded-full shadow-sm">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.round(averageRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="font-semibold text-gray-900">
                {averageRating.toFixed(1)} / 5
              </span>

              <span className="text-gray-500 text-sm">
                ({testimonials.length}+ verified reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEEDBACK MARQUEE ---------- */}
      <section className="section-spacing bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <MovingRow items={testimonials.slice(0, 3)} direction="left" />
          <MovingRow items={testimonials.slice(2, 5)} direction="right" />
          <MovingRow items={testimonials.slice(4, 7)} direction="left" />
        </div>
      </section>
    </div>
    </>
  );
}
