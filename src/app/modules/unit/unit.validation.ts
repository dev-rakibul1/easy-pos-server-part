import { z } from 'zod'

// Create unit validation
const createUnitZodValidation = z.object({
  body: z.object({
    unitName: z.string({ required_error: 'Unit name is required' }),
  }),
})

// Update Unit validation
const UpdateUnitZodValidation = z.object({
  body: z.object({
    unitName: z.string({}).optional(),
  }),
})

export const UnitZodValidation = {
  createUnitZodValidation,
  UpdateUnitZodValidation,
}
