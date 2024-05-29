import { z } from 'zod'

// Create brand validation
const createBrandZodValidation = z.object({
  body: z.object({
    brandName: z.string({ required_error: 'Brand name is required' }),
    description: z.string({}).optional(),
    uniqueId: z.string({}).optional(),
  }),
})

// Update brand validation
const UpdateBrandZodValidation = z.object({
  body: z.object({
    brandName: z.string({}).optional(),
    description: z.string({}).optional(),
  }),
})

export const BrandZodValidation = {
  createBrandZodValidation,
  UpdateBrandZodValidation,
}
