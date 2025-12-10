import { useParams, Link } from "react-router-dom";

type PostContent = {
  slug: string;
  title: string;
  body: string;
};

const POSTS: PostContent[] = [
  {
    slug: "success-stories",
    title: "Success Stories",
    body: `Here are some of our community success stories. We showcase students, founders and teams who built real products and landed opportunities after attending Zyra programs.`,
  },
  {
    slug: "design-case-study",
    title: "Design Case Study: Rebranding a Local Startup",
    body: `A deep-dive into a recent rebrand where our design team improved user trust and conversion by focusing on messaging and UI polish.`,
  },
  {
    slug: "product-strategy-101",
    title: "Product Strategy 101",
    body: `Highlights and templates from our product workshops: positioning, metrics, and decision frameworks.`,
  },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="section-container section-spacing">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <p className="text-gray-600 mb-6">We couldn&apos;t find the article you&apos;re looking for.</p>
          <Link to="/blog" className="text-primary-orange">Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container section-spacing max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4">{post.title}</h1>
      <div className="prose max-w-none text-gray-800">
        <p>{post.body}</p>
      </div>
      {post.slug === 'success-stories' && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Featured success stories</h3>
          <p className="text-gray-600">Check the community testimonials and featured alumni.</p>
          <Link to="/blog#success-stories" className="text-primary-orange mt-3 inline-block">View stories on Blog</Link>
        </div>
      )}
    </div>
  );
}
