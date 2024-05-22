import { z } from 'zod'

// Create color validation
const createColorZodValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Color name is required' }),
    colorCode: z.string({}).optional(),
    uniqueId: z.string({}).optional(),
  }),
})

// Update color validation
const UpdateColorZodValidation = z.object({
  body: z.object({
    name: z.string({}).optional(),
    colorCode: z.string({}).optional(),
  }),
})

export const ColorZodValidation = {
  createColorZodValidation,
  UpdateColorZodValidation,
}
