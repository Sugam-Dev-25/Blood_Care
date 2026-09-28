import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Lock, Envelope } from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AuthService from "../../../api/AuthService";
import useAuth from "../../../hooks/useAuth";

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
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm">

          {/* Header */}

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[var(--primary)]">
              Blood Care
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Email
              </label>

              <div className="relative">
                <Envelope
                  size={20}
                  weight="regular"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 ${
                    errors.email
                      ? "border-red-500"
                      : "border-[var(--border)]"
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
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  weight="regular"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-12 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 ${
                    errors.password
                      ? "border-red-500"
                      : "border-[var(--border)]"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register */}

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;