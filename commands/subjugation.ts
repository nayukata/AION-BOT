import dayjs from 'dayjs'
import { Message } from 'discord.js'
import { saveRespawnTime } from '../api/monster'
import { rasberg, zaphiel, cheshti, menotios, alukina } from '../data/monsters'
import { getFormattedDate } from '../libs/dayjs'

module.exports = {
  name: 'subjugation',
  aliases: ['kill', 'done'],
  description: 'ネームドモンスターの討伐時間を記録します。',
  execute(message: Message, args: string[]) {
    const monsterName = args[0]
    console.log('args', args)

    let resMessage = 'そんなモンスターいないわよ！'

    if (['rasberg', 'ラスベルグ'].includes(monsterName)) {
      const id = rasberg.id
      const name = rasberg.name
      const { start, end } = createRespawnDate(20, 26)

      resMessage = createRepopMessage(id, name, start, end)
    } else if (['zaphiel', 'ザフィエル'].includes(monsterName)) {
      const id = zaphiel.id
      const name = zaphiel.name
      const { start, end } = createRespawnDate(36, 48)

      resMessage = createRepopMessage(id, name, start, end)
    } else if (['cheshti', 'チェシュチ'].includes(monsterName)) {
      const id = cheshti.id
      const name = cheshti.name
      const { start, end } = createRespawnDate(24, 32)

      resMessage = createRepopMessage(id, name, start, end)
    } else if (['menotios', 'メノティオス'].includes(monsterName)) {
      const id = menotios.id
      const name = menotios.name
      const { start, end } = createRespawnDate(24, 36)

      resMessage = createRepopMessage(id, name, start, end)
    } else if (['alukina', 'アールキナ'].includes(monsterName)) {
      const id = alukina.id
      const name = alukina.name
      const { start, end } = createRespawnDate(36, 48)

      resMessage = createRepopMessage(id, name, start, end)
    }
    return message.channel.send(resMessage)
  },
}
const createRepopMessage = (
  id: string,
  name: string,
  start: number,
  end: number
) => {
  saveRespawnTime(id, name, start, end)

  const startStr = getFormattedDate(start)
  const endStr = getFormattedDate(end)
  return `次は ${startStr} ~ ${endStr} に沸くわよ！`
}

const createRespawnDate = (startDiff: number, endDiff: number) => {
  const now = dayjs()
  const start = now.add(startDiff, 'hour').unix()
  const end = now.add(endDiff, 'hour').unix()
  return { start, end }
}
