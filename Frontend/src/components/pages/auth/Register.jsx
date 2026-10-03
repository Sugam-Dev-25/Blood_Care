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
  Drop,
  MapPin,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AuthService from "../../../api/AuthService";
import logo from "../../../assets/logo.png";

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
      address: "",
      password: "",
      confirmPassword: "",
      role: "donor",
    },
  });

  const password = watch("password");
  const selectedRole = watch("role");

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-red-50 to-red-100 px-4 py-10">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-red-300/25 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Center Logo */}
        <Link to="/" className="mb-7 flex flex-col items-center justify-center">
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

          <p className="mt-1 text-center text-xs font-medium tracking-[0.16em] text-slate-500">
            BLOOD BANK MANAGEMENT SYSTEM
          </p>
        </Link>

        {/* Registration Card */}
        <div className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-red-950/5 backdrop-blur-sm sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-[var(--primary)]">
              <UserCircle size={23} weight="duotone" />
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Join Blood Care and help make a difference.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={`w-full rounded-lg border bg-red-50/40 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-red-100 ${
                    errors.name
                      ? "border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
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
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Envelope
                  size={19}
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

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  className="w-full rounded-lg border border-slate-200 bg-red-50/40 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-red-100"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  className="w-full rounded-lg border border-slate-200 bg-red-50/40 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-red-100"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters",
                    },
                  })}
                />
              </div>

              {errors.address && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Register As
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Donor */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition duration-200 ${
                    selectedRole === "donor"
                      ? "border-[var(--primary)] bg-red-50 shadow-sm shadow-red-900/5"
                      : "border-slate-200 bg-white hover:border-red-200"
                  }`}
                >
                  <input
                    type="radio"
                    value="donor"
                    className="accent-red-700"
                    {...register("role", {
                      required: "Please select a role",
                    })}
                  />

                  <UserCircle
                    size={22}
                    weight="duotone"
                    className="shrink-0 text-[var(--primary)]"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    Donor
                  </span>
                </label>

                {/* Hospital */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition duration-200 ${
                    selectedRole === "hospital"
                      ? "border-[var(--primary)] bg-red-50 shadow-sm shadow-red-900/5"
                      : "border-slate-200 bg-white hover:border-red-200"
                  }`}
                >
                  <input
                    type="radio"
                    value="hospital"
                    className="accent-red-700"
                    {...register("role", {
                      required: "Please select a role",
                    })}
                  />

                  <Hospital
                    size={22}
                    weight="duotone"
                    className="shrink-0 text-[var(--primary)]"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    Hospital
                  </span>
                </label>
              </div>

              {errors.role && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.role.message}
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className={`w-full rounded-lg border bg-red-50/40 py-3 pl-11 pr-12 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-red-100 ${
                    errors.password
                      ? "border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[var(--primary)]"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className={`w-full rounded-lg border bg-red-50/40 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-red-100 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.confirmPassword.message}
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
                  Creating account...
                </>
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[var(--primary)] transition hover:text-[var(--primary-dark)] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
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

export default Register;
