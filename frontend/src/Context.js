import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function Context({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const localTheme =
      localStorage.getItem("localTheme") === "false" ? false : true;
    localTheme ? setDarkTheme(localTheme) : setDarkTheme(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("localTheme", darkTheme);
  }, [darkTheme]);

  function toggleTheme(th) {
    setDarkTheme(th);
  }
  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
