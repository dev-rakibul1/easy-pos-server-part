export const FormatDate = (isoDate: string): string => {
  const date = new Date(isoDate)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  return date.toLocaleString('en-US', options).replace(',', ' -')
}
