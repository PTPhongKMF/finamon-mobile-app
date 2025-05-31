import { View } from 'react-native'
import React from 'react'
import { Heading } from '@components/lib/gluestack-ui/heading'

export default function Overview() {
  return (
    <View className="flex-1 justify-center items-center">
      <Heading size="5xl">Success</Heading>
    </View>
  )
}