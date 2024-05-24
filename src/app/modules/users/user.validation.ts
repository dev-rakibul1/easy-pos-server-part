import { z } from 'zod'
import { UserRoleEnum, emailRegex } from './users.constant'

// Define Zod schema for creating a user
const CreateUserZodSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(25, { message: 'First name cannot exceed 25 characters' }),

  middleName: z
    .string()
    .max(25, { message: 'Middle name cannot exceed 25 characters' })
    .optional(),

  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(25, { message: 'Last name cannot exceed 25 characters' }),

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
    .min(1, { message: 'Phone number is required' })
    .max(20, { message: 'Phone number cannot exceed 20 characters' }),

  gender: z
    .string()
    .max(50, { message: 'Gender cannot exceed 50 characters' })
    .optional(),

  nid: z
    .string()
    .max(50, { message: 'NID cannot exceed 50 characters' })
    .optional(),

  presentAddress: z
    .string()
    .max(255, { message: 'Present address cannot exceed 255 characters' })
    .optional(),

  permanentAddress: z
    .string()
    .max(255, { message: 'Permanent address cannot exceed 255 characters' })
    .optional(),

  profileImage: z
    .string()
    .url({ message: 'Invalid URL' })
    .max(255, { message: 'Profile image URL cannot exceed 255 characters' })
    .optional(),

  uniqueId: z.string().optional(),

  role: z.enum([...UserRoleEnum] as [string, ...string[]]).optional(),

  password: z.string().optional(),
})
const UpdateUserZodSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters long' })
      .max(25, { message: 'First name cannot exceed 25 characters' })
      .optional(),

    middleName: z
      .string()
      .max(25, { message: 'Middle name cannot exceed 25 characters' })
      .optional(),

    lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters long' })
      .max(25, { message: 'Last name cannot exceed 25 characters' })
      .optional(),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
      }),

    phoneNo: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .max(20, { message: 'Phone number cannot exceed 20 characters' })
      .optional(),

    gender: z
      .string()
      .max(50, { message: 'Gender cannot exceed 50 characters' })
      .optional(),

    nid: z
      .string()
      .max(50, { message: 'NID cannot exceed 50 characters' })
      .optional(),

    presentAddress: z
      .string()
      .max(255, { message: 'Present address cannot exceed 255 characters' })
      .optional(),

    permanentAddress: z
      .string()
      .max(255, { message: 'Permanent address cannot exceed 255 characters' })
      .optional(),

    profileImage: z
      .string()
      .url({ message: 'Invalid URL' })
      .max(255, { message: 'Profile image URL cannot exceed 255 characters' })
      .optional(),

    uniqueId: z.string().optional(),

    role: z.enum([...UserRoleEnum] as [string, ...string[]]).optional(),

    password: z.string().optional(),
  }),
})

export const UserZodSchema = {
  CreateUserZodSchema,
  UpdateUserZodSchema,
}
