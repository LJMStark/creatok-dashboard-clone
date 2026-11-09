"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  type AppLocale,
  type SubmitTaskInput,
  type WorkspaceMember,
  type WorkspaceSettings,
  type WorkspaceState,
  createApiKeyImmutable,
  createInitialWorkspaceState,
  inviteMemberImmutable,
  revokeApiKeyImmutable,
  submitTaskImmutable,
  switchLocaleImmutable,
  toggleFavoriteImmutable,
  updateSettingsImmutable,
} from "@/store/workspace-reducer";

interface WorkspaceContextValue {
  readonly state: WorkspaceState;
  readonly submitTask: (input: SubmitTaskInput) => void;
  readonly toggleFavorite: (itemId: string) => void;
  readonly createApiKey: (name: string) => void;
  readonly revokeApiKey: (id: string) => void;
  readonly updateSettings: (patch: Partial<WorkspaceSettings>) => void;
  readonly inviteMember: (email: string, role: WorkspaceMember["role"]) => void;
  readonly switchLocale: (locale: AppLocale) => void;
  readonly openSupportModal: boolean;
  readonly setOpenSupportModal: (open: boolean) => void;
  readonly openFeedbackModal: boolean;
  readonly setOpenFeedbackModal: (open: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { readonly children: React.ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(() => createInitialWorkspaceState());
  const [openSupportModal, setOpenSupportModal] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const submitTask = useCallback((input: SubmitTaskInput) => {
    setState((prev) => submitTaskImmutable(prev, input));
  }, []);

  const toggleFavorite = useCallback((itemId: string) => {
    setState((prev) => toggleFavoriteImmutable(prev, itemId));
  }, []);

  const createApiKey = useCallback((name: string) => {
    setState((prev) => createApiKeyImmutable(prev, name));
  }, []);

  const revokeApiKey = useCallback((id: string) => {
    setState((prev) => revokeApiKeyImmutable(prev, id));
  }, []);

  const updateSettings = useCallback((patch: Partial<WorkspaceSettings>) => {
    setState((prev) => updateSettingsImmutable(prev, patch));
  }, []);

  const inviteMember = useCallback((email: string, role: WorkspaceMember["role"]) => {
    setState((prev) => inviteMemberImmutable(prev, email, role));
  }, []);

  const switchLocale = useCallback((locale: AppLocale) => {
    setState((prev) => switchLocaleImmutable(prev, locale));
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      state,
      submitTask,
      toggleFavorite,
      createApiKey,
      revokeApiKey,
      updateSettings,
      inviteMember,
      switchLocale,
      openSupportModal,
      setOpenSupportModal,
      openFeedbackModal,
      setOpenFeedbackModal,
    }),
    [
      state,
      submitTask,
      toggleFavorite,
      createApiKey,
      revokeApiKey,
      updateSettings,
      inviteMember,
      switchLocale,
      openSupportModal,
      openFeedbackModal,
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return ctx;
}
