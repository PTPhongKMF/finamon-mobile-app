import { UserLocalData } from "@/src/@types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface UserState {
  user: UserLocalData | null;
  validateUser: () => Promise<boolean>;
  setUser: (user: UserLocalData) => void;
  clearUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => {
   async function init() {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      set({ user: storedUser ? JSON.parse(storedUser) : null });
    } catch (error) {
      console.warn('Failed to load user:', error);
    }
  }
  init();

  return {
    user: null,

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
  }
})