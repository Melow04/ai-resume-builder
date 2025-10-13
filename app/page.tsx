import Link from 'next/link';
import { Sparkles, Lock, FileText, Zap, Download, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full h-full mesh-gradient flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-15 sm:px-3 py-15">
        <div className="max-w-4xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fadeInUp">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm text-gray-300">Powered by AI • 100% Free</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95] tracking-tight">
            <span className="gradient-text block mb-2">Resumint</span>
            <span className="text-white block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">AI Resume Builder</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-12 w-full mx-auto leading-relaxed font-light justify-center items-center flex">
            Create professional resumes with intelligent AI suggestions.<br />
            Your data stays private, stored only on your device.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              href="/builder"
              className="group relative bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 btn-glow"
            >
              <span className="p-5 relative z-10 flex items-center gap-3 justify-center ">
                Start Building Free
                <Sparkles className="w-5 h-5" />
              </span>
            </Link>
            
            <Link
              href="#features"
              className="p-4 glass text-white rounded-xl font-semibold text-lg glass-hover flex"
            > 
              Learn More<Image src="/assets/resumint-mark.svg" alt="Resumint Logo" width={25} height={25} className="w-8 h-8" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-16 sm:gap-24">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">100%</div>
              <div className="text-base text-gray-400">Private</div>
            </div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">AI</div>
              <div className="text-base text-gray-400">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">Free</div>
              <div className="text-base text-gray-400">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 justify-center items-center flex ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white">
            Everything you need
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto font-light justify-center items-center flex">
            Professional resume creation tools with AI assistance, all in one place.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="feature-card glass glass-hover rounded-2xl p-8 card-hover">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Enhancement</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Improve your resume content with Google Gemini AI. Get instant suggestions for summaries, bullet points, and skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card glass glass-hover rounded-2xl p-8 card-hover">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Lock className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">100% Private</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Your data never leaves your device. All resume information is stored locally in your browser for complete privacy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card glass glass-hover rounded-2xl p-8 card-hover">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Download className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">PDF Export</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Download your finished resume as a professional PDF with clean formatting ready to send to employers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card glass glass-hover rounded-2xl p-8 card-hover">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Zap className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Preview</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                See your changes instantly with live preview. What you see is what you get when you export.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card glass glass-hover rounded-2xl p-8 card-hover">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <FileText className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Auto-save</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Never lose your work. Your resume is automatically saved as you type with instant cloud-free backup.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card glass glass-hover rounded-2xl p-8 card-hover">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Globe className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Import/Export</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Export your data as JSON for backup or import existing data to continue editing across devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 justify-center items-center flex ">
        <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12 sm:p-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to build your resume?
          </h2>
          <p className="text-xl text-gray-400 mb-10 font-light max-w-2xl mx-auto">
            Start creating your professional resume in minutes. No sign-up required.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 btn-glow"
          >
            <span className="relative z-10">Get Started Free</span>
            <Sparkles className="w-5 h-5 relative z-10" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5 justify-center items-center flex ">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 Resumint — AI Resume Builder. Built with Next.js & Google Gemini.</p>
          <p className="mt-2">Your data is stored locally and never sent to our servers.</p>
        </div>
      </footer>
    </div>
  );
}