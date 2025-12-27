export default function Privacy() {
  return (
    <div className="bg-white">
      <section className="section-container py-16 space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-orange">Privacy Policy</p>
          <h1 className="text-4xl font-bold text-gray-900">Your data, handled with care</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We collect only what we need to deliver our services, keep it secure, and never sell it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What we collect</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Contact details you share with us (like name and email).</li>
              <li>Messages you send through our forms so we can reply.</li>
              <li>Basic analytics to improve the site experience.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How we use it</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To respond to your inquiries and requests.</li>
              <li>To share updates you opt into (you can opt out anytime).</li>
              <li>To keep the website reliable and secure.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Your choices</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Ask us to delete your data at any time.</li>
              <li>Opt out of non-essential emails with one click.</li>
              <li>Reach out with questions at zyra.teams.in@gmail.com.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Security</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We restrict access to only those who need it.</li>
              <li>We use reputable providers for hosting and delivery.</li>
              <li>We review our practices to keep your data protected.</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          If you have any privacy concerns, email us at zyra.teams.in@gmail.com.
        </p>
      </section>
    </div>
  );
}
