import { Purchase, Variants } from '@prisma/client'

export type IPurchaseFilterRequest = {
  searchTerm?: string | undefined
  color?: string | undefined
  uniqueId?: string | undefined
}

type ISupplierPayment = {
  totalPay: number
  supplierId: string
  userId: string
  productId: string
  paymentType: string
}

export type IPurchaseType = {
  variants: Variants[]
  purchase: Purchase[]
  supplierPayment: ISupplierPayment
}
