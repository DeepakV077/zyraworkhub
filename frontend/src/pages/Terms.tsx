export default function Terms() {
  return (
    <div className="bg-white">
      <section className="section-container py-16 space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-orange">Terms of Service</p>
          <h1 className="text-4xl font-bold text-gray-900">Simple terms for using Zyra</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            By using this site and our services, you agree to be respectful, lawful, and honest in every interaction.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Using our site</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Do not misuse the site, disrupt services, or attempt unauthorized access.</li>
              <li>Provide accurate information when you contact us.</li>
              <li>Respect intellectual property and brand assets.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Content</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Content is for informational use; do not republish without permission.</li>
              <li>We may update content and policies without prior notice.</li>
              <li>Links to third parties are not endorsements; use your judgment.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Liability</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Our services are provided as-is without warranties.</li>
              <li>We are not liable for indirect or incidental damages.</li>
              <li>Use the site at your own discretion and risk.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Questions about these terms? Email zyra.teams.in@gmail.com.</li>
              <li>We aim to respond promptly and resolve concerns fairly.</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          By continuing to use Zyra Academy, you agree to these terms.
        </p>
      </section>
    </div>
  );
}
