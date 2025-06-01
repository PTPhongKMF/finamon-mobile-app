import React, { useState, useRef, useEffect } from 'react'
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@components/lib/gluestack-ui/modal'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { Eraser, X } from 'lucide-react-native'
import { Keyboard, Text, StyleSheet, View } from 'react-native'
import { Divider } from '@components/lib/gluestack-ui/divider'
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@components/lib/gluestack-ui/button'
import { LinearGradient } from '@components/lib/gluestack-ui/gradient'
import { OtpInput } from 'react-native-otp-entry';
import { useMutation } from '@tanstack/react-query'
import { kyAspDotnet } from '@services/api/ky'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogHeader } from '@components/lib/gluestack-ui/alert-dialog'
import { ErrorVerifyResponse } from '@custom.types/auth'

interface VerifyAccountModalProps {
  email: string
  isOpen: boolean,
  onClose: () => void,
}

export default function VerifyAccountModal({ email, isOpen, onClose }: VerifyAccountModalProps) {
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState(false);
  const [verifyErr, setVerifyErr] = useState(false);
  const [verifySuc, setVerifySuc] = useState(false);

  const otpRef = useRef<any>(null);

  const verify = useMutation({
    mutationFn: async () => {
      if (otp.trim().length !== 6) throw new Error("Vui lòng nhập đủ mã 6 chữ số")

      return await kyAspDotnet.post("api/auth/verify-email", {
        json: {
          email: email,
          verificationCode: otp
        },
        hooks: {
          beforeError: [
            async error => {
              const errorData = await error.response.json() as ErrorVerifyResponse;
              error.message = errorData.message;

              return error;
            }
          ]
        }
      }).json();
    },
    onSuccess: (data) => {
      setVerifySuc(true);
    },
    onError: (error) => {
      setOtpErr(true)
      setVerifyErr(true)
    }
  })

  function handleClear() {
    otpRef.current?.clear();
    setOtpErr(false);
  }

  function handleSubmit() {
    Keyboard.dismiss();
    verify.mutate();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} useRNModal={true} avoidKeyboard={true}
      size="md">
      <ModalBackdrop onPress={Keyboard.dismiss} />
      <ModalContent className="p-2 rounded-3xl">

        <ModalHeader className="flex justify-center align-middle">
          <Heading size="2xl" className="mt-6">Xác nhận tài khoản</Heading>
          <ModalCloseButton className="absolute top-0 right-0"><X color="#6b7280" /></ModalCloseButton>
        </ModalHeader>

        <ModalBody className="px-6 py-2" contentContainerClassName="flex justify-center items-center gap-4">
          <Text className="text-center">Hãy nhập mã xác nhận đã được gửi tới email của bạn</Text>
          <Divider />
          <OtpInput
            ref={otpRef}
            numberOfDigits={6}
            onTextChange={setOtp}
            focusColor="#F6BE00"
            disabled={verify.isPending}
            onFilled={handleSubmit}
            onFocus={() => setOtpErr(false)}
            theme={otpErr ? {
              pinCodeContainerStyle: otpStyle.errorPinCodeContainerStyle,
              filledPinCodeContainerStyle: otpStyle.errorPinCodeContainerStyle,
            } : undefined}
          />
          <Divider />
        </ModalBody>

        <ModalFooter className="flex-col gap-4 px-6 pb-2">
          <Button className="bg-gray-400 data-[active=true]:bg-black/50 w-full h-8 rounded-3xl"
            onPress={handleClear}
          >
            <ButtonIcon as={Eraser} />
            <ButtonText className="text-xl text-gray-100">Nhập lại</ButtonText>
          </Button>
          <LinearGradient start={[0, 1]} end={[1, 0]} colors={['#1A5237', '#4CAF50', '#8BC34A']}
            className="w-full h-16 rounded-2xl">
            <Button className="bg-transparent data-[active=true]:bg-black/30 w-full h-16"
              onPress={handleSubmit} isDisabled={verify.isPending}
            >
              <ButtonText className="text-xl text-gray-100">Xác Nhận</ButtonText>
              {verify.isPending && <ButtonSpinner className="absolute" color="#FFFFFF" size="large" />}
            </Button>
          </LinearGradient>
        </ModalFooter>

      </ModalContent>

      <AlertDialog isOpen={verifyErr} size="sm" useRNModal={true} onClose={() => setVerifyErr(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader className="flex justify-center items-center">
            <Heading className="font-bold text-red-600" size="xl">Lỗi</Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-4 mb-2">
            <Text className="text-center">{verify.error?.message || "Lỗi không xác định"}</Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog isOpen={verifySuc} size="sm" useRNModal={true} onClose={() => {
        setVerifySuc(false);
        requestAnimationFrame(() => {
          onClose();
        });
      }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader className="flex justify-center items-center">
            <Heading className="font-bold text-green-600" size="xl">Thành Công</Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-4 mb-2">
            <Text className="text-center">Xác nhận thành công, hãy quay về và đăng nhập lại</Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Modal>
  )
}

const otpStyle = StyleSheet.create({
  errorPinCodeContainerStyle: {
    borderWidth: 4,
    borderColor: 'red',
  }
})