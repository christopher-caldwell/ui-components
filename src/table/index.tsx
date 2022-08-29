import { Dispatch, SetStateAction } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  HeaderGroup
} from '@tanstack/react-table'
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Skeleton,
  TableSortLabel,
  TablePaginationProps,
  SxProps
} from '@mui/material'

import { UsePaginationResult, TablePaginationActions } from './Pagination'

export const Table = function <TData>({
  columns,
  items,
  isLoading,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  total,
  sortingHandler,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  colors = defaultColors,
  tableContainerSx = defaultTableContainerSx
}: Props<TData>) {
  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting: sortingHandler[0]
    },
    onSortingChange: sortingHandler[1],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const headerGroups = table.getHeaderGroups()
  const LoadingRows = generateLoadingRows<TData>(headerGroups)

  const rows = table.getRowModel().rows
  const Results = rows.length ? (
    rows.map(row => {
      return (
        <TableRow key={row.id} hover sx={{ backgroundColor: ({ palette: { background } }) => background.paper }}>
          {row.getVisibleCells().map(cell => {
            return (
              <TableCell sx={{ borderRight: colors.border }} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  ) : (
    <TableRow sx={{ height: 200 }}>
      <TableCell colSpan={10000}>
        <Box sx={{ textAlign: 'center' }}>No Results</Box>
      </TableCell>
    </TableRow>
  )

  return (
    <>
      <TableContainer sx={tableContainerSx}>
        <MuiTable stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(({ colSpan, id, column, getContext }) => {
                  const isSorted = !!column.getIsSorted()
                  const isSortedDesc = column.getIsSorted() === 'desc'
                  const sortDirection = isSortedDesc ? 'desc' : 'asc'
                  return (
                    <TableCell
                      sx={{ borderRight: `1px solid ${colors.border}`, backgroundColor: colors.headerBackground }}
                      key={id}
                      colSpan={colSpan}
                      sortDirection={sortDirection}
                      onClick={column.getToggleSortingHandler()}
                    >
                      {/* TODO: check if can be sorted: column.getCanSort() */}
                      <TableSortLabel sx={{ color: colors.headerText }} active={isSorted} direction={sortDirection}>
                        {flexRender(column.columnDef.header, getContext())}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>{isLoading ? LoadingRows : Results}</TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPageOptions={rowsPerPageOptions}
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page'
          },
          native: true
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  )
}

const generateLoadingRows = function <TData>(headers: HeaderGroup<TData>[]) {
  return [1, 2, 3].map(num => (
    <TableRow key={num}>
      {headers.map(column => (
        <TableCell key={column.id} colSpan={10000}>
          <Skeleton variant='rectangular' />
        </TableCell>
      ))}
    </TableRow>
  ))
}

interface TableColors {
  border?: string
  headerBackground?: string
  headerText?: string
}
interface Props<TData> extends UsePaginationResult {
  items: TData[]
  columns: ColumnDef<TData>[]
  sortingHandler: [SortingState, Dispatch<SetStateAction<SortingState>>]
  isLoading?: boolean
  total: number
  colors?: TableColors
  rowsPerPageOptions?: TablePaginationProps['rowsPerPageOptions']
  tableContainerSx?: SxProps
}

const defaultTableContainerSx: SxProps = { maxHeight: '70vh', borderRadius: '12px' }
const defaultRowsPerPageOptions: TablePaginationProps['rowsPerPageOptions'] = [15, 30, 50, { label: 'All', value: -1 }]

const defaultColors: TableColors = {
  border: 'rgb(235, 235, 235)',
  headerBackground: 'rgb(246,247,248)',
  headerText: '#888888'
}

export * from './Pagination'
