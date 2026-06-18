export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400 text-sm mb-6">
            <span className="w-2 h-2 bg-zinc-100 rounded-full animate-pulse"></span>
            Full Stack Engineering Assessment
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
            AI-Powered Code Intelligence for{' '}
            <span className="text-zinc-400">Modern Developers</span>
          </h1>
          
          <p className="text-zinc-400 text-lg sm:text-xl mb-8 leading-relaxed animate-slide-up">
            Upload your projects and receive structured AI-powered reviews covering 
            security vulnerabilities, performance bottlenecks, and code quality issues. 
            Chat with your code and get instant insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <a href="#start-review" className="btn-primary">
              Start Reviewing
            </a>
            <a href="#architecture" className="btn-secondary">
              View Architecture
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-zinc-800 animate-slide-up">
            <div>
              <div className="text-2xl font-bold text-zinc-100">4+</div>
              <div className="text-zinc-500 text-sm">Review Modes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-100">15+</div>
              <div className="text-zinc-500 text-sm">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-100">AI</div>
              <div className="text-zinc-500 text-sm">Powered</div>
            </div>
          </div>
        </div>

        {/* Right - Mock Dashboard */}
        <div className="animate-slide-in">
          <div className="card bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-zinc-900/50">
            {/* Header */}
            <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
              <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
              <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
              <span className="ml-2 text-zinc-400 text-sm">AI Code Review Assistant</span>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-4 gap-0 h-96">
              {/* Left Sidebar - Project Explorer */}
              <div className="col-span-1 bg-zinc-900 border-r border-zinc-800 p-3">
                <div className="text-zinc-400 text-xs font-semibold mb-3 uppercase">
                  Project Explorer
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>my-project</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm pl-6">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>src</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 text-sm pl-6">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>index.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 text-sm pl-6">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>app.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm pl-6">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>components</span>
                  </div>
                </div>
              </div>
              
              {/* Center - Code Preview */}
              <div className="col-span-2 bg-zinc-950 border-r border-zinc-800 p-4 overflow-auto">
                <div className="text-zinc-400 text-xs mb-3 font-semibold uppercase">
                  index.tsx
                </div>
                <pre className="text-sm font-mono text-zinc-300">
                  <code>
                    <span className="text-zinc-500">import</span>{' '}<span className="text-zinc-400">React</span>{' '}<span className="text-zinc-500">from</span>{' '}<span className="text-zinc-300">'react'</span>
                    <br />
                    <span className="text-zinc-500">export</span>{' '}<span className="text-zinc-500">function</span>{' '}<span className="text-zinc-400">App</span>(){' '}
                    <span className="text-zinc-500">{'{'}</span>
                    <br />
                    {'  '}<span className="text-zinc-500">return</span>
                    <br />
                    {'    '}<span className="text-zinc-400">&lt;div&gt;</span>
                    <br />
                    {'      '}<span className="text-zinc-400">Hello</span>{' '}<span className="text-zinc-400">World</span>
                    <br />
                    {'    '}<span className="text-zinc-400">&lt;/div&gt;</span>
                    <br />
                    <span className="text-zinc-500">{'}'}</span>
                  </code>
                </pre>
              </div>
              
              {/* Right - AI Review Panel */}
              <div className="col-span-1 bg-zinc-900 p-3">
                <div className="text-zinc-400 text-xs font-semibold mb-3 uppercase">
                  AI Review Panel
                </div>
                <div className="space-y-2">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-zinc-300 text-xs">Security: 2 issues</span>
                    </div>
                  </div>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-zinc-300 text-xs">Performance: 1 issue</span>
                    </div>
                  </div>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-zinc-300 text-xs">Quality: 3 issues</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}