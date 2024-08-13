"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryZodValidation = void 0;
const zod_1 = require("zod");
// Create Category validation
const createCategoryZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        categoryName: zod_1.z.string({ required_error: 'Category name is required' }),
    }),
});
// Update Category validation
const UpdateCategoryZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        categoryName: zod_1.z.string({}).optional(),
    }),
});
exports.CategoryZodValidation = {
    createCategoryZodValidation,
    UpdateCategoryZodValidation,
};
