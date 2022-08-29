import { FC } from 'react'
import { Box } from '@mui/material'
import { Section } from '@caldwell619/ui-components'

import { Header } from '@/components'
import { PersonTable } from '@/features/table'
import { SalesPerformanceGraph } from '@/features/graph'

const App: FC = () => {
  return (
    <>
      <Header />
      <Box sx={{ marginBottom: '55px' }} />
      <Section header='Sales Revenue'>
        <SalesPerformanceGraph />
      </Section>
      <Section header='People' paperSx={{ padding: 0 }}>
        <PersonTable />
      </Section>
    </>
  )
}

export default App
