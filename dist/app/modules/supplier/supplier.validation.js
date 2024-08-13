"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierZodSchema = void 0;
const zod_1 = require("zod");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CreateSupplierZodSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'First name is required' })
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(25, { message: 'First name cannot exceed 25 characters' }),
    middleName: zod_1.z
        .string()
        .max(25, { message: 'Middle name cannot exceed 25 characters' })
        .optional(),
    lastName: zod_1.z
        .string({ required_error: 'Last name is required' })
        .min(2, { message: 'Last name must be at least 2 characters long' })
        .max(25, { message: 'Last name cannot exceed 25 characters' }),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
    }),
    phoneNo: zod_1.z
        .string({ required_error: 'Phone number is required' })
        .min(1, { message: 'Phone number is required' })
        .max(20, { message: 'Phone number cannot exceed 20 characters' }),
    gender: zod_1.z
        .string()
        .max(25, { message: 'Gender cannot exceed 25 characters' })
        .optional(),
    nid: zod_1.z
        .string()
        .max(25, { message: 'NID cannot exceed 25 characters' })
        .optional(),
    presentAddress: zod_1.z
        .string()
        .max(255, { message: 'Present address cannot exceed 255 characters' })
        .optional(),
    permanentAddress: zod_1.z
        .string()
        .max(255, { message: 'Permanent address cannot exceed 255 characters' })
        .optional(),
    profileImage: zod_1.z
        .string()
        .url({ message: 'Invalid URL' })
        .max(255, { message: 'Profile image URL cannot exceed 255 characters' })
        .optional(),
    uniqueId: zod_1.z.string().optional(),
    status: zod_1.z.boolean().optional().default(true),
});
const UpdateSupplierZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(2, { message: 'First name must be at least 2 characters long' })
            .max(25, { message: 'First name cannot exceed 25 characters' })
            .optional(),
        middleName: zod_1.z
            .string()
            .max(25, { message: 'Middle name cannot exceed 25 characters' })
            .optional(),
        lastName: zod_1.z
            .string()
            .min(2, { message: 'Last name must be at least 2 characters long' })
            .max(25, { message: 'Last name cannot exceed 25 characters' })
            .optional(),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .refine(value => emailRegex.test(value), {
            message: 'Invalid email address',
        }),
        phoneNo: zod_1.z
            .string()
            .min(1, { message: 'Phone number is required' })
            .max(20, { message: 'Phone number cannot exceed 20 characters' })
            .optional(),
        gender: zod_1.z
            .string()
            .max(25, { message: 'Gender cannot exceed 25 characters' })
            .optional(),
        nid: zod_1.z
            .string()
            .max(25, { message: 'NID cannot exceed 25 characters' })
            .optional(),
        presentAddress: zod_1.z
            .string()
            .max(255, { message: 'Present address cannot exceed 255 characters' })
            .optional(),
        permanentAddress: zod_1.z
            .string()
            .max(255, { message: 'Permanent address cannot exceed 255 characters' })
            .optional(),
        profileImage: zod_1.z
            .string()
            .url({ message: 'Invalid URL' })
            .max(255, { message: 'Profile image URL cannot exceed 255 characters' })
            .optional(),
        uniqueId: zod_1.z.string().optional(),
        status: zod_1.z.boolean().optional().default(true),
    }),
});
exports.SupplierZodSchema = {
    CreateSupplierZodSchema,
    UpdateSupplierZodSchema,
};
