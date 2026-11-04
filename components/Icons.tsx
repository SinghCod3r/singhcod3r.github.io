export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function LinuxTuxIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 340" fill="currentColor" className={className}>
      {/* Linux Tux Silhouette */}
      <path d="M170 30c-25 0-45 22-45 50 0 8 2 16 6 23-14 12-23 30-23 50 0 9 2 18 6 26-16 11-26 29-26 50 0 24 14 45 35 55-2 5-3 10-3 16 0 15 14 26 31 26 12 0 22-5 27-13 7 4 15 7 24 7s17-3 24-7c5 8 15 13 27 13 17 0 31-11 31-26 0-6-1-11-3-16 21-10 35-31 35-55 0-21-10-39-26-50 4-8 6-17 6-26 0-20-9-38-23-50 4-7 6-15 6-23 0-28-20-50-45-50z" fill="#ffffff" fillOpacity="0.95" />
      {/* Belly */}
      <path d="M170 130c-30 0-55 28-55 68s25 72 55 72 55-32 55-72-25-68-55-68z" fill="#08090b" fillOpacity="0.85" />
      {/* Eyes */}
      <circle cx="155" cy="72" r="5" fill="#08090b" />
      <circle cx="185" cy="72" r="5" fill="#08090b" />
      {/* Beak */}
      <path d="M160 85h20l-10 12z" fill="#d8ff58" />
    </svg>
  );
}

export function TerminalPromptIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

