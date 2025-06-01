import { View } from 'react-native'
import React from 'react'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { useUserStore } from '@stores/userStore';
import { Button, ButtonText } from '@components/lib/gluestack-ui/button';
import { useShallow } from 'zustand/react/shallow';

export default function Overview() {
  const { user, clearUser } = useUserStore(useShallow(
      state => ({
        user: state.user,
        clearUser: state.clearUser
      })
    ));

  return (
    <View className="flex-1 justify-center items-center">
      <Heading size="5xl">Success</Heading>

      <Button size="lg" className="bg-yellow-500 data-[active=true]:bg-yellow-700 h-16 rounded-2xl"
        onPress={clearUser}>
        <ButtonText className="text-xl text-gray-100">logout</ButtonText>
      </Button>
    </View>
  )
}