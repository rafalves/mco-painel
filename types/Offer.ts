import type { Media } from '@/types/Media'

export interface Offer {
  data: {
    id: number
    attributes: {
      name?: string
      price?: number
      old_price?: number
      discount?: number
      payment_method?: string
      seller?: string
      category?: string
      headline?: string
      likes?: number
      tags?: string
      offer_source?: string
      createdAt?: string
      updatedAt?: string
      publishedAt?: string
      prod_link?: string
      post_update?: boolean,
      twitterPost?: string,
      image?: Media
    }
  },
  meta: {}
}

export interface OfferForm {
  name?: string
  price?: number
  old_price?: number
  discount?: number
  payment_method?: string
  seller?: string
  category?: string
  headline?: string
  tags?: string
  offer_source?: string
  prod_link?: string
  post_update?: boolean,
  twitterPost?: string,
}