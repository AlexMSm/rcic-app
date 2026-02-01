// app/clubhouse/page.tsx
export default function Clubhouse() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            The <span className="text-[#00ff87]">Clubhouse</span>
          </h1>
          <p className="text-gray-400 text-lg">Welcome back, runner 👋</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="This Week" value="342 km" change="+12%" />
          <StatCard title="This Month" value="1,247 km" change="+8%" />
          <StatCard title="Active Runners" value="87" change="+3" />
        </div>

        {/* Placeholder for components we'll build */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1f2e] p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Leaderboard</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
          <div className="bg-[#1a1f2e] p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Activity Globe</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="bg-[#1a1f2e] p-6 rounded-lg border border-gray-800">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-[#00ff87] text-sm">↑ {change}</p>
    </div>
  );
}