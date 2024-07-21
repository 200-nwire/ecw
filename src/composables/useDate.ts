import { format } from 'date-fns'
import heLocale from 'date-fns/locale/he'

export function getFormattedDate(timestamp: string | number, showTime = false) {
  const date = new Date(timestamp)
  const formattedDate = format(date, 'dd.MM.yyyy', { locale: heLocale })

  if (!showTime) return formattedDate

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formatMinutes = minutes < 10 ? '0' + minutes : minutes
  return `${hours}:${formatMinutes} ${formattedDate}`
}

export function getFormattedTime(timestamp: string | number) {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formatMinutes = minutes < 10 ? '0' + minutes : minutes
  return `${hours}:${formatMinutes}`
}
