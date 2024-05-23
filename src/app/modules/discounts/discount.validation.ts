import { z } from 'zod'

const CreateDiscountZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Discount name is required.' })
      .min(1, { message: 'Discount name must be at least 1 characters long' })
      .max(55, { message: 'Discount name cannot exceed 55 characters.' }),
    discountType: z
      .string({ required_error: 'Discount status is required.' })
      .min(1, { message: 'Discount status must be at least 1 characters long' })
      .max(55, { message: 'Discount status cannot exceed 55 characters.' }),

    discountValue: z
      .number({ required_error: 'Discount value is required.' })
      .max(55, { message: 'Discount value cannot exceed 55 characters.' }),
    uniqueId: z.string().optional(),
  }),
})

const UpdateDiscountZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Discount name must be at least 1 characters long' })
      .max(55, { message: 'Discount name cannot exceed 55 characters.' })
      .optional(),
    discountType: z
      .string()
      .min(1, { message: 'Discount status must be at least 1 characters long' })
      .max(55, { message: 'Discount status cannot exceed 55 characters.' })
      .optional(),

    discountValue: z
      .number()
      .max(55, { message: 'Discount value cannot exceed 55 characters.' })
      .optional(),
    uniqueId: z.string().optional(),
  }),
})
export const DiscountZodSchema = {
  CreateDiscountZodSchema,
  UpdateDiscountZodSchema,
}
