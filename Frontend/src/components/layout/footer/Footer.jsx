import {
  Drop,
  House,
  Info,
  Briefcase,
  Phone,
  MapPin,
  EnvelopeSimple,
  PhoneCall,
  ArrowUpRight,
  Heart,
  Heartbeat,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const Footer = () => {
  const quickLinks = [
    { label: "Home", path: "/", icon: House },
    { label: "About Us", path: "/about", icon: Info },
    { label: "Services", path: "/services", icon: Briefcase },
    { label: "Contact", path: "/contact", icon: Phone },
  ];
  const services = [
    "Blood Donation",
    "Blood Inventory Management",
    "Hospital Blood Requests",
    "Donor Management",
    "Blood Availability Tracking",
  ];
  return (
    <footer className="relative overflow-hidden bg-[#080D19] text-white [&_h2]:!text-white [&_h3]:!text-white">
      {" "}
      {/* Decorative Background */}{" "}
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />{" "}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-red-800/10 blur-3xl" />{" "}
      {/* Top Accent */}{" "}
      <div className="h-1 w-full bg-gradient-to-r from-red-950 via-red-600 to-red-950" />{" "}
      {/* Main Footer */}{" "}
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {" "}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {" "}
          {/* Brand */}{" "}
          <div className="lg:col-span-4">
            {" "}
            <Link to="/" className="inline-flex items-center gap-3">
              {" "}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 shadow-lg shadow-red-950/40">
                {" "}
                <Drop size={27} weight="fill" className="text-white" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h2 className="text-xl font-bold tracking-tight !text-white">
                  {" "}
                  Blood Care{" "}
                </h2>{" "}
                <p className="mt-0.5 text-xs font-medium tracking-wide text-gray-400">
                  {" "}
                  BLOOD BANK MANAGEMENT SYSTEM{" "}
                </p>{" "}
              </div>{" "}
            </Link>{" "}
            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
              {" "}
              A simple and reliable blood bank management system connecting
              donors, hospitals, and administrators to help manage blood
              resources efficiently and support life-saving care.{" "}
            </p>{" "}
            {/* Tagline */}{" "}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-medium text-gray-300">
              {" "}
              <Heartbeat
                size={17}
                className="text-red-400"
                weight="fill"
              />{" "}
              Every drop matters. Every life counts.{" "}
            </div>{" "}
          </div>{" "}
          {/* Quick Links */}{" "}
          <div className="lg:col-span-2">
            {" "}
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] !text-white">
              {" "}
              Quick Links{" "}
            </h3>{" "}
            <div className="mt-5 h-0.5 w-10 rounded-full bg-red-500" />{" "}
            <nav className="mt-5 space-y-4">
              {" "}
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex w-fit items-center gap-2.5 text-sm text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    {" "}
                    <Icon
                      size={18}
                      weight="duotone"
                      className="text-gray-400 transition-colors group-hover:text-red-400"
                    />{" "}
                    <span>{item.label}</span>{" "}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />{" "}
                  </Link>
                );
              })}{" "}
            </nav>{" "}
          </div>{" "}
          {/* Services */}{" "}
          <div className="lg:col-span-3">
            {" "}
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] !text-white">
              {" "}
              Our Services{" "}
            </h3>{" "}
            <div className="mt-5 h-0.5 w-10 rounded-full bg-red-500" />{" "}
            <ul className="mt-5 space-y-4">
              {" "}
              {services.map((service) => (
                <li key={service}>
                  {" "}
                  <Link
                    to="/services"
                    className="group flex items-start gap-2 text-sm leading-6 text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    {" "}
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 transition-transform group-hover:scale-125" />{" "}
                    <span>{service}</span>{" "}
                  </Link>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>{" "}
          {/* Contact */}{" "}
          <div className="lg:col-span-3">
            {" "}
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] !text-white">
              {" "}
              Contact Us{" "}
            </h3>{" "}
            <div className="mt-5 h-0.5 w-10 rounded-full bg-red-500" />{" "}
            <div className="mt-5 space-y-5">
              {" "}
              {/* Location */}{" "}
              <div className="flex items-start gap-3">
                {" "}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  {" "}
                  <MapPin size={19} className="text-red-400" />{" "}
                </div>{" "}
                <p className="pt-2 text-sm leading-6 text-gray-300">
                  {" "}
                  Kolkata, West Bengal, India{" "}
                </p>{" "}
              </div>{" "}
              {/* Email */}{" "}
              <a
                href="mailto:support@bloodcare.com"
                className="group flex items-start gap-3 text-sm text-gray-300 transition-colors hover:text-white"
              >
                {" "}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 transition-colors group-hover:bg-red-600/20">
                  {" "}
                  <EnvelopeSimple size={19} className="text-red-400" />{" "}
                </div>{" "}
                <span className="break-all pt-3">
                  {" "}
                  support@bloodcare.com{" "}
                </span>{" "}
              </a>{" "}
              {/* Phone */}{" "}
              <a
                href="tel:+919876543210"
                className="group flex items-start gap-3 text-sm text-gray-300 transition-colors hover:text-white"
              >
                {" "}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 transition-colors group-hover:bg-red-600/20">
                  {" "}
                  <PhoneCall size={19} className="text-red-400" />{" "}
                </div>{" "}
                <span className="pt-3">+91 98765 43210</span>{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Bottom Bar */}{" "}
      <div className="relative border-t border-white/10">
        {" "}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          {" "}
          <p className="text-sm text-gray-400">
            {" "}
            © {new Date().getFullYear()} Blood Care. All rights reserved.{" "}
          </p>{" "}
          <p className="flex items-center gap-1.5 text-sm text-gray-400">
            {" "}
            Made with <Heart
              size={16}
              weight="fill"
              className="text-red-500"
            />{" "}
            for a healthier community{" "}
          </p>{" "}
          <Link
            to="/"
            className="text-sm font-semibold text-white transition-colors hover:text-red-400"
          >
            {" "}
            Blood Donation Management System{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
};
export default Footer;
