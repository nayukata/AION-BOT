import dayjs from 'dayjs'
import { Message } from 'discord.js'
import { saveRespawnTime } from '../api/monster.js'
import {
  rasberg,
  zaphiel,
  cheshti,
  menotios,
  alukina,
} from '../data/monsters.js'
import { getFormattedDate } from '../libs/dayjs'
import { setRemainder } from '../libs/schedule.js'

module.exports = {
  name: 'subjugation',
  aliases: ['kill', 'done'],
  description:
    'ネームドモンスターの討伐時間を記録します。\n`/[command name] モンスター名` で討伐時間の記録ができます。',
  execute(message: Message, args: string[]) {
    const monsterName = args[0]

    let resMessage = 'そんなモンスターいないわよ！'
    const func = () => {
      message.channel.send('時間です')
    }
    if (['rasberg', 'ラスベルグ'].includes(monsterName)) {
      const id = rasberg.id
      const name = rasberg.name
      const { start, end } = createRespawnDate(20, 26)

      resMessage = respawnManager(id, name, start, end, func)
    } else if (['zaphiel', 'ザフィエル'].includes(monsterName)) {
      const id = zaphiel.id
      const name = zaphiel.name
      const { start, end } = createRespawnDate(36, 48)

      resMessage = respawnManager(id, name, start, end, func)
    } else if (['cheshti', 'チェシュチ'].includes(monsterName)) {
      const id = cheshti.id
      const name = cheshti.name
      const { start, end } = createRespawnDate(24, 32)

      resMessage = respawnManager(id, name, start, end, func)
    } else if (['menotios', 'メノティオス'].includes(monsterName)) {
      const id = menotios.id
      const name = menotios.name
      const { start, end } = createRespawnDate(24, 36)

      resMessage = respawnManager(id, name, start, end, func)
    } else if (['alukina', 'アールキナ'].includes(monsterName)) {
      const id = alukina.id
      const name = alukina.name
      const { start, end } = createRespawnDate(36, 48)

      resMessage = respawnManager(id, name, start, end, func)
    }
    return message.channel.send(resMessage)
  },
}
const respawnManager = (
  id: string,
  name: string,
  start: number,
  end: number,
  func: () => void
) => {
  // dbに討伐時間を記録
  saveRespawnTime(id, name, start, end)
  // リマインダーの設定
  const date = new Date(start * 1000)
  setRemainder(id, date, func)

  // メッセージの作成
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
