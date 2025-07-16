import React from "react";
import { Link } from "react-router";

const ErrorPage = ({ statusCode = 404, message = "Page Not Found" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-9xl font-bold text-red-600">{statusCode}</h1>
      <p className="text-2xl md:text-4xl font-semibold mb-4">{message}</p>
      <p className="mb-8 text-gray-700">
        Sorry, the page you are looking for does not exist or something went wrong.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
