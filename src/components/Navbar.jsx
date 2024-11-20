import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-blue-600 w-full mb-10">
      <div className="flex justify-end items-center px-4">
        <div className="flex justify-between items-end">
          {/* Navigation Links */}
          <div className="flex space-x-4 py-4">
            <Link
              to=""
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
            >
              Accueil
            </Link>
            <Link
              to="shopping-list"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
            >
              Liste de courses
            </Link>
            <Link
              to="Planning"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
            >
              Planning
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
