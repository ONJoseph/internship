export default function Footer() {
  return (
    <footer className="mt-10 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Joseph Ogbole</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://github.com/ONJoseph" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/onjoseph" target="_blank">LinkedIn</a>
      </div>
    </footer>
  );
}
