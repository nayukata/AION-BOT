import { Message } from 'discord.js'
import { config } from '../config'

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(message: Message, args: string[]) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      data.push('コマンドリスト')
      commands.map((command) => data.push(`・${command.name}`))
      data.push(
        `\n\`${config.prefix}help [command name]\` でコマンドの詳細情報を確認できるわよ！`
      )
      data.join('\n')

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('DMにコマンドリストを送ったわ！')
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          )
          message.reply('DM送れないんだけど、DM拒否してない？')
        })
    }

    const name = args[0].toLowerCase()
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name))

    if (!command) {
      return message.reply("that's not a valid command!")
    }

    data.push(`**Name:** ${command.name}`)

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description)
      data.push(`**Description:** ${command.description}`)
    if (command.usage)
      data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    return message.channel.send(data, { split: true })
  },
}
