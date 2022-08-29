import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import {
  styled,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress
} from '@mui/material'

export const ActionModal: FC<PropsWithChildren<CreateModalProps>> = ({
  title,
  children,
  isOpen,
  setIsOpen,
  onCancel,
  onSubmit,
  actionText = 'Create',
  isLoading,
  isDisabled,
  errorMessage
}) => {
  const closeDialog = () => {
    setIsOpen(false)
  }

  const handleCancel = () => {
    closeDialog()
    onCancel?.()
  }

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <Dialog onClose={closeDialog} open={isOpen} maxWidth='lg'>
      <DialogTitle>{title}</DialogTitle>

      <InputContainer>
        {errorMessage ? (
          <Alert sx={{ marginBottom: ({ spacing }) => spacing(3), whiteSpace: 'pre' }} severity='error'>
            {errorMessage}
          </Alert>
        ) : null}
        {children}
      </InputContainer>
      <DialogActions>
        <Button variant='outlined' onClick={handleCancel}>
          Cancel
        </Button>
        <Button type='submit' variant='contained' onClick={handleSubmit} disabled={isDisabled || isLoading}>
          {isLoading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : actionText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const InputContainer = styled(DialogContent)`
  min-width: 40vw;
  min-height: 20vh;
  padding-top: 10px !important;
`

export interface CreateModalProps {
  title: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isDisabled?: boolean
  /** Will be called ( if provided ) in addition to closing the modal */
  onCancel?: () => void
  onSubmit: () => void | Promise<void>
  isLoading?: boolean
  /** Text shown in the action button
   * @default Create
   */
  actionText?: string
  errorMessage?: string
}
