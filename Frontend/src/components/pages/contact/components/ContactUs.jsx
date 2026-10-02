
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  EnvelopeSimple,
  PhoneCall,
  MapPin,
  ArrowUpRight,
  Heartbeat,
  PaperPlaneTilt,
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  YoutubeLogo,
  Clock,
  CheckCircle,
} from "@phosphor-icons/react";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Frontend validation is ready.
      // Connect your contact API here to save/send the message.
      console.log("Contact form data:", data);

      toast.success("Form validated successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: PhoneCall,
      title: "Call Our Team",
      value: "+91 98765 43210",
      description: "Available for your queries",
      href: "tel:+919876543210",
    },
    {
      icon: EnvelopeSimple,
      title: "Email Support",
      value: "support@bloodcare.com",
      description: "We would love to hear from you",
      href: "mailto:support@bloodcare.com",
    },
    {
      icon: MapPin,
      title: "Our Location",
      value: "Kolkata, West Bengal",
      description: "Serving our community",
      href: "https://maps.google.com/?q=Kolkata,West+Bengal",
    },
  ];

  const socialLinks = [
    { icon: InstagramLogo, label: "Instagram", href: "https://instagram.com/" },
    { icon: FacebookLogo, label: "Facebook", href: "https://facebook.com/" },
    { icon: TwitterLogo, label: "Twitter", href: "https://x.com/" },
    { icon: YoutubeLogo, label: "YouTube", href: "https://youtube.com/" },
  ];

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3.5 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-red-700 focus:bg-white focus:ring-4 focus:ring-red-700/10";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-16 sm:py-20 lg:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-red-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-rose-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-800 shadow-sm">
            <Heartbeat size={17} weight="fill" />
            We're Here For You
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight !text-gray-900 sm:text-5xl">
            Let's Start a <span className="!text-red-800">Conversation</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Have a question about blood donation or Blood Care? Reach out to
            our team. Together, we can make every drop count.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Contact Panel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7f1018] via-[#991b1b] to-[#4c0510] p-7 text-white shadow-xl shadow-red-950/10 sm:p-9 lg:col-span-5 lg:p-10">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/5" />

            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-200">
                Contact Information
              </span>

              <h3 className="mt-4 text-3xl font-bold leading-tight !text-white sm:text-4xl">
                We'd Love to
                <br />
                Hear From You.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-red-100/80">
                Whether you need help, have a suggestion, or want to support
                our mission, we're just a message away.
              </p>

              {/* Contact Cards */}
              <div className="mt-9 space-y-4">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.title === "Our Location" ? "_blank" : undefined}
                      rel={item.title === "Our Location" ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition duration-300 hover:border-white/20 hover:bg-white/[0.12]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-red-800 shadow-sm transition duration-300 group-hover:scale-105">
                        <Icon size={23} weight="duotone" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-red-200">
                          {item.title}
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs text-red-100/65">
                          {item.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-red-200/70 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                      />
                    </a>
                  );
                })}
              </div>

              {/* Availability */}
              <div className="mt-7 flex items-center gap-3 border-t border-white/15 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/15">
                  <Clock size={20} className="text-green-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Here to Help
                  </p>
                  <p className="mt-1 text-xs text-red-100/70">
                    Send us a message anytime
                  </p>
                </div>
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
              </div>

              {/* Social Links */}
              <div className="mt-7">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-red-200">
                  Connect With Us
                </p>

                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        title={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-red-800"
                      >
                        <Icon size={20} weight="bold" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_12px_50px_rgba(15,23,42,0.05)] sm:p-9 lg:col-span-7 lg:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
                  Send a Message
                </span>
                <h3 className="mt-2 text-2xl font-bold !text-gray-900 sm:text-3xl">
                  How Can We Help?
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Fill out the form and share your question with us.
                </p>
              </div>

              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-800 sm:flex">
                <PaperPlaneTilt size={24} weight="duotone" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Name */}
              <div className="mb-5">
                <label htmlFor="contact-name" className={labelClass}>
                  Full Name <span className="text-red-700">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className={`${inputClass} ${errors.name ? "border-red-500 focus:border-red-600" : ""}`}
                  {...register("name", {
                    required: "Please enter your name.",
                    minLength: {
                      value: 2,
                      message: "Name must contain at least 2 characters.",
                    },
                    maxLength: {
                      value: 80,
                      message: "Name cannot exceed 80 characters.",
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email and Phone */}
              <div className="mb-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email Address <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={`${inputClass} ${errors.email ? "border-red-500 focus:border-red-600" : ""}`}
                    {...register("email", {
                      required: "Please enter your email address.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    className={`${inputClass} ${errors.phone ? "border-red-500 focus:border-red-600" : ""}`}
                    {...register("phone", {
                      validate: (value) => {
                        if (!value.trim()) return true;
                        return /^[+]?[\d\s()-]{7,20}$/.test(value.trim()) ||
                          "Please enter a valid phone number.";
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject <span className="text-red-700">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  aria-invalid={Boolean(errors.subject)}
                  className={`${inputClass} ${errors.subject ? "border-red-500 focus:border-red-600" : ""}`}
                  {...register("subject", {
                    required: "Please enter a subject.",
                    minLength: {
                      value: 3,
                      message: "Subject must contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 120,
                      message: "Subject cannot exceed 120 characters.",
                    },
                  })}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="contact-message" className={labelClass}>
                  Message <span className="text-red-700">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  aria-invalid={Boolean(errors.message)}
                  className={`${inputClass} min-h-[140px] resize-y leading-6 ${errors.message ? "border-red-500 focus:border-red-600" : ""}`}
                  {...register("message", {
                    required: "Please enter your message.",
                    minLength: {
                      value: 10,
                      message: "Message must contain at least 10 characters.",
                    },
                    maxLength: {
                      value: 2000,
                      message: "Message cannot exceed 2000 characters.",
                    },
                  })}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#991b1b] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-red-950/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#7f1018] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}

                {isSubmitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <PaperPlaneTilt
                    size={19}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-gray-500">
                <CheckCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-green-600"
                  weight="fill"
                />
                Your information will be used to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;