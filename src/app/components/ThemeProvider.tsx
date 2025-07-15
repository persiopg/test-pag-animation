"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // O atributo 'data-theme' será adicionado à tag <html>,
  // permitindo que o nosso CSS reaja às mudanças de tema.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}