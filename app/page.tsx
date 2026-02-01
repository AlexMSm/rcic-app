// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 text-6xl">🏃</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Run Club <span className="text-[#00ff87]">Chester</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          Track your progress. Compete with friends. Connect with the community.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <a 
            href="/clubhouse"
            className="px-8 py-4 bg-[#00ff87] text-[#0a0e1a] font-bold rounded-lg hover:bg-[#00d9ff] transition"
          >
            Enter Clubhouse
          </a>
          <a 
            href="#about"
            className="px-8 py-4 border-2 border-[#00ff87] text-[#00ff87] font-bold rounded-lg hover:bg-[#00ff87] hover:text-[#0a0e1a] transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Run Together, <span className="text-[#00ff87]">Grow Together</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature 
              emoji="📊"
              title="Track Progress"
              description="See your weekly and monthly stats, synced automatically from Strava"
            />
            <Feature 
              emoji="🏆"
              title="Compete"
              description="Climb the leaderboards and challenge your clubmates"
            />
            <Feature 
              emoji="🌍"
              title="Explore"
              description="See where everyone's running on our interactive globe"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-[#0a0e1a] rounded-lg">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
