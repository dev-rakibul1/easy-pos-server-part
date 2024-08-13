"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatsZodSchema = void 0;
const zod_1 = require("zod");
const CreateVatsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Vat name is required.' })
            .min(1, { message: 'Vat name must be at least 1 characters long' })
            .max(100, { message: 'Vat name cannot exceed 100 characters.' }),
        vatType: zod_1.z
            .string({ required_error: 'Vat status is required.' })
            .min(1, { message: 'Vat status must be at least 1 characters long' })
            .max(100, { message: 'Vat status cannot exceed 100 characters.' }),
        vatValue: zod_1.z
            .number({ required_error: 'Vat value is required.' })
            .max(100, { message: 'Vat value cannot exceed 100 characters.' }),
        uniqueId: zod_1.z.string().optional(),
    }),
});
const UpdateVatsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, { message: 'Vat name must be at least 1 characters long' })
            .max(100, { message: 'Vat name cannot exceed 100 characters.' })
            .optional(),
        vatType: zod_1.z
            .string()
            .min(1, { message: 'Vat status must be at least 1 characters long' })
            .max(100, { message: 'Vat status cannot exceed 100 characters.' })
            .optional(),
        vatValue: zod_1.z
            .number()
            .max(100, { message: 'Vat value cannot exceed 100 characters.' })
            .optional(),
        uniqueId: zod_1.z.string().optional(),
    }),
});
exports.VatsZodSchema = {
    CreateVatsZodSchema,
    UpdateVatsZodSchema,
};
