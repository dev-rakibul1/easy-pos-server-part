"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitZodValidation = void 0;
const zod_1 = require("zod");
// Create unit validation
const createUnitZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        unitName: zod_1.z.string({ required_error: 'Unit name is required' }),
    }),
});
// Update Unit validation
const UpdateUnitZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        unitName: zod_1.z.string({}).optional(),
    }),
});
exports.UnitZodValidation = {
    createUnitZodValidation,
    UpdateUnitZodValidation,
};
