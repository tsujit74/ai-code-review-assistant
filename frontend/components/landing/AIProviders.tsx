export default function AIProviders() {
  const providers = [
    { name: "OpenAI", icon: "A", color: "text-green-400" },
    { name: "LM Studio", icon: "L", color: "text-purple-400" },
    { name: "OpenRouter", icon: "O", color: "text-orange-400" },
    { name: "Ollama", icon: "Ω", color: "text-blue-400" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Configurable AI Providers
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Support for any OpenAI-compatible API. Configure your preferred provider.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {providers.map((provider, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-850"
          >
            <div className={`w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center ${provider.color} mx-auto mb-4 font-bold text-xl`}>
              {provider.icon}
            </div>
            <h3 className="font-semibold">{provider.name}</h3>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Provider Configuration</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-zinc-400 text-sm mb-2">Base URL</label>
            <input
              type="text"
              placeholder="https://api.openai.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm mb-2">API Key</label>
            <input
              type="password"
              placeholder="sk-..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm mb-2">Model</label>
            <input
              type="text"
              placeholder="gpt-4"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>
      </div>
    </section>
  )
}