import { z } from 'zod'

const CreatePurchaseZodSchema = z.object({
  body: z.object({
    purchase: z.array(
      z.object({
        purchaseRate: z
          .number({ required_error: 'Purchase rate is required.' })
          .min(0, { message: 'Purchase rate must be a non-negative number' }),
        sellingPrice: z
          .number({ required_error: 'Selling price is required.' })
          .min(0, { message: 'Selling price must be a non-negative number' }),
        discounts: z
          .number()
          .min(0, { message: 'Discounts must be a non-negative number' })
          .optional(),
        vats: z
          .number()
          .min(0, { message: 'VATs must be a non-negative number' })
          .optional(),
        totalPrice: z
          .number({ required_error: 'Total price is required.' })
          .min(0, { message: 'Total price must be a non-negative number' })
          .optional(),
        totalStock: z
          .number()
          .min(0, { message: 'Total stock must be a non-negative number' })
          .optional(),
        color: z.string().optional(),
        uniqueId: z.string().optional(),

        supplierId: z
          .string({ required_error: 'Supplier id is required.' })
          .uuid({ message: 'Invalid supplier id.' }),
        userId: z
          .string({ required_error: 'User id is required.' })
          .uuid({ message: 'Invalid user id.' }),
        productId: z
          .string({ required_error: 'Product id is required.' })
          .uuid({ message: 'Invalid product id.' }),

        additionalPurchaseId: z.string().uuid().optional(),
      }),
    ),
  }),
})

const UpdatePurchaseZodSchema = z.object({
  body: z.object({
    purchaseRate: z
      .number()
      .min(0, { message: 'Purchase rate must be a non-negative number' })
      .optional(),
    sellingPrice: z
      .number()
      .min(0, { message: 'Selling price must be a non-negative number' })
      .optional(),
    discounts: z
      .number()
      .min(0, { message: 'Discounts must be a non-negative number' })
      .optional(),
    vats: z
      .number()
      .min(0, { message: 'VATs must be a non-negative number' })
      .optional(),
    totalPrice: z
      .number()
      .min(0, { message: 'Total price must be a non-negative number' })
      .optional(),
    totalStock: z
      .number()
      .min(0, { message: 'Total stock must be a non-negative number' })
      .optional(),
    color: z.string().optional(),
    uniqueId: z.string().optional(),
  }),
})

export const PurchaseZodSchema = {
  CreatePurchaseZodSchema,
  UpdatePurchaseZodSchema,
}
