"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYLOADS = exports.ENUM_USER_ROLE = void 0;
var ENUM_USER_ROLE;
(function (ENUM_USER_ROLE) {
    ENUM_USER_ROLE["SUPER_ADMIN"] = "super_admin";
    ENUM_USER_ROLE["ADMIN"] = "admin";
    ENUM_USER_ROLE["CONTENT_MANAGER"] = "content_manager";
    ENUM_USER_ROLE["MARKETING_MANAGER"] = "marketing_manager";
    ENUM_USER_ROLE["USER"] = "user";
    ENUM_USER_ROLE["MODERATOR"] = "moderator";
})(ENUM_USER_ROLE || (exports.ENUM_USER_ROLE = ENUM_USER_ROLE = {}));
var PAYLOADS;
(function (PAYLOADS) {
    PAYLOADS["DEFAULT_USER_PASSWORD"] = "user12345";
    PAYLOADS[PAYLOADS["PASSWORD_SALT_ROUND"] = 12] = "PASSWORD_SALT_ROUND";
    PAYLOADS["ACCESS_TOKEN"] = "asd5fsd5asd5f4as5fd46as46sa4f6sa4f6as4fas6df4as6d4f6as4f6as4f6as4f6sad4f6sad46sd";
    PAYLOADS["REFRESH_TOKEN"] = "asd5fsd5asd5f4as5fd46as46sa4f6sa4fAS4F6SD4SD464S4a5s4sd6sad4f6sad46sd";
    PAYLOADS["REFRESH_TOKEN_EXPIRE_IN"] = "90d";
    PAYLOADS["ACCESS_TOKEN_EXPIRE_IN"] = "1d";
})(PAYLOADS || (exports.PAYLOADS = PAYLOADS = {}));
