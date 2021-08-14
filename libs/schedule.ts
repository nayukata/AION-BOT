import Schedule from 'node-schedule'

export const setRemainder = (id: string, date: Date, func: () => void) => {
  date.setMinutes(date.getMinutes() - 15)
  Schedule.cancelJob(id)
  const job = Schedule.scheduleJob(id, date, func)
  console.log('job', job)

  return job
}
