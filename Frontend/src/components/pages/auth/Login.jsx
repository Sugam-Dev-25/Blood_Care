
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeSlash,
  Lock,
  Envelope,
  Drop,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AuthService from "../../../api/AuthService";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await AuthService.login(data);

      if (!response.success) {
        toast.error(response.message || "Login failed");
        return;
      }

      login({
        token: response.token,
        user: response.user,
      });

      toast.success("Login successful");

      const role = response.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "donor") {
        navigate("/donor/dashboard", { replace: true });
      } else if (role === "hospital") {
        navigate("/hospital/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-red-50 to-red-100 px-4 py-10">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-red-300/25 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Center Logo */}
        <Link
          to="/"
          className="mb-8 flex flex-col items-center justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-red-900/10 ring-1 ring-red-100">
            <img
              src={logo}
              alt="Blood Care Logo"
              className="h-full w-full object-contain p-2"
            />
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--primary)]">
            Blood Care
          </h1>

          <p className="mt-1 text-xs font-medium tracking-[0.16em] text-slate-500">
            BLOOD BANK MANAGEMENT SYSTEM
          </p>
        </Link>

        {/* Login Form */}
        <div className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-red-950/5 backdrop-blur-sm sm:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-[var(--primary)]">
              <Lock size={22} weight="duotone" />
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <Envelope
                  size={19}
                  weight="regular"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`w-full rounded-lg border bg-red-50/40 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-red-100 ${
                    errors.email
                      ? "border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  weight="regular"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full rounded-lg border bg-red-50/40 py-3 pl-11 pr-12 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-red-100 ${
                    errors.password
                      ? "border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[var(--primary)]"
                >
                  {showPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-sm text-slate-500">
              New to Blood Care?{" "}
              <Link
                to="/register"
                className="font-bold text-[var(--primary)] transition hover:text-[var(--primary-dark)] hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 text-center">
          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Drop size={15} weight="fill" className="text-[var(--primary)]" />
            Every drop matters. Every life counts.
          </p>

          <Link
            to="/"
            className="mt-3 inline-block text-xs font-medium text-slate-500 transition hover:text-[var(--primary)]"
          >
            © {new Date().getFullYear()} Blood Care. All rights reserved.
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;