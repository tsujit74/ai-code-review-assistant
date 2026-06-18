export default function WorkflowTimeline() {
  const steps = [
    { number: "01", title: "Create Project", description: "Set up a new project" },
    { number: "02", title: "Upload ZIP", description: "Upload source code" },
    { number: "03", title: "Explore Files", description: "Browse code structure" },
    { number: "04", title: "Run AI Review", description: "Analyze with AI" },
    { number: "05", title: "View Report", description: "Review findings" },
    { number: "06", title: "Ask AI Questions", description: "Chat with code" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Simple Workflow
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          From upload to insights in six simple steps.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-center gap-4 min-w-[800px]">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-850">
                  <span className="text-zinc-100 font-bold">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-zinc-800 -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border border-zinc-800 border-t-0 border-l-0 rotate-45"></div>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-zinc-500 text-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}