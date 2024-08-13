"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const CreateLoginAuthValidation = zod_1.z.object({
    body: zod_1.z.object({
        uniqueId: zod_1.z
            .string({
            required_error: 'UniqueId is required.',
        })
            .nonempty('Id is required.'),
        password: zod_1.z
            .string({
            required_error: 'Password is required.',
        })
            .nonempty('Password you not provide empty value.')
            .min(6, 'Password must be at least 6 characters long.'),
    }),
});
const CreateRefreshTokenZodValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z
            .string({
            required_error: 'Refresh token is required.',
        })
            .nonempty('Please provide a refresh token.'),
    }),
});
const ChangeUserPasswordZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z
            .string({
            required_error: 'Old password is required.',
        })
            .nonempty('Please provide old password.'),
        newPassword: zod_1.z
            .string({
            required_error: 'New password is required.',
        })
            .nonempty('Please provide new password.'),
    }),
});
exports.AuthValidation = {
    CreateLoginAuthValidation,
    CreateRefreshTokenZodValidation,
    ChangeUserPasswordZodValidation,
};
