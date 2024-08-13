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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniquePurchaseIds = void 0;
const uniqueIdGenerator_1 = require("../uniqueIdGenerator");
const generateUniqueId = (prefix, count, length) => {
    return `${prefix}-${String(count).padStart(length - prefix.length, '0')}`;
};
const generateUniquePurchaseIds = (prefix, numIds) => __awaiter(void 0, void 0, void 0, function* () {
    const currentNumber = yield (0, uniqueIdGenerator_1.generateUniquePurchaseId)('PUR');
    const numberPart = currentNumber.split('-')[1];
    // @ts-ignore
    let lastPurchaseCount = parseInt(numberPart - 1);
    const uniqueIds = [];
    for (let i = 1; i <= numIds; i++) {
        lastPurchaseCount++;
        const uniqueId = generateUniqueId(prefix, lastPurchaseCount, 8);
        uniqueIds.push(uniqueId);
    }
    return uniqueIds;
});
exports.generateUniquePurchaseIds = generateUniquePurchaseIds;
