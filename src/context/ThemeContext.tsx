import { createContext, ReactNode, useState } from "react";

import '../styles/global.css';

export enum Themes {
  LIGHT = 'light-theme',
  DARK = 'dark-theme'
}

type ThemeContextParams = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export const ThemeContext = createContext<ThemeContextParams>({
  theme: Themes.LIGHT,
  setTheme: function (_theme: string): void {
    throw new Error("Function not implemented.");
  }
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Themes>(Themes.LIGHT);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        { children }
      </div>
    </ThemeContext.Provider>
  )
}