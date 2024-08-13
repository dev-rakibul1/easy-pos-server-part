"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandZodValidation = void 0;
const zod_1 = require("zod");
// Create brand validation
const createBrandZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        brandName: zod_1.z.string({ required_error: 'Brand name is required' }),
        description: zod_1.z.string({}).optional(),
        uniqueId: zod_1.z.string({}).optional(),
    }),
});
// Update brand validation
const UpdateBrandZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        brandName: zod_1.z.string({}).optional(),
        description: zod_1.z.string({}).optional(),
    }),
});
exports.BrandZodValidation = {
    createBrandZodValidation,
    UpdateBrandZodValidation,
};
