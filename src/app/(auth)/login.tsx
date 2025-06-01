import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from '@components/lib/gluestack-ui/gradient'
import { Button, ButtonSpinner, ButtonText } from '@components/lib/gluestack-ui/button'
import { useMutation } from '@tanstack/react-query'
import { kyAspDotnet } from '@services/api/ky'
import { ErrorLoginResponse, SuccessLoginResponse, UserLocalData } from '@custom.types/auth'
import { Input, InputField, InputIcon, InputSlot } from '@components/lib/gluestack-ui/input'
import { Lock, Mail } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { useUserStore } from '@stores/userStore'
import clsx from 'clsx'
import { AuthAlertDialog } from '@components/auth/AuthAlertDialog'
import VerifyAccountModal from '@components/auth/VerifyAccountModal'

export default function Login() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [loginErr, setLoginErr] = useState(false);

  const [needVerify, setNeedVerify] = useState(false);

  const login = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.post("api/auth/login", {
        json: {
          email,
          password,
          mobile: true
        },
        hooks: {
          beforeError: [
            async error => {
              const errorData = await error.response.json() as ErrorLoginResponse;
              error.message = errorData.message;

              return error;
            }
          ]
        }
      }).json<SuccessLoginResponse>();
    },
    onSuccess: (data) => {
      if (data?.isBanned) throw new Error("Bạn đã bị cấm, liên hệ hỗ trợ nếu bạn nghĩ đây là sai lầm");

      if (data.requiresVerification) {
        setNeedVerify(true);
        return;
      }

      if (!data?.data?.token) throw new Error("Không tìm thấy token")

      const userRoles = data?.data?.user?.userRoles?.map(role => role.roleName) ?? [];
        setUser({
          name: data?.data?.user?.userName ?? data?.data?.user?.email.split("@")[0],
          token: {
            value: data.data.token,
            exp: Date.now() + 30 * 24 * 60 * 60 * 1000 // exp in 1 month
          },
          roles: userRoles,
          image: data?.data?.user?.image ?? "https://st4.depositphotos.com/11634452/21365/v/450/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg",
        });

      router.push("/dashboard");
    },
    onError: (error) => {
      console.log('Error:', error);
      setLoginErr(true);
    }
  })

  function handleLogin() {
    if (!email || !password) {
      if (!email) setEmailErr(true);
      if (!password) setPasswordErr(true);
      return;
    }

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
              <Input className={clsx(
                "bg-gray-200 px-2",
                emailErr && "border-4"
              )}
                isInvalid={emailErr} variant="rounded" size="xl" >
                <InputSlot>
                  <InputIcon as={Mail} className="text-black" />
                </InputSlot>
                <InputField onPress={() => setEmailErr(false)}
                  value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
              </Input>
              <Input className={clsx(
                "bg-gray-200 px-2",
                passwordErr && "border-4"
              )}
                isInvalid={passwordErr} variant="rounded" size="xl">
                <InputSlot>
                  <InputIcon as={Lock} className="text-black" />
                </InputSlot>
                <InputField onPress={() => setPasswordErr(false)}
                  value={password} onChangeText={setPassword} type="password" placeholder="Mật Khẩu" />
              </Input>
            </View>

            <Button className="bg-amber-500 data-[active=true]:bg-yellow-700 h-14 min-w-52 rounded-2xl mt-4"
              onPress={() => { Keyboard.dismiss(); handleLogin() }} size="lg" isDisabled={login.isPending}>
              <ButtonText className="text-xl text-gray-100">Đăng Nhập</ButtonText>
              {login.isPending && <ButtonSpinner className="absolute" color="#FFFFFF" size="large" />}
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

        <VerifyAccountModal
          email={email}
          isOpen={needVerify}
          onClose={() => setNeedVerify(false)}
        />

        <AuthAlertDialog
          isOpen={loginErr}
          onClose={() => setLoginErr(false)}
          errorMessage={login.error?.message}
        />
      </View>

    </TouchableWithoutFeedback>
  )
}