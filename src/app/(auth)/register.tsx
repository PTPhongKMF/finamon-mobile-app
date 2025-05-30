import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { LinearGradient } from '@components/lib/gluestack-ui/gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { Input, InputField, InputIcon, InputSlot } from '@components/lib/gluestack-ui/input'
import { Lock, LockKeyhole, Mail } from 'lucide-react-native'
import { Button, ButtonText } from '@components/lib/gluestack-ui/button'
import { useRouter } from 'expo-router'

export default function Register() {
const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <LinearGradient colors={['#1A5237', '#4CAF50', '#8BC34A']} className="absolute inset-0" />
        <SafeAreaView className="flex-1 justify-center items-center">

          <View className="flex-[0.2]">
            <Heading size="5xl" className="text-amber-500 font-extrabold">Finamon</Heading>
          </View>

          <View className="flex-1 w-full items-center py-20">
            <Heading size="4xl" className="text-gray-200 font-bold mt-16">Đăng Ký</Heading>

            <View className="justify-center w-full gap-8 px-10 my-16">
              <Input variant="rounded" size="xl" className="bg-gray-200 px-2">
                <InputSlot>
                  <InputIcon as={Mail} className="text-black" />
                </InputSlot>
                <InputField placeholder="Email" keyboardType="email-address" />
              </Input>
              <Input variant="rounded" size="xl" className="bg-gray-200 px-2">
                <InputSlot>
                  <InputIcon as={Lock} className="text-black" />
                </InputSlot>
                <InputField type="password" placeholder="Mật Khẩu" />
              </Input>
              <Input variant="rounded" size="xl" className="bg-gray-200 px-2">
                <InputSlot>
                  <InputIcon as={LockKeyhole} className="text-black" />
                </InputSlot>
                <InputField type="password" placeholder="Nhập lại Mật Khẩu" />
              </Input>
            </View>

            <Button size="lg" className="bg-amber-500 data-[active=true]:bg-yellow-700 h-14 min-w-52 rounded-2xl mt-4">
              <ButtonText className="text-xl text-gray-100">Đăng Ký</ButtonText>
            </Button>
          </View>

          <View className="flex-[0.2] w-full px-8 justify-end items-center">
            <Button size="lg" className="bg-yellow-500 data-[active=true]:bg-yellow-700 w-full h-16 rounded-2xl"
              onPress={() => router.push("/login")}
            >
              <ButtonText className="text-xl text-gray-100">Quay về Đăng Nhập</ButtonText>
            </Button>
          </View>

        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}