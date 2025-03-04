"use client";
import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import ClientThemeProvider from "./client-theme-wrapper";

const BaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ClientThemeProvider>{children}</ClientThemeProvider>
    </AuthProvider>
  );
};

export default BaseProvider;
