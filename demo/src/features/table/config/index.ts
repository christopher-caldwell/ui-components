import { ColumnDef } from '@tanstack/react-table'

import { Person } from '@/data'

type StrictColumnDef<TData> = Omit<ColumnDef<TData>, 'accessorKey'> & { accessorKey: keyof TData }

export const columns: StrictColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName'
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName'
  },
  {
    header: 'Email',
    size: 1000,
    accessorKey: 'email'
  },
  {
    header: 'Occupation',
    // size: 20,
    accessorKey: 'occupation'
  }
]
