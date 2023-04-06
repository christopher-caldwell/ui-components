import { FC, PropsWithChildren } from 'react'
import { Unstable_Grid2 as Grid, styled, SxProps, Theme, Box, Paper, GridSize } from '@mui/material'

export const Section: FC<Props> = ({ children, boxSx, paperSx, header, headerAction }) => {
  return (
    <Box sx={{ marginBottom: '30px', padding: '0 24px', ...boxSx }}>
      {header ? (
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid xs={12} md={headerAction ? 9 : 12}>
            <Header>{header}</Header>
          </Grid>
          <Grid xs={12} md={3} justifyContent='flex-end' sx={{ display: 'flex' }}>
            {headerAction}
          </Grid>
        </Grid>
      ) : null}
      <PaddedPaper paperSx={paperSx}>{children}</PaddedPaper>
    </Box>
  )
}

export const paddedPaperStyles = { padding: '30px', borderRadius: '12px' }
export const PaddedPaper: FC<Omit<Props, 'header'>> = ({ children, paperSx }) => {
  return <Paper sx={{ ...paddedPaperStyles, ...paperSx }}>{children}</Paper>
}

const Header = styled('h2')`
  margin-bottom: 12px;
`

type Props = PropsWithChildren<{
  boxSx?: SxProps<Theme>
  paperSx?: SxProps<Theme>
  header?: string
  headerAction?: JSX.Element
  headerActionProps?: {
    colSpan: GridSize
  }
}>
