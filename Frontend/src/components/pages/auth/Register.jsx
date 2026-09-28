import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Envelope,
  Phone,
  Lock,
  Eye,
  EyeSlash,
  UserCircle,
  Hospital,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AuthService from "../../../api/AuthService";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "donor",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { confirmPassword, ...registerData } = data;

      const response = await AuthService.register(registerData);

      if (!response.success) {
        toast.error(response.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Register Error:", error);

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

          <div className="mb-7 text-center">
            <h1 className="text-4xl font-bold text-[var(--primary)]">
              Blood Care
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Create your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 ${
                    errors.name
                      ? "border-red-500"
                      : "border-[var(--border)]"
                  }`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email
              </label>

              <div className="relative">
                <Envelope
                  size={20}
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

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone
              </label>

              <div className="relative">
                <Phone
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[var(--border)] bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Role */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Register As
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Donor */}

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    watch("role") === "donor"
                      ? "border-[var(--primary)] bg-red-50"
                      : "border-[var(--border)]"
                  }`}
                >
                  <input
                    type="radio"
                    value="donor"
                    className="accent-red-600"
                    {...register("role", {
                      required: "Please select a role",
                    })}
                  />

                  <UserCircle
                    size={22}
                    weight="regular"
                    className="text-[var(--primary)]"
                  />

                  <span className="text-sm font-semibold">
                    Donor
                  </span>
                </label>

                {/* Hospital */}

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    watch("role") === "hospital"
                      ? "border-[var(--primary)] bg-red-50"
                      : "border-[var(--border)]"
                  }`}
                >
                  <input
                    type="radio"
                    value="hospital"
                    className="accent-red-600"
                    {...register("role", {
                      required: "Please select a role",
                    })}
                  />

                  <Hospital
                    size={22}
                    weight="regular"
                    className="text-[var(--primary)]"
                  />

                  <span className="text-sm font-semibold">
                    Hospital
                  </span>
                </label>

              </div>

              {errors.role && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-12 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 ${
                    errors.password
                      ? "border-red-500"
                      : "border-[var(--border)]"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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

            {/* Confirm Password */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[var(--border)]"
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  })}
                />
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;