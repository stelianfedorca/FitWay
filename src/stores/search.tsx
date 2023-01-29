import create from 'zustand';

export type SearchState = {
  search: string | undefined;
  setSearch: (search: string | undefined) => void;
};

export const useSearchStore = create<SearchState>((set, get) => ({
  search: undefined,
  setSearch: (search: string | undefined) => set(() => ({ search })),
}));
