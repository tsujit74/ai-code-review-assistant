export default function AIReviewSection() {
  const reviews = [
    {
      icon: "M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      color: "red",
      title: "Security Review",
      description: "Identify vulnerabilities, exposed credentials, authentication flaws, OWASP violations, and injection attacks.",
      items: [
        "Exposed credentials & API keys",
        "Authentication vulnerabilities",
        "OWASP top 10 violations",
        "SQL & XSS injection risks"
      ]
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "yellow",
      title: "Performance Review",
      description: "Detect slow operations, rendering issues, inefficient database queries, and code optimizations.",
      items: [
        "Slow operations & blocking code",
        "Rendering bottlenecks",
        "Unoptimized database queries",
        "Memory leaks & inefficiencies"
      ]
    },
    {
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "blue",
      title: "Code Quality Review",
      description: "Evaluate naming conventions, readability, maintainability, and architectural patterns.",
      items: [
        "Naming convention violations",
        "Readability issues",
        "Maintainability concerns",
        "Architecture best practices"
      ]
    },
  ]

  const colorClasses = {
    red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          AI-Powered Review Modes
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Three comprehensive review modes to analyze every aspect of your code.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, index) => {
          const colors = colorClasses[review.color as keyof typeof colorClasses]
          return (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-850"
            >
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={review.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{review.description}</p>
              <div className="space-y-2">
                {review.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2 text-sm text-zinc-500">
                    <svg className={`w-4 h-4 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}