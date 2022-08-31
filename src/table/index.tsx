import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  ColumnDef,
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
  TableRow,
  TablePagination,
  Skeleton,
  TablePaginationProps,
  SxProps
} from '@mui/material'

import { TableColors, TableHead, TablePaginationActions, Results } from './components'

export const Table = function <TData extends { id: number | string | undefined }>({
  columns,
  items,
  isLoading,
  total,
  sortingHandler,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  colors = defaultColors,
  tableContainerSx = defaultTableContainerSx,
  goesToPath
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

  return (
    <>
      <TableContainer sx={tableContainerSx}>
        <MuiTable stickyHeader>
          <TableHead table={table} colors={colors} />
          <TableBody>
            {isLoading ? LoadingRows : <Results table={table} colors={colors} goesToPath={goesToPath} />}
          </TableBody>
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

interface Props<TData> {
  items: TData[]
  columns: ColumnDef<TData>[]
  sortingHandler: [SortingState, Dispatch<SetStateAction<SortingState>>]
  isLoading?: boolean
  total: number
  colors?: TableColors
  rowsPerPageOptions?: TablePaginationProps['rowsPerPageOptions']
  tableContainerSx?: SxProps
  /** If present, rows will be rendered as Links, and will navigate to `/${goesToPath}/${row.id}` */
  goesToPath?: string
}

const defaultTableContainerSx: SxProps = { maxHeight: '70vh', borderRadius: '12px' }
const defaultRowsPerPageOptions: TablePaginationProps['rowsPerPageOptions'] = [15, 30, 50, { label: 'All', value: -1 }]

const defaultColors: TableColors = {
  border: 'rgb(235, 235, 235)',
  headerBackground: 'rgb(246,247,248)',
  headerText: '#888888'
}
