import "@/src/index.css"

import { Slot, Stack, useRouter } from 'expo-router'
import { GluestackUIProvider } from "@/src/components/lib/gluestack-ui/gluestack-ui-provider";
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from '@stores/userStore';
import { useShallow } from "zustand/react/shallow";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  const [hasInit, setHasInit] = useState(false);

  const { user, hydrateUser, validateUser } = useUserStore(useShallow(
    state => ({
      user: state.user,
      hydrateUser: state.hydrateUser,
      validateUser: state.validateUser
    })
  ));

  useEffect(() => {
    async function initApp() {
      await hydrateUser();

      if (await validateUser()) {
        router.push("dashboard");
      } else {
        router.push("login")
      }

      setHasInit(true);
    };

    initApp()
  }, []);

  useEffect(() => {
    async function verifyUser() {
      if (hasInit) {
        if (!await validateUser()) {

        }
      }
    };

    verifyUser();
  }, [hasInit, user])

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ animation: "fade" }} />
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="dashboard/index" options={{ animation: "fade_from_bottom" }} />
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );

}