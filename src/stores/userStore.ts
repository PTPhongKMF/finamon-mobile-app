import { UserLocalData } from "@custom.types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type UserState = {
  user: UserLocalData | null;
  isUserLoggedIn: boolean;
  hydrateUser: () => Promise<void>;
  validateUser: () => Promise<boolean>;
  setUser: (user: UserLocalData) => void;
  clearUser: () => Promise<void>;
  setIsUserLoggedIn: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isUserLoggedIn: false,

  hydrateUser: async () => {
    const storedUser = await AsyncStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    set({ user: parsedUser });
  },

  validateUser: async () => {
    const user = get().user;
    if (!user) return false;

    if (Date.now() > user.token.exp) {
      await get().clearUser();
      return false;
    }

    return true;
  },

  setUser: async (user) => {
    set({ user });

    if (user) {
      if (user.token) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        get().clearUser();
      }
    }
  },

  clearUser: async () => {
    set({ user: null });
    await AsyncStorage.removeItem('user');
  },

  setIsUserLoggedIn: (value) => set({ isUserLoggedIn: value })
}))