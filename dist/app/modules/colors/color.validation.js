"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorZodValidation = void 0;
const zod_1 = require("zod");
// Create color validation
const createColorZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Color name is required' }),
        colorCode: zod_1.z.string({}).optional(),
        uniqueId: zod_1.z.string({}).optional(),
    }),
});
// Update color validation
const UpdateColorZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        colorCode: zod_1.z.string({}).optional(),
    }),
});
exports.ColorZodValidation = {
    createColorZodValidation,
    UpdateColorZodValidation,
};
