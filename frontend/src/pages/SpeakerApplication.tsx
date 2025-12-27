import { useState } from "react";
import { Mic } from "lucide-react";

const WHATSAPP_NUMBER = "9176711456";

export default function SpeakerApplication() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
    abstract: "",
    linkedin_url: "",
    website_url: "",
    portfolio_note: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    if (!formData.name.trim()) return "Full Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.bio.trim()) return "Professional bio is required";
    if (!formData.expertise.trim()) return "Areas of expertise is required";
    if (!formData.abstract.trim()) return "Talk abstract is required";
    return null;
  };

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    /* ---------------- AUTO META DATA ---------------- */

    const now = new Date();

    const applicationId = `ZYRA-SPK-${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    const submittedAt = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    /* ---------------- WHATSAPP MESSAGE ---------------- */

    const message = `
*Speaker Application – Zyra Academy*

*Application ID:*
${applicationId}

*Submitted On:*
${submittedAt} IST

----------------------------------

*Name:*
${formData.name}

*Email:*
${formData.email}

*Professional Bio:*
${formData.bio}

*Areas of Expertise:*
${formData.expertise
  .split(",")
  .map((e) => `- ${e.trim()}`)
  .join("\n")}

*Talk Abstract:*
${formData.abstract}

*LinkedIn:*
${formData.linkedin_url || "N/A"}

*Website / Portfolio Link:*
${formData.website_url || "N/A"}

*Portfolio / Work Samples:*
${formData.portfolio_note || "Will share here in WhatsApp if available"}

*Note:*
If you have any portfolio files (PDF / PPT / ZIP),
please attach them directly here in WhatsApp.
`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = whatsappUrl;
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative py-24 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-orange to-accent-yellow shadow-xl mb-6">
            <Mic className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6 text-gray-900">
            Become a{" "}
            <span className="bg-gradient-to-r from-primary-orange to-accent-yellow bg-clip-text text-transparent">
              Speaker
            </span>
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Share your expertise, inspire learners, and grow your personal brand
            with Zyra Academy.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="section-spacing bg-gray-50">
        <div className="section-container max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            <FormCard title="Basic Information">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </FormCard>

            <FormCard title="Professional Profile">
              <Textarea
                label="Professional Bio *"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
              />
              <Input
                label="Areas of Expertise *"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                hint="Comma-separated (e.g. Web Dev, AI, UI/UX)"
              />
            </FormCard>

            <FormCard title="Talk Proposal">
              <Textarea
                label="Talk Abstract *"
                name="abstract"
                rows={6}
                value={formData.abstract}
                onChange={handleChange}
              />
            </FormCard>

            <FormCard title="Online Presence & Portfolio">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="LinkedIn URL"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                />
                <Input
                  label="Website / Portfolio Link"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleChange}
                />
              </div>

              <Textarea
                label="Portfolio Note (optional)"
                name="portfolio_note"
                rows={3}
                value={formData.portfolio_note}
                onChange={handleChange}
                placeholder="Example: I have a PDF portfolio / GitHub repo / Drive link. I will share it in WhatsApp."
              />
            </FormCard>

            {error && <Alert text={error} />}

            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary-orange to-accent-yellow
                         py-4 text-lg font-semibold text-white shadow-xl
                         hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Redirecting to WhatsApp..." : "Submit Application"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 space-y-6">
      <h3 className="text-xl font-heading font-bold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, hint, ...props }: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-3
                   focus:ring-4 focus:ring-yellow-100 focus:border-primary-orange transition"
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none
                   focus:ring-4 focus:ring-yellow-100 focus:border-primary-orange transition"
      />
    </div>
  );
}

function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-xl p-4 border bg-red-50 border-red-200 text-red-700">
      {text}
    </div>
  );
}
