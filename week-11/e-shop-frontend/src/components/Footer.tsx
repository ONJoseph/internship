export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50 py-8 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-600 dark:text-gray-300">
        <p className="font-medium">© {new Date().getFullYear()} Joseph Ogbole</p>
        <p className="mt-2">
          <a className="underline hover:no-underline" href="https://github.com/ONJoseph" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          •{" "}
          <a className="underline hover:no-underline" href="https://twitter.com/ONJoseph1" target="_blank" rel="noreferrer">
            Twitter
          </a>{" "}
          •{" "}
          <a className="underline hover:no-underline" href="https://www.linkedin.com/in/o-n-joseph-ba8425147/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
