import { TableRow, TableCell, TableRowProps, Box } from '@mui/material'
import { Row, Table, flexRender } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { TableColors } from './Header'

// Consider not using navigate, and allowing a custom route link element to be passed to accommodate Next and whatever else.
// Pass the ID to be routed to
export const Results = function <TData extends { id: number | string | undefined }>({
  table,
  colors,
  goesToPath
}: Props<TData>) {
  const rows = table.getRowModel().rows
  const hasLength = !!rows.length
  const navigate = useNavigate()
  if (!hasLength)
    return (
      <TableRow sx={{ height: 200, backgroundColor: ({ palette: { background } }) => background.paper }}>
        <TableCell colSpan={12}>
          <Box sx={{ textAlign: 'center' }}>No Results</Box>
        </TableCell>
      </TableRow>
    )
  return (
    <>
      {rows.map(row => {
        const idOfRow = row.original.id
        const sharedProps = { colors, row }
        if (goesToPath) {
          if (!idOfRow) throw new Error('Row value must have property `id` if using navigation')
          return (
            <ContentfulTableRow key={row.id} onClick={() => navigate(`${goesToPath}/${idOfRow}`)} {...sharedProps} />
          )
        }
        return <ContentfulTableRow key={row.id} {...sharedProps} />
      })}
    </>
  )
}
interface Props<TData extends { id: number | string | undefined }> {
  table: Table<TData>
  goesToPath?: string
  colors: TableColors
}

interface ContentfulTableRowProps<TData> {
  onClick?: TableRowProps['onClick']
  row: Row<TData>
  colors: TableColors
}
const ContentfulTableRow = function <TData>({ onClick, row, colors }: ContentfulTableRowProps<TData>) {
  const borderStyle = `1px solid ${colors.border}`
  return (
    <TableRow onClick={onClick} hover sx={{ backgroundColor: ({ palette: { background } }) => background.paper }}>
      {row.getVisibleCells().map(cell => {
        return (
          <TableCell sx={{ borderRight: borderStyle }} key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
