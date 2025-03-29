import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  // Initialize darkMode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Toggle dark mode
  const toggle = () => {
    setDarkMode((prev) => !prev);
  };

  // Sync darkMode with DOM class and localStorage
  useEffect(() => {
    const body = document.body;
    
    // ✅ Immediately update DOM class
    if (darkMode) {
      body.classList.add("theme-dark");
      body.classList.remove("theme-light");
    } else {
      body.classList.add("theme-light");
      body.classList.remove("theme-dark");
    }

    console.log("DOM Class:", body.classList.value);
    localStorage.setItem("darkMode", JSON.stringify(darkMode)); // Save to localStorage
    console.log("Dark mode is:", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
