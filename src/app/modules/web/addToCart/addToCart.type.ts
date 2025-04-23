export enum CartStatusEnum {
  cart = 'cart',
  wishlist = 'wishlist',
}

export type IAddToCart = {
  customerId: string
  productId: string
  removeProduct?: boolean
  status?: CartStatusEnum
}
