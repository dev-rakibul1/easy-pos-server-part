"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableQuery = exports.userFilterableKey = exports.emailRegex = exports.UserRoleEnum = void 0;
exports.UserRoleEnum = [
    'super_admin',
    'admin',
    'user',
    'moderator',
    'content_manager',
    'marketing_manager',
];
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.userFilterableKey = [
    'firstName',
    'middleName',
    'lastName',
    'email',
    'gender',
    'uniqueId',
    'nid',
];
exports.userFilterableQuery = [
    'searchTerm',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'gender',
    'role',
    'uniqueId',
    'nid',
];
