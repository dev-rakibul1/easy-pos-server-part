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
exports.databaseConnect = void 0;
const safe_1 = __importDefault(require("colors/safe"));
const config_1 = __importDefault(require("../config/config"));
const index_1 = require("../index");
let server;
const databaseConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(safe_1.default.bgMagenta('Database is connected!'));
        server = index_1.app.listen(config_1.default.port, () => {
            console.log(safe_1.default.bgGreen(`Our server listen port is: ${config_1.default.port}`));
        });
    }
    catch (error) {
        console.log('Unable to connect to the database:', error);
    }
});
exports.databaseConnect = databaseConnect;
process.on('unhandledRejection', error => {
    if (server) {
        server.close(() => {
            console.log(error);
            process.exit(1);
        });
    }
    else {
        process.exit(2);
    }
});
process.on('SIGTERM', () => {
    console.log('SIGTERM is received!');
    if (server) {
        server.close();
    }
});
