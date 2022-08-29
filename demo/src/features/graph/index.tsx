import { FC } from 'react'
import { AxisOptions } from 'react-charts'
import { Graph } from '@caldwell619/ui-components'
import numeral from 'numeral'

import { salesMetricsAsia, salesMetricsEurope, salesMetricsNorthAmerica, SalesPerformanceMetric } from '@/data'
import { standardDateFormat } from '@/utils'

const primaryAxis: AxisOptions<SalesPerformanceMetric> = {
  scaleType: 'time',
  getValue: datum => new Date(datum.date),
  formatters: {
    scale: date => standardDateFormat(date, 'MM/yy'),
    tooltip: date => standardDateFormat(date, 'MM/dd/yy')
  }
}
const secondaryAxes: AxisOptions<SalesPerformanceMetric>[] = [
  {
    elementType: 'line',
    formatters: {
      scale: (value: number) => numeral(value).format('($ 0 a)'),
      tooltip: (value: number) => numeral(value).format('$0,0[.]00')
    },
    getValue: datum => datum.revenue
  }
]

export const SalesPerformanceGraph: FC = () => {
  return (
    <Graph<SalesPerformanceMetric>
      itemGroups={[
        { label: 'North America', items: salesMetricsNorthAmerica },
        { label: 'Asia', items: salesMetricsAsia },
        { label: 'Europe', items: salesMetricsEurope }
      ]}
      primaryAxis={primaryAxis}
      secondaryAxes={secondaryAxes}
      colors={['red', 'green']}
    />
  )
}
