export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="mb-1">
          © {new Date().getFullYear()} <span className="font-semibold">Joseph Ogbole</span>
        </p>
        <p className="space-x-3">
          <a
            href="https://github.com/ONJoseph"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/o-n-joseph/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/ONJoseph1"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            Twitter
          </a>
        </p>
      </div>
    </footer>
  );
}
