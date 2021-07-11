import Schedule from 'node-schedule'

export const setRemainder = (id: string, date: Date, func: () => void) => {
  Schedule.cancelJob(id)
  const job = Schedule.scheduleJob(id, date, func)
  return job
}
