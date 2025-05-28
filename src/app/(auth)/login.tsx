import { View, Text } from 'react-native'
import React from 'react'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from '@components/lib/gluestack-ui/gradient'

export default function Login() {
  return (
    <View className="flex-1">
      {/* <LinearGradient colors={['#14532D', '#22C55E', '#BBF7D0']} className="absolute inset-0"/> */}
      <LinearGradient colors={['#1A5237', '#4CAF50', '#8BC34A']} className="absolute inset-0"/>
      {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} className="absolute inset-0"/> */}
        <SafeAreaView className="flex-1 justify-center items-center">

          <View className="flex-[0.2]">
            <Heading size="5xl" className="text-amber-500 font-extrabold">Finamon</Heading>
          </View>

          <View className="flex-1">
            <Heading size="4xl" className="text-neutral-900 font-bold">Đăng Nhập</Heading>
          </View>

        </SafeAreaView>
    </View>
  )
}