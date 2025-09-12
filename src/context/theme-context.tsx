
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { themes, type Theme, type ThemeColors } from "@/lib/themes";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  mode: string | undefined;
  setMode: (mode: string) => void;
}

const CustomThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = (themeName: string, mode: string | undefined) => {
  const selectedTheme = themes.find((t) => t.name === themeName);
  if (!selectedTheme) return;

  const body = document.body;
  
  // Remove other theme classes
  themes.forEach(t => {
    body.classList.remove(`theme-${t.name}`);
  });
  // Add current theme class
  body.classList.add(`theme-${themeName}`);


  const root = document.documentElement;
  const effectiveMode = mode === "system" 
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" 
    : mode || "light";

  const colors = selectedTheme.colors[effectiveMode as "light" | "dark"];
  
  Object.keys(colors).forEach(key => {
    root.style.setProperty(`--${key}`, colors[key as keyof ThemeColors]);
  });
};

const ThemeController = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState("catppuccin");
  const { theme: mode, setTheme: setMode } = useNextTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme") || "catppuccin";
    setThemeState(storedTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme, mode);
  }, [theme, mode]);
  
  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
        if(mode === 'system') {
            applyTheme(theme, 'system')
        }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mode]);


  const setTheme = useCallback((newTheme: string) => {
    localStorage.setItem("app-theme", newTheme);
    setThemeState(newTheme);
  }, []);

  return (
    <CustomThemeContext.Provider value={{ theme, setTheme, mode, setMode }}>
      {children}
    </CustomThemeContext.Provider>
  );
};


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeController>{children}</ThemeController>
    </NextThemesProvider>
  );
};

export const useTheme = () => {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
