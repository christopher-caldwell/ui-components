import format from 'date-fns/format'

const standardFormatString = 'MM/dd/yy'

export const standardDateFormat = (
  rawDate: string | number | Date,
  customFormatString?: string,
  addTimeOfDay?: boolean
): string => {
  if (!rawDate) return '-'
  let formatString = customFormatString || standardFormatString
  try {
    const dateObj = new Date(rawDate)
    formatString = addTimeOfDay ? `${formatString} - hh:mm aaa` : formatString
    return format(dateObj, formatString)
  } catch (e) {
    return '-'
  }
}
