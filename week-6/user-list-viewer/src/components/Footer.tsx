const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 py-6 text-center text-sm text-gray-600 border-t">
      <p>&copy; {currentYear} Joseph Ogbole. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://github.com/ONJoseph"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/ONJoseph1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Twitter
        </a>
        <a
          href="https://www.linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
