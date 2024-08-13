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
exports.mailSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const sellEmailTemplete_1 = require("../utilities/mailTamplete/sellEmailTemplete");
const subject = 'Your Recent Purchase Invoice from Track For Creativity LLC';
const mailSend = (sales) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const customerEmail = (_b = (_a = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.email;
    console.log('email from mail send file', customerEmail);
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config_1.default.email,
            pass: config_1.default.appKey,
        },
    });
    // send mail with defined transport object
    yield transporter.sendMail({
        from: config_1.default.email, // sender address
        to: customerEmail, // list of receivers
        subject: subject, // Subject line
        text: 'Hello world?', // plain text body
        html: (0, sellEmailTemplete_1.generateSalesEmailContent)(sales), // html body
    });
});
exports.mailSend = mailSend;
