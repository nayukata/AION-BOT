import dayjs from 'dayjs'

export const getFormattedDate = (time: number) => {
  return dayjs.unix(time).format('MM月DD日 HH時mm分')
}
