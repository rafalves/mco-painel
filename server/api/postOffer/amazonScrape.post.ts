import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  // console.log(body)

  const prod_link = body.link

  let offer: Record<string, string | number | null | false> = {}

  const res = await $fetch(prod_link).catch((err) => {
    throw createError({ status: 500, statusMessage: 'Internal Server Error', data: err })
  })

  const $ = cheerio.load(res as string);

  const title = $('#productTitle').text().trim()
  const price = $('span.a-price.aok-align-center > span.a-offscreen').text().replace(/(R\$[\d,]+)\1+/g, '$1').replace("R$", "").replace(",", ".")
  const old_priceRaw = $('span.a-size-small.aok-offscreen').text()
  const old_price = old_priceRaw.replace(/[^\d,]/g, '').replace(",", ".")
  const discountRaw = $('.savingsPercentage').text()
  const discount = discountRaw.replace("%", "")
  const category = $('ul.a-unordered-list.a-horizontal.a-size-small').children('li').last().text().trim()
  const image = $('img.a-dynamic-image').attr('src') ?? ''

  offer.name = title
  offer.price = parseInt(price, 10) ?? "null"
  offer.old_price = parseInt(old_price) ?? null
  offer.discount = parseInt(discount) ?? null
  offer.payment_method = null
  offer.seller = 'Amazon'
  offer.category = category
  offer.headline = 'Oferta'
  offer.tags = null
  offer.offer_source = 'Amazon'
  offer.prod_link = prod_link
  offer.image = image
  offer.post_update = false

  // console.log(offer)

  return offer

})