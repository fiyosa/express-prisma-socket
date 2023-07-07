import newMoment from 'moment'

const locale = 'id'

const isDate = (date: string): string => {
  const newDate = new Date(date)
  if (!(newDate instanceof Date && !isNaN(newDate.getTime()))) return ''

  const padL = (time: number) => `${time}`.padStart(2, `0`)
  const a = [newDate.getUTCFullYear(), padL(newDate.getUTCMonth() + 1), padL(newDate.getUTCDate())].join('-')
  const b = [padL(newDate.getUTCHours()), padL(newDate.getUTCMinutes()), padL(newDate.getUTCSeconds())].join(':')

  return a + ' ' + b
}

export const moment = (inp?: newMoment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean) => {
  return newMoment(inp, format, strict).locale(locale)
}

export const now = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

export const formatDate = (date: string = '', format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const testDate = isDate(date)
  if (testDate === '') return ''

  const newDate = newMoment(testDate, 'YYYY-MM-DD HH:mm:ss').locale(locale).format(format)
  return newDate ?? ''
}

export const relativeDate = (date: string = ''): string => {
  const testDate = isDate(date)
  if (testDate === '') return ''

  newMoment.locale(locale)
  const last = newMoment(testDate).valueOf()
  const current = newMoment().valueOf()
  const result = Math.ceil((current - last) / 1000)

  if (result < 60 * 60) return newMoment(testDate, 'YYYY-MM-DD HH:mm:ss').startOf('minute').fromNow()
  if (result < 60 * 60 * 24) return newMoment(testDate, 'YYYY-MM-DD HH:mm:ss').startOf('hour').fromNow()
  return newMoment(testDate, 'YYYY-MM-DD HH:mm:ss').startOf('day').fromNow()
}
