export default function FeaturesGrid() {
  const features = [
    {
      icon: "M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "Authentication",
      description: "Secure JWT-based authentication with role management and protected routes."
    },
    {
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
      title: "Project Management",
      description: "Create and manage multiple projects with organized file structures."
    },
    {
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
      title: "ZIP Code Upload",
      description: "Upload entire projects as ZIP files with automatic extraction and parsing."
    },
    {
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "Code Explorer",
      description: "Browse uploaded files with syntax highlighting and intuitive file tree navigation."
    },
    {
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "AI Review Engine",
      description: "Automated code reviews powered by AI for security, performance, and quality analysis."
    },
    {
      icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
      title: "AI Chat with Code",
      description: "Ask questions about your code and get instant AI-powered explanations and suggestions."
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Powerful Features for Modern Developers
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Everything you need to review, analyze, and improve your code with AI-powered intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-850 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 mb-4 group-hover:text-zinc-100 group-hover:bg-zinc-700 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}