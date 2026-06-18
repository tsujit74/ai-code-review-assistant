export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Project */}
          <div>
            <h3 className="font-semibold mb-4">AI Code Review Assistant</h3>
            <p className="text-zinc-400 text-sm">
              AI-powered code intelligence for modern developers.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold mb-4">Tech Stack</h3>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>Next.js 14</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>NestJS</li>
              <li>PostgreSQL</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#docs" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Assessment */}
          <div>
            <h3 className="font-semibold mb-4">Assessment</h3>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>Full Stack Engineering</li>
              <li>Internship Assessment</li>
              <li>2026</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex items-center justify-between">
          <p className="text-zinc-500 text-sm">
            © 2026 AI Code Review Assistant. Full Stack Engineering Internship Assessment.
          </p>
          <p className="text-zinc-500 text-sm">
            Built with ❤️ by Sujit Thakur
          </p>
        </div>
      </div>
    </footer>
  )
}