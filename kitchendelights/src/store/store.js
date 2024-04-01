import { create } from "zustand";
export const useCount = create((set) => ({
  recipeCountNumber: 0,
  //   countRecipe: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  countRecipe: (count) => set({ recipeCountNumber: count }),
}));

export const useSum = create((set) => ({
  priceSum: 0,
  sumPrice: (sum) => set({ priceSum: sum }),
}));

export const useName = create((set) => ({
  userName: "",
  setuserName: (name) => set({ userName: name }),
}));

export const useCart = create((set) => ({
  dataCart: "",
  setDataCart: (data) => {
    set({ dataCart: data });
  },
}));

export const useVoucher = create((set) => ({
  sumVoucher: 0,
  setSumVoucher: (sum) => set({ sumVoucher: sum }),
}));

export const voucherCode = create((set) => ({
  voucher: "",
  setVoucher: (code) => set({ voucher: code }),
}));
