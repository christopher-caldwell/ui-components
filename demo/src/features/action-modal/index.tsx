import { FC, useState } from 'react'
import { ActionModal } from '@caldwell619/ui-components'
import { Typography, Button, Box } from '@mui/material'

export const ActionModalDisplay: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <Box sx={{ height: '100px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={() => setIsOpen(true)}>Open</Button>
      </Box>
      <ActionModal
        // isLoading={isLoading}
        // errorMessage={error ? 'Something went wrong' : undefined}
        title='Create'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={() => {}}
      >
        <Typography>Here is some inner content</Typography>
      </ActionModal>
    </>
  )
}
