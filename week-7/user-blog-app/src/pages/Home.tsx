import { Link } from "react-router-dom";

const posts = [
  { id: "1", title: "Mastering React Router v6", excerpt: "Learn how to build powerful single-page apps using React Router..." },
  { id: "2", title: "Understanding useEffect", excerpt: "Side effects are essential in React. Dive deep into useEffect hook..." },
  { id: "3", title: "Tailwind CSS for React Devs", excerpt: "Speed up your styling with Tailwind CSS utility classes..." },
];

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Joseph Ogbole's Blog</h1>
      <p className="mb-6">Welcome to my simple blog. Here are some articles:</p>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border border-gray-200 rounded hover:shadow">
            <Link to={`/posts/${post.id}`} className="text-xl text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
