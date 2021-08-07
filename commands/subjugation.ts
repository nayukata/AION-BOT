import dayjs from 'dayjs'
import { Message } from 'discord.js'
import { saveRespawnTime } from '../api/monster'
import { rasberg, zaphiel, cheshti, menotios, alukina } from '../data/monsters'
import { getFormattedDate } from '../libs/dayjs'

module.exports = {
  name: 'kill',
  aliases: ['done', 'kl'],
  description:
    'ネームドモンスターの討伐時間を記録します。\n`/[command name] モンスター名` で討伐時間の記録ができます。\nリマインダー機能も備えており、対象のNMが沸き時間に入ったタイミングでチャンネルに通知メッセージを送信します。\n\n対応NM\n・ザフィエル\n・チェシュチ\n・ラスベルグ\n・メノティオス\n・アールキナ',
  execute(message: Message, args: string[]) {
    const monsterName = args[0]

    let resMessage = 'そんなモンスターいないわよ！'
    const createRespawnMessage = (name: string) => {
      message.channel.send(`@here ${name}の沸き時間になったわ`)
    }
    if (['rasberg', 'ラスベルグ'].includes(monsterName)) {
      const id = rasberg.id
      const name = rasberg.name
      const { start, end } = createRespawnDate(20, 28)

      resMessage = respawnManager(id, name, start, end, createRespawnMessage)
    } else if (['zaphiel', 'ザフィエル'].includes(monsterName)) {
      const id = zaphiel.id
      const name = zaphiel.name
      const { start, end } = createRespawnDate(6, 6)

      resMessage = respawnManager(id, name, start, end, createRespawnMessage)
    } else if (['cheshti', 'チェシュチ'].includes(monsterName)) {
      const id = cheshti.id
      const name = cheshti.name
      const { start, end } = createRespawnDate(6, 6)

      resMessage = respawnManager(id, name, start, end, createRespawnMessage)
    } else if (['menotios', 'メノティオス'].includes(monsterName)) {
      const id = menotios.id
      const name = menotios.name
      const { start, end } = createRespawnDate(24, 36)

      resMessage = respawnManager(id, name, start, end, createRespawnMessage)
    } else if (['alukina', 'アールキナ'].includes(monsterName)) {
      const id = alukina.id
      const name = alukina.name
      const { start, end } = createRespawnDate(36, 48)

      resMessage = respawnManager(id, name, start, end, createRespawnMessage)
    }
    return message.channel.send(resMessage)
  },
}
const respawnManager = (
  id: string,
  name: string,
  start: number,
  end: number,
  func: (name: string) => void
) => {
  console.log(func)

  // dbに討伐時間を記録
  saveRespawnTime(id, name, start, end)
  // リマインダーの設定
  // const date = new Date(start * 1000)
  // setRemainder(id, date, () => func(name))

  // メッセージの作成
  const startStr = getFormattedDate(start)
  const endStr = getFormattedDate(end)
  return `次の沸き時間： ${startStr} ~ ${endStr} `
}

const createRespawnDate = (startDiff: number, endDiff: number) => {
  const now = dayjs()
  const start = now.add(startDiff, 'hour').unix()
  const end = now.add(endDiff, 'hour').unix()
  return { start, end }
}
