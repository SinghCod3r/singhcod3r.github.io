import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#07080a] text-[#f0f0e9] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#d8ff58] mb-4">
        404 // Page Not Found
      </div>
      <h1 className="text-4xl sm:text-6xl font-display font-bold mb-6">
        Lost in the Terminal.
      </h1>
      <p className="text-[#989c99] max-w-md text-sm mb-8 leading-relaxed">
        The route you requested doesn&apos;t exist. Return to the homepage to explore projects and systems engineering work.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#d8ff58] text-[#07080a] font-mono text-xs uppercase tracking-wider font-bold hover:scale-105 transition-transform"
      >
        &larr; Back to Portfolio
      </Link>
    </div>
  );
}

