import { Message } from 'discord.js'

export interface Command {
  name: string
  aliases: string[]
  description: string
  usage: string
  cooldown: number
  execute: Execute
}

export type Execute = (message: Message, args: string[]) => any
