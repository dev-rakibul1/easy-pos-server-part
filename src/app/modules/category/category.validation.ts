import { z } from 'zod'

// Create Category validation
const createCategoryZodValidation = z.object({
  body: z.object({
    categoryName: z.string({ required_error: 'Category name is required' }),
  }),
})

// Update Category validation
const UpdateCategoryZodValidation = z.object({
  body: z.object({
    categoryName: z.string({}).optional(),
  }),
})

export const CategoryZodValidation = {
  createCategoryZodValidation,
  UpdateCategoryZodValidation,
}
