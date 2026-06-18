export default function WhyThisProject() {
  const skills = [
    "Modern Full Stack Architecture",
    "Authentication & Security",
    "AI Integration & Prompt Engineering",
    "Database Design & Optimization",
    "File Processing & ZIP Handling",
    "Production-Level Thinking",
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why This Project
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            This assessment demonstrates comprehensive full-stack engineering skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-zinc-300">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}