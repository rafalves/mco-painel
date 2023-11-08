import { Input } from "telegraf"
import { fmt, bold, italic, mention, link, FmtString } from "telegraf/format"
import { InputFile } from "telegraf/typings/core/types/typegram"

export default defineEventHandler(async (event) => {
  const { strapiWebhookToken, telegramBotToken } = useRuntimeConfig(event)

  const body = await readBody(event)
  const bot = event.context.bot
  const offerId = body.entry.id ?? false
  const imageBaseUrl = "https://www.melhores-compras.online/dev"

  if (getRequestHeader(event, 'x-strapi-event') === ('entry.create' || 'entry.publish') && getRequestHeader(event, 'authorization') === `Bearer ${strapiWebhookToken}` && offerId) {

    const response: Record<string, any> = await $fetch<any>(`https://melhores-compras.online/dev/api/offers/${offerId}?populate=*`
    ).catch((err) => {
      console.log(err.data)
      sendError(event, createError({ statusText: 'Internal Server Error', status: 500, data: { status: 500, message: err } }))
    })

    // console.log("data response" + JSON.stringify(response, null, 2))
    const offer: Record<string, any> = {}

    offer.name = response.data.attributes.name ?? null
    offer.price = response.data.attributes.price ?? null
    offer.old_price = response.data.attributes.old_price ?? null
    offer.discount = response.data.attributes.discount ?? null
    offer.payment_method = response.data.attributes.payment_method ?? null
    offer.seller = response.data.attributes.seller ?? null
    offer.category = response.data.attributes.category ?? null
    offer.headline = response.data.attributes.headline ?? null
    offer.tags = response.data.attributes.tags ?? null
    offer.offer_source = response.data.attributes.offer_source ?? null
    offer.prod_link = response.data.attributes.prod_link ?? null
    offer.imgUrl = `${imageBaseUrl}${response.data.attributes.image.data[0].attributes.url}` ?? null

    console.log(offer)

    let headline = ''
    let tags = ''
    if (offer.tags) {
      let text = offer.tags.replace(/Frete Grátis/g, 'FreteGrátis')
      tags = text.split(', ').map((tag: string) => '#' + tag).join(' ') + '\n\n'
    }
    let price = offer.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    switch (offer.headline) {
      case 'Destaque':
        headline = '✨ Destaque ✨'
        break
      case 'Premium':
        headline = '🥇Premium 🥇'
        break
      case 'Oferta':
        headline = '🔥 Oferta 🔥'
        break
      case 'Super Oferta':
        headline = '🏆‍ Super Oferta 🏆'
        break
      case 'Menor Preço':
        headline = '🤑 Menor Preço 🤑'
        break
      case 'Relâmpago':
        headline = '⚡️ Relâmpago ⚡️'
        break
      default:
        headline = '🔥 Oferta 🔥'
        break
    }

    let res = await $fetch(offer.imgUrl, { responseType: "arrayBuffer" }).catch((err) => {
      sendError(event, createError({ statusText: 'Internal Server Error blob', status: 500, data: { status: 500, message: err } }))
    })

    let buffer: Buffer | null = null
    if (res instanceof ArrayBuffer) {
      buffer = Buffer.from(res)
    }

    let image: InputFile | string = ''
    if (buffer instanceof Buffer) {
      image = Input.fromBuffer(buffer)
    } else {
      image = Input.fromURL(offer.imgUrl)
    }

    if (offer.name && offer.price && offer.prod_link && offer.imgUrl) {

      bot.telegram.sendPhoto(-1002050293565, image, {
        caption: fmt`
      ${headline} \n \n 📌 ${bold`${offer.name} `} \n\n Por apenas: ${bold`${price}`} \n\n ${italic`${tags}`} Acesse em: ${bold`${offer.prod_link}`}`
      })
    }


  }

  return { nitro: 'fim' }
})