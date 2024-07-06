import { Sells } from '@prisma/client'

export type ISellFilterRequest = {
  searchTerm?: string | undefined
  paymentMethod?: string | undefined
  modelName?: string | undefined
  productName?: string | undefined
  uniqueId?: string | undefined
}

type ICustomerPayment = {
  totalPay: number
  customerId: string
  userId: string
  productId: string
  paymentType?: string
}

type Variant = {
  imeiNumber: string
  ram: string
  rom: string
  color: string
  variantId: string
  productId: string
}

export type ISellsType = {
  variants: Variant[]
  sells: Sells[]
  customerPayInUser: ICustomerPayment
}
