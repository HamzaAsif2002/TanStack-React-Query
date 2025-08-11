import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Brand Name */}
        <h1 className="text-xl font-bold">TanStack/React Query</h1>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/usingrq"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            UsingRQ
          </Link>
        </nav>
      </div>
    </header>
  );
};
