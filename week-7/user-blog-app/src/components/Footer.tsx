const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600 mt-auto">
      <p>&copy; {new Date().getFullYear()} Joseph Ogbole. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://github.com/ONJoseph" className="text-blue-600 hover:underline">GitHub</a>
        <a href="https://twitter.com/ONJoseph1" className="text-blue-600 hover:underline">Twitter</a>
        <a href="https://linkedin.com/in/o-n-joseph-ba8425147" className="text-blue-600 hover:underline">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
