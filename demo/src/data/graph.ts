import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import sort from 'array-sort'

import { SalesPerformanceMetric } from './types'

const defaultNumberOfRecords = 10
const leftBoundary = new Date('2020-01-01')
const riightBoundary = new Date()

const generateSalesMetric = (): SalesPerformanceMetric => {
  return {
    id: uuid(),
    revenue: faker.datatype.number({ max: 200_000, min: 140_000 }),
    date: faker.date.between(leftBoundary, riightBoundary)
  }
}

const getRawSalesMetrics = (limit: number = defaultNumberOfRecords) =>
  new Array(limit).fill(null).map(generateSalesMetric)

export const salesMetricsNorthAmerica = sort(getRawSalesMetrics(), 'date')
export const salesMetricsEurope = sort(getRawSalesMetrics(), 'date')
export const salesMetricsAsia = sort(getRawSalesMetrics(), 'date')
