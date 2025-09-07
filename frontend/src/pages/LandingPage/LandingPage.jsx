import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";
import { useTheme } from "../../context/ThemeContext";

export default function LandingPage() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen`}
    >
      <Header />
      <Hero />
      <Features />
      <Analytics />
      <Footer />
    </div>
  );
}
