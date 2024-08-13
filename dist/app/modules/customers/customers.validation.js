"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerZodSchema = void 0;
const zod_1 = require("zod");
// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CreateCustomerZodSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({
        required_error: 'First name is required',
    })
        .min(2, { message: 'First name must be at least 2 character long' })
        .max(55, {
        message: 'First name must be less than or equal to 55 characters',
    }),
    middleName: zod_1.z
        .string()
        .max(55, {
        message: 'Middle name must be less than or equal to 55 characters',
    })
        .optional(),
    lastName: zod_1.z
        .string({
        required_error: 'Last name is required',
    })
        .min(2, { message: 'Last name must be at least 2 character long' })
        .max(255, {
        message: 'Last name must be less than or equal to 255 characters',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
    }),
    phoneNo: zod_1.z
        .string({
        required_error: 'Phone number is required',
    })
        .min(1, { message: 'Phone number must be at least 1 character long' })
        .max(15, {
        message: 'Phone number must be less than or equal to 15 characters',
    }),
    nid: zod_1.z
        .string()
        .max(20, { message: 'NID must be less than or equal to 20 characters' })
        .optional(),
    presentAddress: zod_1.z
        .string()
        .max(255, {
        message: 'Present address must be less than or equal to 255 characters',
    })
        .optional(),
    permanentAddress: zod_1.z
        .string()
        .max(255, {
        message: 'Permanent address must be less than or equal to 255 characters',
    })
        .optional(),
    profileImage: zod_1.z
        .string()
        .max(255, {
        message: 'Profile image URL must be less than or equal to 255 characters',
    })
        .optional(),
    uniqueId: zod_1.z.string().optional(),
});
const UpdateCustomerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(2, { message: 'First name must be at least 2 character long' })
            .max(55, {
            message: 'First name must be less than or equal to 55 characters',
        })
            .optional(),
        middleName: zod_1.z
            .string()
            .max(55, {
            message: 'Middle name must be less than or equal to 55 characters',
        })
            .optional(),
        lastName: zod_1.z
            .string()
            .min(2, { message: 'Last name must be at least 2 character long' })
            .max(255, {
            message: 'Last name must be less than or equal to 255 characters',
        })
            .optional(),
        email: zod_1.z.string().refine(value => emailRegex.test(value), {
            message: 'Invalid email address',
        }),
        phoneNo: zod_1.z
            .string()
            .min(1, { message: 'Phone number must be at least 1 character long' })
            .max(15, {
            message: 'Phone number must be less than or equal to 15 characters',
        })
            .optional(),
        nid: zod_1.z
            .string()
            .max(20, { message: 'NID must be less than or equal to 20 characters' })
            .optional(),
        presentAddress: zod_1.z
            .string()
            .max(255, {
            message: 'Present address must be less than or equal to 255 characters',
        })
            .optional(),
        permanentAddress: zod_1.z
            .string()
            .max(255, {
            message: 'Permanent address must be less than or equal to 255 characters',
        })
            .optional(),
        profileImage: zod_1.z
            .string()
            .max(255, {
            message: 'Profile image URL must be less than or equal to 255 characters',
        })
            .optional(),
        uniqueId: zod_1.z.string().optional(),
    }),
});
exports.CustomerZodSchema = {
    CreateCustomerZodSchema,
    UpdateCustomerZodSchema,
};
