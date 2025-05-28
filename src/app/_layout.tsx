import { Slot } from 'expo-router'
import { GluestackUIProvider } from "@/src/components/lib/gluestack-ui/gluestack-ui-provider";
import React from 'react'

import "@/src/index.css"

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Slot />
    </GluestackUIProvider>
  );
}