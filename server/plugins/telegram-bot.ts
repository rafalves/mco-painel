import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'


export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()
  const bot = new Telegraf(config.telegramBotToken)

  bot.start((ctx) => ctx.reply('Welcome'))
  bot.help((ctx) => ctx.reply('Send me a sticker'))
  bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
  bot.hears('hi', (ctx) => ctx.reply('Hey there'))


  bot.launch()

  nitroApp.hooks.hook("request", async (event) => {
    event.context.bot = bot
  })

  console.log('Loading bot plugin')
}) 