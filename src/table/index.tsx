import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  HeaderGroup,
  getPaginationRowModel
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

import { TablePaginationActions } from './Pagination'

export const Table = function <TData>({
  columns,
  items,
  isLoading,
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
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  useEffect(() => {
    if (!rowsPerPageOptions?.[0]) return
    table.setPageSize(typeof rowsPerPageOptions[0] === 'number' ? rowsPerPageOptions[0] : rowsPerPageOptions[0].value)
  }, [rowsPerPageOptions, table])

  const headerGroups = table.getHeaderGroups()
  const LoadingRows = generateLoadingRows<TData>(headerGroups)
  const borderColor = `1px solid ${colors.border}`

  const rows = table.getRowModel().rows
  const Results = rows.length ? (
    rows.map(row => {
      return (
        <TableRow key={row.id} hover sx={{ backgroundColor: ({ palette: { background } }) => background.paper }}>
          {row.getVisibleCells().map(cell => {
            return (
              <TableCell sx={{ borderRight: borderColor }} key={cell.id}>
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
                      sx={{ borderRight: borderColor, backgroundColor: colors.headerBackground }}
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
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page'
          },
          native: true
        }}
        onPageChange={(_, page) => table.setPageIndex(page - 1)}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        ActionsComponent={() => <TablePaginationActions table={table} />}
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
interface Props<TData> {
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
