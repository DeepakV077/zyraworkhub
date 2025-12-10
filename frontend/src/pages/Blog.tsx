import { Link } from "react-router-dom";
import Testimonials from "../components/home/Testimonials";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover?: string;
};

const posts: Post[] = [
  {
    slug: "success-stories",
    title: "Success Stories",
    excerpt: "Real community stories — students and startups who've grown with Zyra WorkHub.",
    category: "community",
    cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
  },
  {
    slug: "design-case-study",
    title: "Design Case Study: Rebranding a Local Startup",
    excerpt: "How our design studio helped a startup increase conversions by 42%.",
    category: "design",
    cover: "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1200&q=60",
  },
  {
    slug: "product-strategy-101",
    title: "Product Strategy 101",
    excerpt: "Key lessons from our product workshops and what founders should focus on.",
    category: "product",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=60",
  },
];

export default function Blog() {
  return (
    <div className="section-spacing bg-white">
      <div className="section-container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">Blog & Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stories, case studies and tips from the Zyra community. Browse success
            stories, technical write-ups, and our design showcases.
          </p>
        </div>

        {/* Featured posts grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((p) => (
            <article key={p.slug} className="overflow-hidden bg-white border rounded-lg shadow-sm">
              <div className="h-44 bg-gray-100 overflow-hidden">
                {p.cover ? (
                  // simple img tag; Testimonials has its own fallback
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="p-6">
                <div className="text-xs uppercase text-primary-orange font-semibold mb-2">{p.category}</div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} className="text-primary-orange font-medium">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Success Stories section (also available as a post) */}
        <section id="success-stories" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Success Stories</h2>
            <Link to="/blog/success-stories" className="text-sm text-primary-orange">
              View all stories
            </Link>
          </div>

          <Testimonials />
        </section>
      </div>
    </div>
  );
}
