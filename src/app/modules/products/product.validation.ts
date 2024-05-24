import { z } from 'zod'

const createProductZodValidation = z.object({
  productName: z
    .string({
      required_error: 'Product name is required',
    })
    .min(5, {
      message: 'Product name must be at least 5 characters long',
    })
    .max(255, {
      message: 'Product name must be less than or equal to 255 characters',
    }),
  brandName: z
    .string({ required_error: 'Brand name is required' })
    .min(5, { message: 'Product name must be at least 5 characters long' })
    .max(255, {
      message: 'Brand name must be less than or equal to 255 characters',
    }),
  modelName: z.string().min(1, { message: 'Model name is required' }).max(255, {
    message: 'Model name must be less than or equal to 255 characters',
  }),
  processor: z
    .string()
    .min(5, { message: 'Processor must be at least 5 characters long' })
    .max(255, {
      message: 'Processor must be less than or equal to 255 characters',
    })
    .optional(),
  unit: z.string().min(1, { message: 'Unit is required' }).max(255, {
    message: 'Unit must be less than or equal to 255 characters',
  }),
  category: z.string().min(1, { message: 'Category is required' }).max(255, {
    message: 'Category must be less than or equal to 255 characters',
  }),
  reOrderAlert: z
    .number()
    .int()
    .min(0, { message: 'Reorder alert must be a non-negative integer' })
    .refine((value: number) => value === Math.floor(value), {
      message: 'Reorder alert must be an integer',
    }),
  productImage: z
    .string()
    .min(1, { message: 'Product image is required' })
    .max(255, {
      message: 'Product image must be less than or equal to 255 characters',
    })
    .optional(),
  description: z
    .string({ message: 'Description is required' })
    .max(1000, {
      message: 'Description must be less than or equal to 1000 characters',
    })
    .optional(),
  uniqueId: z
    .string()
    .min(1, { message: 'Unique ID is required' })
    .max(255, {
      message: 'Unique ID must be less than or equal to 255 characters',
    })
    .optional(),
  productStock: z
    .number()
    .int()
    .min(0, { message: 'Product stock must be a non-negative integer' })

    .refine((value: number) => value >= 0, {
      message: 'Product stock cannot be negative',
    })
    .optional(),
  othersStock: z
    .number()
    .int()
    .min(0, { message: 'Others stock must be a non-negative integer' })
    .refine((value: number) => value >= 0, {
      message: 'Others stock cannot be negative',
    })
    .optional(),
})

// Update fields
const UpdateProductZodValidation = z.object({
  body: z.object({
    productName: z
      .string()
      .min(5, {
        message: 'Product name must be at least 5 characters long',
      })
      .max(255, {
        message: 'Product name must be less than or equal to 255 characters',
      })
      .optional(),
    brandName: z
      .string()
      .min(5, { message: 'Brand name must be at least 5 characters long' })
      .max(255, {
        message: 'Brand name must be less than or equal to 255 characters',
      })
      .optional(),
    modelName: z
      .string()
      .min(1, { message: 'Model name is required' })
      .max(255, {
        message: 'Model name must be less than or equal to 255 characters',
      })
      .optional(),
    processor: z
      .string()
      .min(5, { message: 'Processor must be at least 5 characters long' })
      .max(255, {
        message: 'Processor must be less than or equal to 255 characters',
      })
      .optional(),
    unit: z
      .string()
      .min(1, { message: 'Unit is required' })
      .max(255, {
        message: 'Unit must be less than or equal to 255 characters',
      })
      .optional(),
    category: z
      .string()
      .min(1, { message: 'Category is required' })
      .max(255, {
        message: 'Category must be less than or equal to 255 characters',
      })
      .optional(),
    reOrderAlert: z
      .number()
      .int()
      .min(0, { message: 'Reorder alert must be a non-negative integer' })
      .refine((value: number) => value === Math.floor(value), {
        message: 'Reorder alert must be an integer',
      })
      .optional(),
    productImage: z
      .string()
      .min(1, { message: 'Product image is required' })
      .max(255, {
        message: 'Product image must be less than or equal to 255 characters',
      })
      .optional(),
    description: z
      .string()
      .max(1000, {
        message: 'Description must be less than or equal to 1000 characters',
      })
      .optional(),
    uniqueId: z
      .string()
      .min(1, { message: 'Unique ID is required' })
      .max(255, {
        message: 'Unique ID must be less than or equal to 255 characters',
      })
      .optional(),
    productStock: z
      .number()
      .int()
      .min(0, { message: 'Product stock must be a non-negative integer' })
      .refine((value: number) => value >= 0, {
        message: 'Product stock cannot be negative',
      })
      .optional(),
    othersStock: z
      .number()
      .int()
      .min(0, { message: 'Others stock must be a non-negative integer' })
      .refine((value: number) => value >= 0, {
        message: 'Others stock cannot be negative',
      })
      .optional(),
  }),
})

export const ProductZodValidation = {
  createProductZodValidation,
  UpdateProductZodValidation,
}
