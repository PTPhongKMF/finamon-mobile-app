import { Text } from 'react-native'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogHeader } from '@components/lib/gluestack-ui/alert-dialog'
import { Heading } from '@components/lib/gluestack-ui/heading'

interface AuthAlertDialogProps {
  isOpen: boolean,
  onClose: () => void,
  errorMessage?: string
}

export function AuthAlertDialog({ isOpen, onClose, errorMessage = "Lỗi không xác định" }: AuthAlertDialogProps) {
  return (
    <AlertDialog isOpen={isOpen} size="lg" useRNModal={true} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="font-bold text-red-600" size="xl">Lỗi</Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-4 mb-2">
          <Text className="text-lg">{errorMessage}</Text>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
} 