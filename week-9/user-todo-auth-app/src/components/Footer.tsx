export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white/70 py-6 text-center text-sm dark:bg-gray-900/70">
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} <strong>Joseph Ogbole</strong>
      </p>
      <p className="space-x-4">
        <a
          href="https://github.com/ONJoseph"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/o-n-joseph/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/ONJoseph1"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline"
        >
          Twitter
        </a>
      </p>
    </footer>
  );
}
