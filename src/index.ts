import dayjs from 'dayjs'
import { Client } from 'discord.js'

// eslint-disable-next-line no-undef
const Token = process.env.DISCORD_TOKEN
const client = new Client()

client.on('message', (message) => {
  if (message.author.bot) {
    return
  }
  if (message.content.startsWith('/kill')) {
    const monsterName = message.content.split(' ')[1] as MonsterNames

    let resMessage = ''
    if (monsterName === ('rasberg' || 'ラスベルグ')) {
      const name: MonsterNames = responseNames['rasberg']
      const start = dayjs().format('MM月DD日 HH:mm')
      const end = dayjs().format('MM月DD日 HH:mm')
      resMessage = createRepopMessage(name, start, end)
    }
    message.channel.send(resMessage)
  }
})

type MonsterNames =
  | 'rasberg'
  | 'ラスベルグ'
  | 'zaphiel'
  | 'ザフィエル'
  | 'cheshti'
  | 'チェシチ'
  | 'menotios'
  | 'メノティオス'
  | 'alukina'
  | 'アールキナ'
  | 'roughbrie'
  | 'ラフブリ'

type ResponseNames = {
  [key: string]: MonsterNames
}
const responseNames: ResponseNames = {
  rasberg: 'ラスベルグ',
  zaphiel: 'ザフィエル',
  cheshti: 'チェシチ',
  menotios: 'メノティオス',
  alukina: 'アールキナ',
  roughbrie: 'ラフブリ',
}

const createRepopMessage = (name: MonsterNames, start: string, end: string) => {
  return `${name}は "${start}" ~ "${end}"に沸くようね！`
}

client.login(Token)
