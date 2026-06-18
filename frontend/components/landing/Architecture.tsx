export default function Architecture() {
  const components = [
    { name: "Frontend", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18", color: "text-blue-400" },
    { name: "API", icon: "M8 9l3 3-3 3m3 0l3-3-3-3", color: "text-purple-400" },
    { name: "NestJS", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.547l-.238.547a2 2 0 01-1.022.547a2 2 0 01-1.022-.547l-.238-.547a6 6 0 00-3.86-.547l-2.387.477a2 2 0 00-1.022.547", color: "text-red-400" },
    { name: "PostgreSQL", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", color: "text-green-400" },
    { name: "AI Provider", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18", color: "text-orange-400" },
    { name: "Review Engine", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-purple-400" },
    { name: "Results", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "text-green-400" },
  ]

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          System Architecture
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Modern full-stack architecture built for scalability and performance.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        {components.map((component, index) => (
          <div key={index}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-850">
              <div className={`w-10 h-10 ${component.color}`}>
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={component.icon} />
                </svg>
              </div>
              <span className="font-semibold">{component.name}</span>
            </div>
            {index < components.length - 1 && (
              <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}