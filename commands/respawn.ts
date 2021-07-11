import { Message } from 'discord.js'
import { getMonsters } from '../api/monster.js'
import { getFormattedDate } from '../libs/dayjs'
import { Monster } from '../types/Monster.js'

module.exports = {
  name: 'respawn',
  aliases: ['res', 'repop', 'list', 'ls'],
  description: 'ネームドモンスターのリスポーン時間を取得します。',
  async execute(message: Message) {
    const monsters = await getMonsters()
    const list = createMonstersList(monsters)
    return message.channel.send(list)
  },
}

const createMonstersList = (monsters: Monster[]) => {
  const monstersAsc = monsters.sort((a, b) => a.start - b.start)
  const messages = monstersAsc.map((monster) => {
    const start = getFormattedDate(monster.start)
    const end = getFormattedDate(monster.end)
    return `${monster.name}: ${start} ~ ${end}`
  })
  return messages.join('\n')
}
