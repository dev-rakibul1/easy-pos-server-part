"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueAdditionalExpenseId = exports.generateUniqueReturnGroupId = exports.generateUniqueReturnId = exports.generateUniqueInvoiceGroupId = exports.generateUniqueSellId = exports.generateUniquePurchaseId = exports.generateUniqueInvoiceId = exports.generateUniqueBrandId = exports.generateUniqueVatId = exports.generateUniqueDiscountId = exports.generateUniqueCurrencyTypeId = exports.generateUniqueColorId = exports.generateUniqueCustomerPaymentId = exports.generateUniqueCustomerId = exports.generateUniqueSupplierPaymentId = exports.generateUniqueSupplierId = exports.generateUniqueProductId = exports.generateUniqueId = void 0;
const prisma_1 = __importDefault(require("../shared/prisma"));
// Generate user id
function generateUniqueId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.user.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextUserId;
        }
        catch (error) {
            console.error('Error generating unique user ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueId = generateUniqueId;
// Generate product id
function generateUniqueProductId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.product.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextUserId;
        }
        catch (error) {
            console.error('Error generating unique product ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueProductId = generateUniqueProductId;
// Generate supplier id
function generateUniqueSupplierId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastIdNumber = yield prisma_1.default.suppliers.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastIdNumber) {
                const lastId = lastIdNumber.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique supplier ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueSupplierId = generateUniqueSupplierId;
// Generate generateUniqueSupplierPaymentId id
function generateUniqueSupplierPaymentId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.supplierPayment.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextUserId;
        }
        catch (error) {
            console.error('Error generating unique supplier payment ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueSupplierPaymentId = generateUniqueSupplierPaymentId;
// Generate supplierPayment id
function generateUniqueCustomerId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.customers.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextCustomerId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextCustomerId;
        }
        catch (error) {
            console.error('Error generating unique customer ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueCustomerId = generateUniqueCustomerId;
// Generate sell id
// export async function generateUniqueSellId(code: string): Promise<string> {
//   try {
//     // Get the count of existing users
//     const count = await prisma.sells.count()
//     const codeUpperCase = code.toUpperCase()
//     // Generate the next unique user ID
//     const nextSellId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`
//     return nextSellId
//   } catch (error) {
//     console.error('Error generating unique sell ID:', error)
//     throw error
//   }
// }
// Generate customer payment id
function generateUniqueCustomerPaymentId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.returns.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextCustomerPaymentId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextCustomerPaymentId;
        }
        catch (error) {
            console.error('Error generating unique customer payment ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueCustomerPaymentId = generateUniqueCustomerPaymentId;
// Generate color id
function generateUniqueColorId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.colors.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextColorId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextColorId;
        }
        catch (error) {
            console.error('Error generating unique color ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueColorId = generateUniqueColorId;
// Generate currency type id
function generateUniqueCurrencyTypeId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing users
            const count = yield prisma_1.default.currencyType.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextCurrencyTypeId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextCurrencyTypeId;
        }
        catch (error) {
            console.error('Error generating unique currency type ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueCurrencyTypeId = generateUniqueCurrencyTypeId;
// Generate discount id
function generateUniqueDiscountId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing discount
            const count = yield prisma_1.default.discounts.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextDiscountId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextDiscountId;
        }
        catch (error) {
            console.error('Error generating unique discount ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueDiscountId = generateUniqueDiscountId;
// Generate vat id
function generateUniqueVatId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the count of existing vat
            const count = yield prisma_1.default.vats.count();
            const codeUpperCase = code.toUpperCase();
            // Generate the next unique user ID
            const nextVatId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`;
            return nextVatId;
        }
        catch (error) {
            console.error('Error generating unique vat ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueVatId = generateUniqueVatId;
function generateUniqueBrandId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastBrand = yield prisma_1.default.brands.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastBrand) {
                const lastId = lastBrand.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique brand ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueBrandId = generateUniqueBrandId;
// Supplier sells id generate
// export async function generateUniqueSupplierSellId(
//   code: string,
// ): Promise<string> {
//   try {
//     const codeUpperCase = code.toUpperCase()
//     // Get the last inserted uniqueId that matches the given code
//     const lastSells = await prisma.supplierSell.findFirst({
//       where: {
//         uniqueId: {
//           startsWith: codeUpperCase,
//         },
//       },
//       orderBy: {
//         uniqueId: 'desc',
//       },
//     })
//     let nextNumber = 1
//     if (lastSells) {
//       const lastId = lastSells.uniqueId
//       const lastNumber = parseInt(lastId.split('-')[1], 10)
//       nextNumber = lastNumber + 1
//     }
//     // Generate the next unique supplier sell ID
//     const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`
//     return nextBrandId
//   } catch (error) {
//     console.error('Error generating unique supplier sells ID:', error)
//     throw error
//   }
// }
// Purchase report or invoice id generator
function generateUniqueInvoiceId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastBrand = yield prisma_1.default.purchaseGroup.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastBrand) {
                const lastId = lastBrand.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique brand ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueInvoiceId = generateUniqueInvoiceId;
// Purchase report or invoice id generator
function generateUniquePurchaseId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastBrand = yield prisma_1.default.purchase.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastBrand) {
                const lastId = lastBrand.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique purchase ID:', error);
            throw error;
        }
    });
}
exports.generateUniquePurchaseId = generateUniquePurchaseId;
// Sell unique id generator
function generateUniqueSellId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastBrand = yield prisma_1.default.sells.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastBrand) {
                const lastId = lastBrand.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique sell ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueSellId = generateUniqueSellId;
// Sells report or invoice id generator or Sells unique id generator
function generateUniqueInvoiceGroupId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastDes = yield prisma_1.default.sellGroups.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastDes) {
                const lastId = lastDes.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique sells group ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueInvoiceGroupId = generateUniqueInvoiceGroupId;
// Generate unique id for return
function generateUniqueReturnId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastDes = yield prisma_1.default.returns.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastDes) {
                const lastId = lastDes.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique return ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueReturnId = generateUniqueReturnId;
// Generate unique id for return group
function generateUniqueReturnGroupId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastDes = yield prisma_1.default.returnGroups.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastDes) {
                const lastId = lastDes.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique return ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueReturnGroupId = generateUniqueReturnGroupId;
// Generate unique id for additional expense
function generateUniqueAdditionalExpenseId(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeUpperCase = code.toUpperCase();
            // Get the last inserted uniqueId that matches the given code
            const lastDes = yield prisma_1.default.additionalExpenses.findFirst({
                where: {
                    uniqueId: {
                        startsWith: codeUpperCase,
                    },
                },
                orderBy: {
                    uniqueId: 'desc',
                },
            });
            let nextNumber = 1;
            if (lastDes) {
                const lastId = lastDes.uniqueId;
                const lastNumber = parseInt(lastId.split('-')[1], 10);
                nextNumber = lastNumber + 1;
            }
            // Generate the next unique brand ID
            const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`;
            return nextBrandId;
        }
        catch (error) {
            console.error('Error generating unique ID:', error);
            throw error;
        }
    });
}
exports.generateUniqueAdditionalExpenseId = generateUniqueAdditionalExpenseId;
