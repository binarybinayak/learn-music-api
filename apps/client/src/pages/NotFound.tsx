import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto max-w-md">
        <h1 className="text-5xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page not found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
