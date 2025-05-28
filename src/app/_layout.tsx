import { Slot } from 'expo-router'
import { GluestackUIProvider } from "@/src/components/lib/gluestack-ui/gluestack-ui-provider";
import React from 'react'

import "@/src/index.css"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}