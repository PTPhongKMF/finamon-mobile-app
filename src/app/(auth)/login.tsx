import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from '@components/lib/gluestack-ui/gradient'
import { Button, ButtonText } from '@components/lib/gluestack-ui/button'
import { useMutation } from '@tanstack/react-query'
import { kyAspDotnet } from '@services/api/ky'
import { LoginResponse } from '@custom.types/auth'
import { Input, InputField, InputIcon, InputSlot } from '@components/lib/gluestack-ui/input'
import { Lock, Mail } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { useUserStore } from '@stores/userStore'

export default function Login() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.post("api/auth/login", {
        json: {
          email,
          password
        }
      }).json<LoginResponse>();
    },
    onSuccess: (data) => {
      if (data?.isBanned) throw new Error("Bạn đã bị cấm, liên hệ hỗ trợ nếu bạn nghĩ đây là sai lầm");
      if (!data?.data?.token) throw new Error("Không tìm thấy token")

      if (data.requiresVerification) {
        // navigate("/verify-account", { state: { email: email } });
        return;
      }

      const userRoles = data?.data?.user?.userRoles?.map(role => role.roleName) ?? [];
      setUser({
        name: data?.data?.user?.userName ?? data?.data?.user?.email.split("@")[0],
        token: {
          value: data.data.token,
          exp: new Date()
        },
        roles: userRoles,
        image: data?.data?.user?.image ?? "https://st4.depositphotos.com/11634452/21365/v/450/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg",
      });

      // router.push("/");
    }
  })

  function handleLogin() {
    login.mutate();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <LinearGradient colors={['#1A5237', '#4CAF50', '#8BC34A']} className="absolute inset-0" />
        <SafeAreaView className="flex-1 justify-center items-center">

          <View className="flex-[0.2]">
            <Heading size="5xl" className="text-amber-500 font-extrabold">Finamon</Heading>
          </View>

          <View className="flex-1 w-full items-center py-20">
            <Heading size="4xl" className="text-gray-200 font-bold mt-16">Đăng Nhập</Heading>

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
                <InputField type="password" placeholder="Mật Khẩu" keyboardType="email-address" />
              </Input>
            </View>

            <Button size="lg" className="bg-amber-500 data-[active=true]:bg-yellow-700 h-14 min-w-52 rounded-2xl mt-4">
              <ButtonText className="text-xl text-gray-100">Đăng Nhập</ButtonText>
            </Button>
          </View>

          <View className="flex-[0.2] w-full px-8 justify-end items-center">
            <Button size="lg" className="bg-yellow-500 data-[active=true]:bg-yellow-700 w-full h-16 rounded-2xl"
              onPress={() => router.push("/register")}
            >
              <ButtonText className="text-xl text-gray-100">Chưa có tài khoản? Đăng ký ngay!</ButtonText>
            </Button>
          </View>

        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}