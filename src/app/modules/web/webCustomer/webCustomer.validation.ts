import { z } from 'zod'

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ✅ Enums
export const GenderEnum = z.enum(['male', 'female', 'others'])
export const CustomerStatusEnum = z.enum(['active', 'suspended', 'banned'])
export const CustomerRoleEnum = z.enum(['customer', 'visitor'])

export const CreateWebCustomerZodSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(2, { message: 'First name must be at least 2 characters long' })
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
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(255, {
      message: 'Last name must be less than or equal to 255 characters',
    }),

  email: z
    .string({ required_error: 'Email is required' })
    .refine(value => emailRegex.test(value), {
      message: 'Invalid email address',
    }),

  phoneNo: z
    .string({ required_error: 'Phone number is required' })
    .min(1, { message: 'Phone number must be at least 1 character long' })
    .max(15, {
      message: 'Phone number must be less than or equal to 15 characters',
    }),

  nid: z
    .string()
    .max(20, { message: 'NID must be less than or equal to 20 characters' })
    .optional(),

  dateOfBirth: z.coerce.date().optional(),

  gender: GenderEnum.optional(),

  presentAddress: z
    .string()
    .max(255, {
      message: 'Present address must be less than or equal to 255 characters',
    })
    .optional(),

  permanentAddress: z
    .string()
    .max(255, {
      message: 'Permanent address must be less than or equal to 255 characters',
    })
    .optional(),

  shippingAddress: z.string().max(255).optional(),
  billingAddress: z.string().max(255).optional(),

  profileImage: z
    .string()
    .max(255, {
      message: 'Profile image URL must be less than or equal to 255 characters',
    })
    .optional(),

  uniqueId: z.string().optional(),
  password: z.string().min(6).max(255).optional(),

  isEmailVerified: z.boolean().optional(),
  isPhoneVerified: z.boolean().optional(),
  status: CustomerStatusEnum.optional(),
  role: CustomerRoleEnum.optional(),

  referralCode: z.string().max(50).optional(),
  referredBy: z.string().optional(),

  loyaltyPoints: z.number().int().min(0).optional(),

  newsletterOptIn: z.boolean().optional(),

  provider: z.string().optional(),
  providerId: z.string().optional(),

  lastLogin: z.coerce.date().optional(),
  lastPurchaseDate: z.coerce.date().optional(),

  deviceTokens: z.array(z.string()).optional(),
  ipHistory: z.array(z.string()).optional(),
  userAgentHistory: z.array(z.string()).optional(),
})

export const WebCustomerZodSchema = {
  CreateWebCustomerZodSchema,
}
