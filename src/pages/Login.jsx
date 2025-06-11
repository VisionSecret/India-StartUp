import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Login() {
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
            Welcome Back
          </h2>
          <p className="mt-2 text-zinc-600">
            Sign in to access your account
          </p>
        </div>

        <form className="mt-8 space-y-6">
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
                className="block w-full rounded-lg outline-none border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-800"
              >
                Password
              </label>
              <Link
                to="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-lg outline-none border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-zinc-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-zinc-800 underline hover:text-zinc-700"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}