import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1e3a5f]">
      {/* Wave patterns - upper: lines */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves-lines" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 Q30 20 60 40 T120 40" fill="none" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.6" />
              <path d="M0 50 Q30 30 60 50 T120 50" fill="none" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.4" />
              <path d="M0 60 Q30 40 60 60 T120 60" fill="none" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="60%" fill="url(#waves-lines)" />
        </svg>
      </div>
      {/* Wave patterns - lower: dots */}
      <div className="absolute inset-0 opacity-40">
        <svg className="absolute bottom-0 left-0 right-0 h-1/2 w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves-dots" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#93c5fd" />
              <circle cx="10" cy="6" r="0.8" fill="#93c5fd" />
              <circle cx="18" cy="4" r="0.8" fill="#93c5fd" />
              <circle cx="6" cy="10" r="0.8" fill="#93c5fd" />
              <circle cx="14" cy="8" r="0.8" fill="#93c5fd" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves-dots)" />
        </svg>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          Welcome
        </h1>
        <p className="mt-3 text-xl font-bold text-white sm:text-2xl md:text-3xl">
          To Our Company
        </p>
        <div className="mt-10">
          <Link
            href="/dashboards"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-[#1e3a5f] shadow-lg transition-opacity hover:opacity-95"
          >
            API Keys Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
