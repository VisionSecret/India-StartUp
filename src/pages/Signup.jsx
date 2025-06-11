import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <Breadcrumbs />
        <div className="text-center">
          <img
            alt="BagBasket"
            src="/images/BagBasket-logo.webp"
            className="mx-auto h-16 w-16 rounded-full border-2 border-blue-200 p-1"
          />
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-zinc-600">Join us and start shopping now</p>
        </div>

        <form className="mt-8 space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-800"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="block w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 placeholder-blue-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-800"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="block w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 placeholder-blue-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-800"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="block w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 placeholder-blue-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-zinc-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-zinc-800 underline hover:text-zinc-700"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
