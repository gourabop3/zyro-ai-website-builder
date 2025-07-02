import { create } from "zustand";

interface SandboxState {
  action: any;
  setAction: (action: any) => void;
}

export const useStore = create<SandboxState>((set) => ({
  action: null,
  setAction: (action) => set({ action }),
}));

interface WorkspaceState {
  workspace: null | any;
  setWorkspace: (workspace: any) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspace: null,
  setWorkspace: (workspace: any) => set({ workspace }),
}));
