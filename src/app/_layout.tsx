import "../index.css"
import "@i18n/i18n"

import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from '@stores/userStore';
import I18nProvider from "@components/i18n/I18nProvider";
import { GluestackUIProvider } from "@components/lib/gluestack-ui/gluestack-ui-provider";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  const validateUser = useUserStore(state => state.validateUser)

  useEffect(() => {
    async function initApp() {
      if (await validateUser()) {
        router.push("dashboard");
      } else {
        router.push("login")
      }
    };

    initApp()
  }, []);

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ animation: "fade" }} />
            <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
            <Stack.Screen name="dashboard/index" options={{ animation: "fade_from_bottom" }} />
          </Stack>
        </I18nProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );

}