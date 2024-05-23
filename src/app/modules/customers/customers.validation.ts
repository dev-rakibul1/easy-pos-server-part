import { z } from 'zod'
// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CreateCustomerZodSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .min(2, { message: 'First name must be at least 2 character long' })
      .max(55, {
        message: 'First name must be less than or equal to 55 characters',
      }),
    middleName: z
      .string()
      .max(55, {
        message: 'Middle name must be less than or equal to 55 characters',
      })
      .optional(),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .min(2, { message: 'Last name must be at least 2 character long' })
      .max(255, {
        message: 'Last name must be less than or equal to 255 characters',
      }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
      }),
    phoneNo: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(1, { message: 'Phone number must be at least 1 character long' })
      .max(15, {
        message: 'Phone number must be less than or equal to 15 characters',
      }),
    nid: z
      .string()
      .max(20, { message: 'NID must be less than or equal to 20 characters' })
      .optional(),
    presentAddress: z
      .string()
      .max(255, {
        message: 'Present address must be less than or equal to 255 characters',
      })
      .optional(),
    permanentAddress: z
      .string()
      .max(255, {
        message:
          'Permanent address must be less than or equal to 255 characters',
      })
      .optional(),
    profileImage: z
      .string()
      .max(255, {
        message:
          'Profile image URL must be less than or equal to 255 characters',
      })
      .optional(),
    uniqueId: z.string().optional(),
  }),
})

const UpdateCustomerZodSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 character long' })
      .max(55, {
        message: 'First name must be less than or equal to 55 characters',
      })
      .optional(),
    middleName: z
      .string()
      .max(55, {
        message: 'Middle name must be less than or equal to 55 characters',
      })
      .optional(),
    lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 character long' })
      .max(255, {
        message: 'Last name must be less than or equal to 255 characters',
      })
      .optional(),
    email: z.string().refine(value => emailRegex.test(value), {
      message: 'Invalid email address',
    }),
    phoneNo: z
      .string()
      .min(1, { message: 'Phone number must be at least 1 character long' })
      .max(15, {
        message: 'Phone number must be less than or equal to 15 characters',
      })
      .optional(),
    nid: z
      .string()
      .max(20, { message: 'NID must be less than or equal to 20 characters' })
      .optional(),
    presentAddress: z
      .string()
      .max(255, {
        message: 'Present address must be less than or equal to 255 characters',
      })
      .optional(),
    permanentAddress: z
      .string()
      .max(255, {
        message:
          'Permanent address must be less than or equal to 255 characters',
      })
      .optional(),
    profileImage: z
      .string()
      .max(255, {
        message:
          'Profile image URL must be less than or equal to 255 characters',
      })
      .optional(),
    uniqueId: z.string().optional(),
  }),
})

export const CustomerZodSchema = {
  CreateCustomerZodSchema,
  UpdateCustomerZodSchema,
}
