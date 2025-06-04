import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LanguageState {
  lang: string,
  setLang: (lang: string) => Promise<void>
}

export const useLanguageStore = create<LanguageState>((set) => {
  async function init() {
    try {
      const storedLang = await AsyncStorage.getItem("lang");
      set({ lang: storedLang ? storedLang : "en" });
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
  }
  init();

  return {
    lang: "en",
    setLang: async (lang) => {
      set({ lang });
      await AsyncStorage.setItem("lang", lang);
    }
  };
});