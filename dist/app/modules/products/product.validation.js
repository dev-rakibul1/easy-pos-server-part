"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodValidation = void 0;
const zod_1 = require("zod");
const createProductZodValidation = zod_1.z.object({
    productName: zod_1.z
        .string({
        required_error: 'Product name is required',
    })
        .min(1, {
        message: 'Product name must be at least 1 characters long',
    })
        .max(255, {
        message: 'Product name must be less than or equal to 255 characters',
    }),
    brandName: zod_1.z
        .string({ required_error: 'Brand name is required' })
        .min(1, { message: 'Brand name must be at least 1 characters long' })
        .max(255, {
        message: 'Brand name must be less than or equal to 255 characters',
    }),
    modelName: zod_1.z.string().min(1, { message: 'Model name is required' }).max(255, {
        message: 'Model name must be less than or equal to 255 characters',
    }),
    processor: zod_1.z
        .string()
        .min(1, { message: 'Processor must be at least 1 characters long' })
        .max(255, {
        message: 'Processor must be less than or equal to 255 characters',
    })
        .optional(),
    unit: zod_1.z.string().min(1, { message: 'Unit is required' }).max(255, {
        message: 'Unit must be less than or equal to 255 characters',
    }),
    category: zod_1.z.string().min(1, { message: 'Category is required' }).max(255, {
        message: 'Category must be less than or equal to 255 characters',
    }),
    reOrderAlert: zod_1.z
        .number()
        .int()
        .min(0, { message: 'Reorder alert must be a non-negative integer' })
        .refine((value) => value === Math.floor(value), {
        message: 'Reorder alert must be an integer',
    }),
    description: zod_1.z
        .string({ message: 'Description is required' })
        .max(1000, {
        message: 'Description must be less than or equal to 1000 characters',
    })
        .optional(),
    uniqueId: zod_1.z
        .string()
        .min(1, { message: 'Unique ID is required' })
        .max(255, {
        message: 'Unique ID must be less than or equal to 255 characters',
    })
        .optional(),
    productStock: zod_1.z
        .number()
        .int()
        .min(0, { message: 'Product stock must be a non-negative integer' })
        .refine((value) => value >= 0, {
        message: 'Product stock cannot be negative',
    })
        .optional(),
    othersStock: zod_1.z
        .number()
        .int()
        .min(0, { message: 'Others stock must be a non-negative integer' })
        .refine((value) => value >= 0, {
        message: 'Others stock cannot be negative',
    })
        .optional(),
});
// Update fields
const UpdateProductZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z
            .string()
            .min(1, {
            message: 'Product name must be at least 1 characters long',
        })
            .max(255, {
            message: 'Product name must be less than or equal to 255 characters',
        })
            .optional(),
        brandName: zod_1.z
            .string()
            .min(2, { message: 'Brand name must be at least 2 characters long' })
            .max(255, {
            message: 'Brand name must be less than or equal to 255 characters',
        })
            .optional(),
        modelName: zod_1.z
            .string()
            .min(1, { message: 'Model name is required' })
            .max(255, {
            message: 'Model name must be less than or equal to 255 characters',
        })
            .optional(),
        processor: zod_1.z
            .string()
            .min(2, { message: 'Processor must be at least 2 characters long' })
            .max(255, {
            message: 'Processor must be less than or equal to 255 characters',
        })
            .optional(),
        unit: zod_1.z
            .string()
            .min(1, { message: 'Unit is required' })
            .max(255, {
            message: 'Unit must be less than or equal to 255 characters',
        })
            .optional(),
        category: zod_1.z
            .string()
            .min(1, { message: 'Category is required' })
            .max(255, {
            message: 'Category must be less than or equal to 255 characters',
        })
            .optional(),
        reOrderAlert: zod_1.z
            .number()
            .int()
            .min(0, { message: 'Reorder alert must be a non-negative integer' })
            .refine((value) => value === Math.floor(value), {
            message: 'Reorder alert must be an integer',
        })
            .optional(),
        productImage: zod_1.z
            .string()
            .min(1, { message: 'Product image is required' })
            .max(255, {
            message: 'Product image must be less than or equal to 255 characters',
        })
            .optional(),
        description: zod_1.z
            .string()
            .max(1000, {
            message: 'Description must be less than or equal to 1000 characters',
        })
            .optional(),
        uniqueId: zod_1.z
            .string()
            .min(1, { message: 'Unique ID is required' })
            .max(255, {
            message: 'Unique ID must be less than or equal to 255 characters',
        })
            .optional(),
        productStock: zod_1.z
            .number()
            .int()
            .min(0, { message: 'Product stock must be a non-negative integer' })
            .refine((value) => value >= 0, {
            message: 'Product stock cannot be negative',
        })
            .optional(),
        othersStock: zod_1.z
            .number()
            .int()
            .min(0, { message: 'Others stock must be a non-negative integer' })
            .refine((value) => value >= 0, {
            message: 'Others stock cannot be negative',
        })
            .optional(),
    }),
});
exports.ProductZodValidation = {
    createProductZodValidation,
    UpdateProductZodValidation,
};
