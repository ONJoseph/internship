import { useParams, Link } from "react-router-dom";

const posts = [
  {
    id: "1",
    title: "Mastering React Router v6",
    content:
      "React Router v6 makes routing simple and powerful. It uses nested routes, outlet components, and hooks like useParams, useNavigate for advanced scenarios.",
  },
  {
    id: "2",
    title: "Understanding useEffect",
    content:
      "The useEffect hook lets you perform side effects in function components. It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.",
  },
  {
    id: "3",
    title: "Tailwind CSS for React Devs",
    content:
      "Tailwind CSS is a utility-first framework. It helps you rapidly build modern user interfaces directly in your markup using utility classes.",
  },
];

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div>
        <h2 className="text-xl font-bold text-red-600">Post Not Found</h2>
        <Link to="/" className="text-blue-600 underline">Go back Home</Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <Link to="/" className="text-blue-600 underline">← Back to Home</Link>
    </article>
  );
};

export default PostDetail;
