import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between">
      <h1 className="font-bold text-lg">Joseph's Blog</h1>
      <div className="space-x-4">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/about" className="hover:underline">About</NavLink>
        <NavLink to="/contact" className="hover:underline">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
