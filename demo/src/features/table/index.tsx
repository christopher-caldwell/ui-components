import { FC, useState } from 'react'
import { SortingState } from '@tanstack/react-table'
import { Table, usePagination } from '@caldwell619/ui-components'

import { Person, people } from '@/data'
import { columns } from './config'

export const PersonTable: FC = () => {
  const sortingHandler = useState<SortingState>([])
  const { page, rowsPerPage, ...restPagination } = usePagination()

  const stats = [...people].splice(page, rowsPerPage)
  return (
    <Table<Person>
      items={stats}
      total={people.length}
      columns={columns}
      sortingHandler={sortingHandler}
      page={page}
      rowsPerPage={rowsPerPage}
      {...restPagination}
    />
  )
}
