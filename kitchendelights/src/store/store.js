import { create } from "zustand";
export const useCount = create((set) => ({
  recipeCountNumber: 0,
  //   countRecipe: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  countRecipe: (count) => set({ recipeCountNumber: count }),
}));

export const useSum = create((set) => ({
  priceSum: 0,
  //   countRecipe: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  sumPrice: (sum) => set({ priceSum: sum }),
}));
