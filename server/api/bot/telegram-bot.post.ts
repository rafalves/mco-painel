import { fmt, bold, italic, mention, link, FmtString } from "telegraf/format"
export default defineEventHandler(async (event) => {
  const { strapiWebhookToken, telegramBotToken } = useRuntimeConfig(event)

  console.log(telegramBotToken)
  console.log(strapiWebhookToken)

  const body = await readBody(event)
  const bot = event.context.bot
  const offerId = body.entry.id ?? false
  const imageBaseUrl = "https://www.melhores-compras.online/dev"

  if (getRequestHeader(event, 'x-strapi-event') === ('entry.create' || 'entry.publish') && getRequestHeader(event, 'authorization') === `Bearer ${strapiWebhookToken}` && offerId) {

    console.log('dentro do request')

    const response: Record<string, any> = await $fetch(`https://melhores-compras.online/dev/api/offers/${offerId}?populate=*`
    ).catch((err) => {
      console.log(err.data)
      sendError(event, createError({ statusText: 'Internal Server Error', status: 500, data: { status: 500, message: err } }))
    })

    const offer: Record<string, any> = {}

    offer.name = response.data.attributes.name ?? null
    offer.price = response.data.attributes.price ?? null
    offer.price = response.data.attributes.price ?? null
    offer.old_price = response.data.attributes.old_price ?? null
    offer.seller = response.data.attributes.seller ?? null
    offer.prod_link = response.data.attributes.prod_link ?? null
    offer.imgUrl = `${imageBaseUrl}${response.data.attributes.image.data[0].attributes.url}` ?? null
    offer.imgUrl2 = `https://melhores-compras.online/uploads/thumbnail_Descascador_OXO_4080570013_18_Cm_Preto_afe4c816ae.jpg` ?? null

    console.log(offer)

    if (offer.name && offer.price && offer.prod_link && offer.imgUrl) {

      const teste = new FmtString('format string')
      const teste2 = 'sem format string'

      bot.telegram.sendMessage(-1002050293565, fmt`
      ${link('\xa0', offer.imgUrl)}
      🔥🔥 ${bold`${offer.name}`} 🔥🔥 
      ${teste}
      ${teste2}
      ${italic("De: " + offer.old_price)}
      ${bold`Por: ${offer.price}`}
      ${link('\x0a', offer.imgUrl)}
      `)
      // ${link('Link: ', offer.prod_link)}
      // bot.telegram.sendMessage(-1002050293565, "testeeee");
    }

  }

  return { nitro: 'fim' }
})