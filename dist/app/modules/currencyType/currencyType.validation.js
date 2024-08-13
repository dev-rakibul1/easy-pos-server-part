"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyTypeZodSchema = void 0;
const zod_1 = require("zod");
const CreateCurrencyTypeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        currencyName: zod_1.z
            .string({ required_error: 'Currency name is required.' })
            .min(2, { message: 'Currency name must be at least 2 characters long' })
            .max(15, { message: 'Currency name cannot exceed 15 characters.' }),
        uniqueId: zod_1.z.string().optional(),
    }),
});
const UpdateCurrencyTypeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        currencyName: zod_1.z
            .string()
            .min(2, { message: 'Currency name must be at least 2 characters long' })
            .max(15, { message: 'Currency name cannot exceed 15 characters.' })
            .optional(),
        uniqueId: zod_1.z.string().optional(),
    }),
});
exports.CurrencyTypeZodSchema = {
    CreateCurrencyTypeZodSchema,
    UpdateCurrencyTypeZodSchema,
};
