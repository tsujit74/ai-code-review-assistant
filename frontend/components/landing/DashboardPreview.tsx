export default function DashboardPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Real-Time Dashboard
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          A modern interface inspired by Cursor, GitHub, and Vercel.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-zinc-900/50">
        {/* Header */}
        <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
          <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
          <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
          <span className="ml-2 text-zinc-400 text-sm">AI Code Review Assistant</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-0 h-[600px]">
          {/* Left Sidebar - Projects */}
          <div className="col-span-2 bg-zinc-900 border-r border-zinc-800 p-4">
            <div className="text-zinc-400 text-xs font-semibold mb-4 uppercase">Projects</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-300 text-sm bg-zinc-800 rounded-lg px-3 py-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>my-web-app</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-sm px-3 py-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>api-service</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-sm px-3 py-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>database-schema</span>
              </div>
            </div>
          </div>

          {/* Center - Code Preview */}
          <div className="col-span-7 bg-zinc-950 border-r border-zinc-800 p-6 overflow-auto">
            <div className="text-zinc-400 text-xs mb-4 font-semibold uppercase">src/app.tsx</div>
            <pre className="text-sm font-mono text-zinc-300">
              <code>
                <span className="text-zinc-500">import</span>{' '}<span className="text-zinc-400">React</span>{' '}<span className="text-zinc-500">from</span>{' '}<span className="text-zinc-300">'react'</span>
                <br />
                <span className="text-zinc-500">import</span>{' '}<span className="text-zinc-400">{'{ runApp }'}</span>{' '}<span className="text-zinc-500">from</span>{' '}<span className="text-zinc-300">'./main'</span>
                <br />
                <br />
                <span className="text-zinc-500">export</span>{' '}<span className="text-zinc-500">function</span>{' '}<span className="text-zinc-400">App</span>(){' '}<span className="text-zinc-500">{'{'}</span>
                <br />
                {'  '}<span className="text-zinc-500">return</span>
                <br />
                {'    '}<span className="text-zinc-400">&lt;div</span>{' '}<span className="text-zinc-300">className</span>=<span className="text-zinc-300">"app"</span><span className="text-zinc-400">&gt;</span>
                <br />
                {'      '}<span className="text-zinc-400">&lt;h1&gt;</span>Hello World<span className="text-zinc-400">&lt;/h1&gt;</span>
                <br />
                {'    '}<span className="text-zinc-400">&lt;/div&gt;</span>
                <br />
                <span className="text-zinc-500">{'}'}</span>
              </code>
            </pre>
          </div>

          {/* Right Sidebar - AI Review */}
          <div className="col-span-3 bg-zinc-900 p-4">
            <div className="text-zinc-400 text-xs font-semibold mb-4 uppercase">AI Review Engine</div>
            <div className="space-y-3">
              <div className="bg-zinc-800 border border-red-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-zinc-300 text-sm font-semibold">Security</span>
                </div>
                <span className="text-red-400 text-sm">2 issues found</span>
              </div>
              <div className="bg-zinc-800 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-zinc-300 text-sm font-semibold">Performance</span>
                </div>
                <span className="text-yellow-400 text-sm">1 issue found</span>
              </div>
              <div className="bg-zinc-800 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-zinc-300 text-sm font-semibold">Quality</span>
                </div>
                <span className="text-blue-400 text-sm">3 issues found</span>
              </div>
            </div>

            {/* Review History */}
            <div className="mt-6">
              <div className="text-zinc-400 text-xs font-semibold mb-3 uppercase">Review History</div>
              <div className="space-y-2">
                <div className="bg-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-500">
                  Jun 18, 3:45 PM
                </div>
                <div className="bg-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-500">
                  Jun 17, 10:20 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}