"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAttendanceCheck_StudentServiceImpl = void 0;
const attendanceCheck_StudentDto_1 = require("../../dto/attendanceCheck_StudentDto");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const IStudentServiceImpl_1 = __importDefault(require("./IStudentServiceImpl"));
const IGradeServiceImpl_1 = __importDefault(require("./IGradeServiceImpl"));
const attendanceCheck_Student_1 = require("../../model/attendanceCheck_Student");
const pathJson = path_1.default.join(__dirname, "../../../dao/attendanceCheck_Student.json");
class IAttendanceCheck_StudentServiceImpl {
    constructor() {
        this.iStudent = new IStudentServiceImpl_1.default();
        this.IGradeService = new IGradeServiceImpl_1.default();
    }
    showAll(attendaceId) {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttend = [];
            for (const item of jsonData) {
                const studentDto = this.iStudent.findById(item.studentId);
                if (item.attendanceCheckId === attendaceId && studentDto != null) {
                    const attenCheckStudent = new attendanceCheck_StudentDto_1.AttendanceCheck_StudentDto(item.id, item.attendanceCheckId, item.status, item.description, studentDto);
                    listAttend.push(attenCheckStudent);
                }
            }
            return listAttend;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    create(attendanceId, studentId) {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const newId = jsonData.length > 0 ? jsonData.length + 1 : 1;
            const attendanceCheckStudentEntity = new attendanceCheck_Student_1.AttendanceCheckStudentEntity(newId, attendanceId, "", studentId, "");
            jsonData.push(attendanceCheckStudentEntity);
            fs_1.default.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
}
exports.IAttendanceCheck_StudentServiceImpl = IAttendanceCheck_StudentServiceImpl;
