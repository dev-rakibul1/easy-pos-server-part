import { z } from 'zod'

const CreateLoginAuthValidation = z.object({
  body: z.object({
    uniqueId: z
      .string({
        required_error: 'UniqueId is required.',
      })
      .nonempty('Id is required.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .nonempty('Password you not provide empty value.')
      .min(6, 'Password must be at least 6 characters long.'),
  }),
})
const CreateWebLoginAuthValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .nonempty('Email is required.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .nonempty('Password you not provide empty value.')
      .min(6, 'Password must be at least 6 characters long.'),
  }),
})

const CreateRefreshTokenZodValidation = z.object({
  cookies: z.object({
    refreshToken: z
      .string({
        required_error: 'Refresh token is required.',
      })
      .nonempty('Please provide a refresh token.'),
  }),
})

const ChangeUserPasswordZodValidation = z.object({
  body: z.object({
    oldPassword: z
      .string({
        required_error: 'Old password is required.',
      })
      .nonempty('Please provide old password.'),
    newPassword: z
      .string({
        required_error: 'New password is required.',
      })
      .nonempty('Please provide new password.'),
  }),
})

export const AuthValidation = {
  CreateLoginAuthValidation,
  CreateRefreshTokenZodValidation,
  ChangeUserPasswordZodValidation,
  CreateWebLoginAuthValidation,
}
