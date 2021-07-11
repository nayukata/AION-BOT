import { Message } from 'discord.js'
import { getMonsters } from '../api/monster'
import { getFormattedDate } from '../libs/dayjs'
import { Monster } from '../types/Monster'

module.exports = {
  name: 'respawn',
  aliases: ['res', 'repop', 'list', 'ls'],
  description: 'ネームドモンスターの討伐時間を記録します。',
  async execute(message: Message, args: string[]) {
    const monsters = await getMonsters()
    console.log('args', args)
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
  console.log(messages)
  return messages.join('\n')
}
