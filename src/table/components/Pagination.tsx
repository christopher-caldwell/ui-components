import { MouseEvent } from 'react'
import { Box, IconButton } from '@mui/material'
import { Table } from '@tanstack/react-table'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

export const TablePaginationActions = function <TData>({ table }: Props<TData>) {
  const handleFirstPageButtonClick = (_: MouseEvent<HTMLButtonElement>) => {
    table.setPageIndex(0)
  }

  const handleBackButtonClick = (_: MouseEvent<HTMLButtonElement>) => {
    table.previousPage()
  }

  const handleNextButtonClick = (_: MouseEvent<HTMLButtonElement>) => {
    table.nextPage()
  }

  const handleLastPageButtonClick = (_: MouseEvent<HTMLButtonElement>) => {
    table.setPageIndex(table.getPageCount() - 1)
    // onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={!table.getCanPreviousPage()} aria-label='first page'>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={!table.getCanPreviousPage()} aria-label='previous page'>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={!table.getCanNextPage()} aria-label='next page'>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={!table.getCanNextPage()} aria-label='last page'>
        <LastPageIcon />
      </IconButton>
    </Box>
  )
}

interface Props<TData> {
  table: Table<TData>
}
