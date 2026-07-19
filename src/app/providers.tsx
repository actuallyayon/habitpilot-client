"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { GoogleOAuthProvider } from '@react-oauth/google';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id";
  
  return (
    <NextThemesProvider {...props}>
      <GoogleOAuthProvider clientId={googleClientId}>
        {children}
      </GoogleOAuthProvider>
    </NextThemesProvider>
  );
}
