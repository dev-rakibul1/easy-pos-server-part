"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const return_controller_1 = require("./return.controller");
const router = express_1.default.Router();
router.post('/return-product', return_controller_1.ReturnController.CreateReturnController);
router.get('/', return_controller_1.ReturnController.GetAllReturnController);
router.get('/get-by-current-date', return_controller_1.ReturnController.GetAllReturnByCurrentDateController);
router.get('/get-by-current-week', return_controller_1.ReturnController.GetAllReturnByCurrentWeekController);
router.get('/get-by-current-month', return_controller_1.ReturnController.GetAllReturnByCurrentMonthController);
router.get('/get-by-current-year', return_controller_1.ReturnController.GetAllReturnByCurrentYearController);
exports.ReturnRoutes = router;
