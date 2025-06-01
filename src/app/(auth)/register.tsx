import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from '@components/lib/gluestack-ui/gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { Input, InputField, InputIcon, InputSlot } from '@components/lib/gluestack-ui/input'
import { Lock, LockKeyhole, Mail } from 'lucide-react-native'
import { Button, ButtonSpinner, ButtonText } from '@components/lib/gluestack-ui/button'
import { useRouter } from 'expo-router'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { AuthAlertDialog } from '@components/auth/AuthAlertDialog'
import { kyAspDotnet } from '@services/api/ky'

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [password2, setPassword2] = useState("");
  const [password2Err, setPassword2Err] = useState(false);
  const [registerErr, setRegisterErr] = useState(false);

  const register = useMutation({
    mutationFn: async () => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailErr(true);
        throw new Error("Email không hợp lệ")
      };
      if (password.length < 6) {
        setPasswordErr(true)
        setPassword2Err(true)
        throw new Error("Mật khẩu phải có ít nhất 6 chữ số")
      };
      if (password !== password2) {
        setPasswordErr(true)
        setPassword2Err(true)
        throw new Error("Mật khẩu không trùng khớp")
      };

      return await kyAspDotnet.post("api/auth/register", {
        json: {
          email,
          password
        }
      }).json();
    },
    onSuccess: () => {
      // router.push("/dashboard");
    },
    onError: (error) => {
      console.log('Error:', error);
      setRegisterErr(true);
    }
  })

  function handleRegister() {
    if (!email || !password || !password2) {
      if (!email) setEmailErr(true);
      if (!password) setPasswordErr(true);
      if (!password2) setPassword2Err(true);
      return;
    }

    register.mutate();
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
            <Heading size="4xl" className="text-gray-200 font-bold mt-16">Đăng Ký</Heading>

            <View className="justify-center w-full gap-8 px-10 my-16">
              <Input className={clsx(
                "bg-gray-200 px-2",
                emailErr && "border-4"
              )}
                isInvalid={emailErr} variant="rounded" size="xl">
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
              <Input className={clsx(
                "bg-gray-200 px-2",
                password2Err && "border-4"
              )}
                isInvalid={password2Err} variant="rounded" size="xl">
                <InputSlot>
                  <InputIcon as={LockKeyhole} className="text-black" />
                </InputSlot>
                <InputField onPress={() => setPassword2Err(false)}
                  value={password2} onChangeText={setPassword2} type="password" placeholder="Nhập lại Mật Khẩu" />
              </Input>
            </View>

            <Button className="bg-amber-500 data-[active=true]:bg-yellow-700 h-14 min-w-52 rounded-2xl mt-4"
              onPress={() => { Keyboard.dismiss(); handleRegister() }} size="lg" isDisabled={register.isPending}>
              <ButtonText className="text-xl text-gray-100">Đăng Ký</ButtonText>
              {register.isPending && <ButtonSpinner className="absolute" color="#FFFFFF" size="large" />}
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

        <AuthAlertDialog
          isOpen={registerErr}
          onClose={() => setRegisterErr(false)}
          errorMessage={register.error?.message}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}