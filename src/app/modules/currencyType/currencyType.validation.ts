import { z } from 'zod'

const CreateCurrencyTypeZodSchema = z.object({
  body: z.object({
    currencyName: z
      .string({ required_error: 'Currency name is required.' })
      .min(2, { message: 'Currency name must be at least 2 characters long' })
      .max(15, { message: 'Currency name cannot exceed 15 characters.' }),
    uniqueId: z.string().optional(),
  }),
})

const UpdateCurrencyTypeZodSchema = z.object({
  body: z.object({
    currencyName: z
      .string()
      .min(2, { message: 'Currency name must be at least 2 characters long' })
      .max(15, { message: 'Currency name cannot exceed 15 characters.' })
      .optional(),
    uniqueId: z.string().optional(),
  }),
})
export const CurrencyTypeZodSchema = {
  CreateCurrencyTypeZodSchema,
  UpdateCurrencyTypeZodSchema,
}
