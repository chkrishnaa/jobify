import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const getInitial = () => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("theme");

    // If user has set a preference → use that
    if (stored === "dark") return true;
    if (stored === "light") return false;

    // Otherwise → use system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitial);

  useEffect(() => {
    const cls = document.documentElement.classList;

    if (darkMode) {
      cls.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      cls.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // OPTIONAL: auto-update when OS switches theme
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e) => {
      const stored = localStorage.getItem("theme");

      // Only auto-update if user has NOT manually set theme
      if (!stored) setDarkMode(e.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
