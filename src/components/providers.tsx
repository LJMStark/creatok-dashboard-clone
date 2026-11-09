"use client";

import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WorkspaceProvider } from "@/store/workspace-context";

export function Providers({ children }: { readonly children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <WorkspaceProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </WorkspaceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
