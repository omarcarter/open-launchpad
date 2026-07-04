import LandingHero from "@/components/landing-hero";

export default function Home() {
  return (
    <div>
      <LandingHero />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { title: "Templates", description: "Start from focused project templates instead of empty folders." },
            { title: "Integrations", description: "Connect services with consistent, reusable settings." },
            { title: "Launch workflow", description: "Create, track, and publish launch-ready builds." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border p-6">
              <div className="font-semibold">{item.title}</div>
              <div className="mt-2 text-sm text-neutral-600">{item.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
