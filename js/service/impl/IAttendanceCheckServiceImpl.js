"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAttendanceCheckServiceImpl = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const attendanceCheckDto_1 = require("../../dto/attendanceCheckDto");
const pathJson = path_1.default.join(__dirname, "../../../dao/attendanceCheck.json");
class IAttendanceCheckServiceImpl {
    showAll() {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttend = [];
            for (const item of jsonData) {
                const attend = new attendanceCheckDto_1.AttendanceCheckDto(item.id, new Date(item.createdAt), item.section, item.gradeId);
                listAttend.push(attend);
            }
            return listAttend;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    create(gradeId, attendanceCheckDto) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const newId = jsonData.length > 0 ? Math.max(...jsonData.map((data) => data.id)) + 1 : 1;
        attendanceCheckDto.id = newId;
        attendanceCheckDto.gradeId = gradeId;
        const idGrade = jsonData.find((grade) => grade.id === gradeId);
        if (!idGrade) {
            console.log("Lỗi");
            return null;
        }
        jsonData.push(attendanceCheckDto);
        fs_1.default.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));
        return attendanceCheckDto;
    }
}
exports.IAttendanceCheckServiceImpl = IAttendanceCheckServiceImpl;
