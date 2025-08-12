import { div } from "framer-motion/client";

export const Home = () => {
  return (
    <div className="flex items-center justify-center h-[600px] w-[100%] m-auto">
      <div className="flex items-center gap-10 max-w-5xl p-8 w-[80%] justify-between">
        {/* Left Side - Text */}
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            React Query / TanStack Query
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            I built a complete CRUD (Create, Read, Update, Delete) application
            using React Query (TanStack Query). It simplifies server state
            management by handling caching, data synchronization, and background
            updates automatically. With features like query invalidation and
            mutation handling, React Query makes CRUD operations smooth and
            efficient.
          </p>
          <p className="text-gray-600">
            In my project, I used React Query’s hooks to fetch, update, and
            delete posts seamlessly, while keeping the UI reactive and
            responsive.
          </p>
        </div>

        {/* Right Side - Image */}
        <div>
          <img
            src="/images.jpg"
            alt="React Query Project"
            className="w-80 h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
