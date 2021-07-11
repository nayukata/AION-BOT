import { Client, Collection } from 'discord.js'
import fs from 'fs'
import { config } from './config.js'

// eslint-disable-next-line no-undef
const Token = process.env.DISCORD_TOKEN
const client = new Client()
client.commands = new Collection()

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.ts'))

client.on('ready', () => {
  console.info('ready')
})

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return

  commandFiles.forEach((dir) => {
    const jsDir = dir.split('.')[0] + '.js'
    const command = require(`./commands/${jsDir}`)
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module

    client.commands.set(command.name, command)
  })

  const args = message.content.slice(config.prefix.length).trim().split(/ +/)
  if (args.length === 0)
    return message.reply('コマンドだけじゃなくてメッセージも入力してね')
  const commandName = args.shift()?.toLowerCase() || ''

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    )

  if (!command) return message.reply('コマンドが間違ってるみたいよ？')

  try {
    return command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply(
      'ごめんなさい、そのコマンドを実行したらエラーになったわ・・・'
    )
  }
})

client.login(Token)
