"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGradeServiceImpl = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathJson = path_1.default.join(__dirname, "../../../dao/grade.json");
class IGradeServiceImpl {
    showAll() {
        try {
            const data = fs_1.default.readFileSync(pathJson, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (err) {
            console.error('Error reading or parsing file:', err);
            throw err;
        }
    }
}
exports.IGradeServiceImpl = IGradeServiceImpl;
exports.default = IGradeServiceImpl;
