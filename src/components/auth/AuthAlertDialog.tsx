import { Text } from 'react-native'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogHeader } from '@components/lib/gluestack-ui/alert-dialog'
import { Heading } from '@components/lib/gluestack-ui/heading'
import { useTranslation } from 'react-i18next'

interface AuthAlertDialogProps {
  isOpen: boolean,
  onClose: () => void,
  errorMessage?: string | null
}

export function AuthAlertDialog({ isOpen, onClose, errorMessage }: AuthAlertDialogProps) {
  const { t } = useTranslation("popup")

  return (
    <AlertDialog isOpen={isOpen} size="lg" useRNModal={true} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="font-bold text-red-600" size="xl">{t("alertError")}</Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-4 mb-2">
          <Text className="text-lg">{errorMessage || t("unknownError")}</Text>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
} 