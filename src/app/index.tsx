import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Heading } from '@components/lib/gluestack-ui/heading'

export default function Index() {

  return (
    <View className="flex-1 justify-center items-center">
      <Heading size="2xl">Finamon has AWAKEN</Heading>

      <View className="flex-row gap-4">
        <Link className="border-black border-[2px] p-4 rounded-lg active:bg-green-600" href="/login" asChild>
          <Pressable><Text>Login</Text></Pressable>
        </Link>
        <Link className="border-black border-[2px] p-4 rounded-lg active:bg-green-600" href="/register" asChild>
          <Pressable><Text>Register</Text></Pressable>
        </Link>
      </View>
    </View>
  )
}