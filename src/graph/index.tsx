import { useMemo } from 'react'
import { AxisOptions, Chart, UserSerie } from 'react-charts'
import { Grid, styled, useTheme } from '@mui/material'
import AutoSizer from 'react-virtualized-auto-sizer'
import shouldForwardProp from '@emotion/is-prop-valid'

export const Graph = function <TData>({ itemGroups, primaryAxis, secondaryAxes, colors = [] }: Props<TData>) {
  const {
    palette: {
      primary: { main: primary },
      secondary: { main: secondary }
    }
  } = useTheme()
  const data: UserSerie<TData>[] = useMemo(
    () =>
      itemGroups.map(({ label, items }) => ({
        label,
        data: items
      })),
    [itemGroups]
  )
  const doAnyGroupsHaveLength = itemGroups.some(group => group.items.length)
  return (
    <Grid sx={{ marginTop: '1vh' }} item xs={12} container>
      <Grid xs={12} item sx={{ paddingTop: '2vh', height: '40vh', width: '100%' }}>
        {doAnyGroupsHaveLength ? (
          <AutoSizer>
            {({ height, width }) => (
              <ChartContainer height={height} width={width}>
                <Chart
                  options={{
                    data,
                    interactionMode: 'closest',
                    defaultColors: [primary, secondary, ...colors],
                    primaryAxis,
                    secondaryAxes
                  }}
                />
              </ChartContainer>
            )}
          </AutoSizer>
        ) : (
          <div>No data available</div>
        )}
      </Grid>
    </Grid>
  )
}

const ChartContainer = styled('div', { shouldForwardProp })<{ height: number; width: number }>`
  ${({ height, width }) => `
  height: ${height}px;
  width: ${width}px;
  `}
  & .tickLabel {
    fill: ${({ theme: { palette } }) => palette.primary.main} !important;
    font-size: 30px;
  }
  & .tick {
    & line {
      stroke: ${({ theme: { palette } }) => palette.text.primary} !important;
      stroke-width: 0.2px;
    }
  }
`

interface Props<TData> {
  itemGroups: { items: TData[]; label: string }[]
  primaryAxis: AxisOptions<TData>
  secondaryAxes: AxisOptions<TData>[]
  /** Controls the colors of the line graph starting with the 3rd data set. 1st is primary, second is secondary */
  colors?: string[]
}
