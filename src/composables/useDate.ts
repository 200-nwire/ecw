import heLocale from 'date-fns/locale/he'
import { addDays, format as dateFnsFormat, getTime, parse, startOfToday, endOfWeek, startOfWeek, startOfMonth, endOfMonth, addMonths, startOfYear, endOfYear, addYears } from 'date-fns';
import { useI18n } from 'vue-i18n'


export const DATE_FORMAT = 'dd/MM/yyyy';

export function getFormattedDate(timestamp: string | number, showTime = false) {
  const date = new Date(timestamp)
  const formattedDate = dateFnsFormat(date, DATE_FORMAT, { locale: heLocale as any })
  
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

export const format = date => dateFnsFormat(date, DATE_FORMAT);
export const convertToTimestamp = date => getTime(date);
export const parseString = dateStr => parse(dateStr, DATE_FORMAT, new Date())

export const getRangeDatesString = (range) => range?.length ? range?.map(d => d && format(d)).join(' - ') : '';

export function useDate() {
  const { t } = useI18n()
  
  const dateOptions = [{
    option: 'today',
    label: t('filters.dates.date-option-today'),
    getDates: () => [convertToTimestamp(startOfToday()), convertToTimestamp(addDays(startOfToday(), 1))]
  }, {
    option: 'yesterday',
    label: t('filters.dates.date-option-yesterday'),
    getDates: () => [convertToTimestamp(addDays(startOfToday(), -1)), convertToTimestamp(startOfToday())]
  }, {
    option: 'this-week',
    label: t('filters.dates.date-option-this-week'),
    getDates: () => [convertToTimestamp(startOfWeek(startOfToday())), convertToTimestamp(endOfWeek(startOfToday()))]
  }, {
    option: 'last-week',
    label: t('filters.dates.date-option-last-week'),
    getDates: () => [convertToTimestamp(addDays(startOfWeek(startOfToday()), -7)), convertToTimestamp(addDays(endOfWeek(startOfToday()), -7))]
  }, {
    option: 'this-month',
    label: t('filters.dates.date-option-this-month'),
    getDates: () => [convertToTimestamp(startOfMonth(startOfToday())), convertToTimestamp(endOfMonth(startOfToday()))]
  }, {
    option: 'last-month',
    label: t('filters.dates.date-option-last-month'),
    getDates: () => [convertToTimestamp(addMonths(startOfMonth(startOfToday()), -1)), convertToTimestamp(addDays(startOfMonth(startOfToday()), -1))]
  }, {
    option: 'this-year',
    label: t('filters.dates.date-option-this-year'),
    getDates: () => [convertToTimestamp(startOfYear(startOfToday())), convertToTimestamp(endOfYear(startOfToday()))]
  }, {
    option: 'last-year',
    label: t('filters.dates.date-option-last-year'),
    getDates: () => [convertToTimestamp(addYears(startOfYear(startOfToday()), -1)), convertToTimestamp(addDays(startOfYear(startOfToday()), -1))]
  }]

  return {
    dateOptions,
  }
}
