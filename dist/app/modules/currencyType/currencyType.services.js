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
exports.CurrencyTypeService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const uniqueIdGenerator_1 = require("../../../utilities/uniqueIdGenerator");
// Create currency type service
const CreateCurrencyTypeService = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const CurrencyTypeId = yield (0, uniqueIdGenerator_1.generateUniqueCurrencyTypeId)('cti');
    payloads.uniqueId = CurrencyTypeId;
    const CurrencyCreate = yield prisma_1.default.currencyType.create({
        data: payloads,
    });
    return CurrencyCreate;
});
// get all currency type
const GetAllCurrencyTypeService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.currencyType.findMany({});
    return result;
});
// get all currency type
const UpdateCurrencyTypeService = (id, payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.currencyType.findUnique({ where: { id: id } });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid currency.');
    }
    const result = yield prisma_1.default.currencyType.update({
        where: { id: id },
        data: payloads,
    });
    return result;
});
exports.CurrencyTypeService = {
    CreateCurrencyTypeService,
    GetAllCurrencyTypeService,
    UpdateCurrencyTypeService,
};
