"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountZodSchema = void 0;
const zod_1 = require("zod");
const CreateDiscountZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Discount name is required.' })
            .min(1, { message: 'Discount name must be at least 1 characters long' })
            .max(100, { message: 'Discount name cannot exceed 100 characters.' }),
        discountType: zod_1.z
            .string({ required_error: 'Discount status is required.' })
            .min(1, { message: 'Discount status must be at least 1 characters long' })
            .max(100, { message: 'Discount status cannot exceed 100 characters.' }),
        discountValue: zod_1.z
            .number({ required_error: 'Discount value is required.' })
            .max(100, { message: 'Discount value cannot exceed 100 characters.' }),
        uniqueId: zod_1.z.string().optional(),
    }),
});
const UpdateDiscountZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, { message: 'Discount name must be at least 1 characters long' })
            .max(100, { message: 'Discount name cannot exceed 100 characters.' })
            .optional(),
        discountType: zod_1.z
            .string()
            .min(1, { message: 'Discount status must be at least 1 characters long' })
            .max(100, { message: 'Discount status cannot exceed 100 characters.' })
            .optional(),
        discountValue: zod_1.z
            .number()
            .max(100, { message: 'Discount value cannot exceed 100 characters.' })
            .optional(),
        uniqueId: zod_1.z.string().optional(),
    }),
});
exports.DiscountZodSchema = {
    CreateDiscountZodSchema,
    UpdateDiscountZodSchema,
};
