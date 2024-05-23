import { z } from 'zod'

const CreateVatsZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Vat name is required.' })
      .min(1, { message: 'Vat name must be at least 1 characters long' })
      .max(55, { message: 'Vat name cannot exceed 55 characters.' }),
    vatType: z
      .string({ required_error: 'Vat status is required.' })
      .min(1, { message: 'Vat status must be at least 1 characters long' })
      .max(55, { message: 'Vat status cannot exceed 55 characters.' }),

    vatValue: z
      .number({ required_error: 'Vat value is required.' })
      .max(55, { message: 'Vat value cannot exceed 55 characters.' }),
    uniqueId: z.string().optional(),
  }),
})

const UpdateVatsZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Vat name must be at least 1 characters long' })
      .max(55, { message: 'Vat name cannot exceed 55 characters.' })
      .optional(),
    vatType: z
      .string()
      .min(1, { message: 'Vat status must be at least 1 characters long' })
      .max(55, { message: 'Vat status cannot exceed 55 characters.' })
      .optional(),

    vatValue: z
      .number()
      .max(55, { message: 'Vat value cannot exceed 55 characters.' })
      .optional(),
    uniqueId: z.string().optional(),
  }),
})
export const VatsZodSchema = {
  CreateVatsZodSchema,
  UpdateVatsZodSchema,
}
