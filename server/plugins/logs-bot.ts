import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()

  const botLogs = new Telegraf(config.logsBotToken)

  botLogs.telegram.getMe()
  //

  nitroApp.hooks.hook("request", async (event) => {
    event.context.botLogs = botLogs
  })


  console.log('Loading bot logs plugin')
}) 