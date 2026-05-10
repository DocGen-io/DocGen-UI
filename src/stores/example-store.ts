import { create } from "zustand";

interface ExampleStore {
  activeExampleJobId: string | null;
  isExamplesOpen: boolean;
  openExampleViewer: (jobId: string) => void;
  closeExampleViewer: () => void;
}

export const useExampleStore = create<ExampleStore>((set) => ({
  activeExampleJobId: null,
  isExamplesOpen: false,
  openExampleViewer: (jobId) => set({ activeExampleJobId: jobId, isExamplesOpen: true }),
  closeExampleViewer: () => set({ activeExampleJobId: null, isExamplesOpen: false }),
}));
