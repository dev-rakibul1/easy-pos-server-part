import { z } from 'zod'

const CreateVatsZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Vat name is required.' })
      .min(1, { message: 'Vat name must be at least 1 characters long' })
      .max(100, { message: 'Vat name cannot exceed 100 characters.' }),
    vatType: z
      .string({ required_error: 'Vat status is required.' })
      .min(1, { message: 'Vat status must be at least 1 characters long' })
      .max(100, { message: 'Vat status cannot exceed 100 characters.' }),

    vatValue: z
      .number({ required_error: 'Vat value is required.' })
      .max(100, { message: 'Vat value cannot exceed 100 characters.' }),
    uniqueId: z.string().optional(),
  }),
})

const UpdateVatsZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Vat name must be at least 1 characters long' })
      .max(100, { message: 'Vat name cannot exceed 100 characters.' })
      .optional(),
    vatType: z
      .string()
      .min(1, { message: 'Vat status must be at least 1 characters long' })
      .max(100, { message: 'Vat status cannot exceed 100 characters.' })
      .optional(),

    vatValue: z
      .number()
      .max(100, { message: 'Vat value cannot exceed 100 characters.' })
      .optional(),
    uniqueId: z.string().optional(),
  }),
})
export const VatsZodSchema = {
  CreateVatsZodSchema,
  UpdateVatsZodSchema,
}
