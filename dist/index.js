"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logt_1 = __importDefault(require("./lib/logt"));
if (window) {
    window['logt'] = logt_1.default;
}
exports.default = logt_1.default;
