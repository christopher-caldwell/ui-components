import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'

import { Person } from './types'

const numberOfRecords = 100

const generatePerson = (): Person => {
  return {
    id: uuid(),
    age: faker.datatype.number({ max: 80, min: 18 }),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    occupation: faker.name.jobTitle()
  }
}

export const people = new Array(numberOfRecords).fill(null).map(generatePerson)
