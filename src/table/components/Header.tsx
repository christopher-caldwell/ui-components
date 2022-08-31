import { Table, flexRender } from '@tanstack/react-table'
import { TableSortLabel, TableHead as MuiTableHead, TableRow, TableCell } from '@mui/material'

export const TableHead = function <TData extends { id: number | string | undefined }>({ table, colors }: Props<TData>) {
  const borderStyle = `1px solid ${colors.border}`
  return (
    <MuiTableHead>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(({ colSpan, id, column, getContext, getSize }) => {
            console.log('getSize', getSize())
            const isSorted = !!column.getIsSorted()
            const isSortedDesc = column.getIsSorted() === 'desc'
            const sortDirection = isSortedDesc ? 'desc' : 'asc'
            return (
              <TableCell
                sx={{ borderRight: borderStyle, backgroundColor: colors.headerBackground, width: getSize() }}
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
    </MuiTableHead>
  )
}

export interface TableColors {
  border?: string
  headerBackground?: string
  headerText?: string
}

interface Props<TData extends { id: number | string | undefined }> {
  table: Table<TData>
  colors: TableColors
}
