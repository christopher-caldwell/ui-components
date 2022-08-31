import { FC, useState } from 'react'
import { SortingState } from '@tanstack/react-table'
import { Table } from '@caldwell619/ui-components'

import { Person, people } from '@/data'
import { columns } from './config'

export const PersonTable: FC = () => {
  const sortingHandler = useState<SortingState>([])
  return (
    <Table<Person>
      goesToPath='/nowhere'
      items={people}
      total={people.length}
      columns={columns}
      sortingHandler={sortingHandler}
    />
  )
}
