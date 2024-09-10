"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAttendanceCheckServiceImpl = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const attendanceCheckDto_1 = require("../../dto/attendanceCheckDto");
const IGradeServiceImpl_1 = __importDefault(require("./IGradeServiceImpl"));
const IStudentServiceImpl_1 = __importDefault(require("./IStudentServiceImpl"));
const IAttendanceCheck_StudentServiceImpl_1 = require("./IAttendanceCheck_StudentServiceImpl");
const attendaneCheckStasticsDto_1 = require("../../dto/attendaneCheckStasticsDto");
const IAttendanceCheckStasticServiceImpl_1 = require("./IAttendanceCheckStasticServiceImpl");
const pathJson = path_1.default.join(__dirname, "../../../dao/attendanceCheck.json");
class IAttendanceCheckServiceImpl {
    constructor() {
        this.IGradeService = new IGradeServiceImpl_1.default();
        this.IStudent = new IStudentServiceImpl_1.default();
        this.IAttendanceCheckStudentService = new IAttendanceCheck_StudentServiceImpl_1.IAttendanceCheck_StudentServiceImpl();
        this.IAttendanceCheckStasticsService = new IAttendanceCheckStasticServiceImpl_1.IAttendanceCheckStasticServiceImpl();
    }
    showAll() {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttend = [];
            for (const item of jsonData) {
                const gradeDto = this.IGradeService.findById(item.gradeId);
                if (gradeDto != null) {
                    const attend = new attendanceCheckDto_1.AttendanceCheckDto(item.id, new Date(item.createdAt), item.section, item.gradeId, gradeDto.name);
                    listAttend.push(attend);
                }
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
        jsonData.push(attendanceCheckDto);
        fs_1.default.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));
        const listStudent = this.IStudent.showAll(gradeId);
        if (listStudent != null) {
            for (const item of listStudent) {
                this.IAttendanceCheckStudentService.create(newId, item.id);
            }
        }
        const attendanceCheckStasticsDto = new attendaneCheckStasticsDto_1.AttendanceCheckStasticsDto(1, listStudent.length, 0, 0, 0, 0, attendanceCheckDto);
        this.IAttendanceCheckStasticsService.create(attendanceCheckStasticsDto);
        return attendanceCheckDto;
    }
    findById(id) {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const attendanceCheckEntity = jsonData.find((attendanceCheck) => attendanceCheck.id === id);
            if (attendanceCheckEntity != null) {
                const gradeDto = this.IGradeService.findById(attendanceCheckEntity.gradeId);
                if (gradeDto != null) {
                    const attendanceCheckDto = new attendanceCheckDto_1.AttendanceCheckDto(attendanceCheckEntity.id, attendanceCheckEntity.createdAt, attendanceCheckEntity.section, attendanceCheckEntity.gradeId, gradeDto.name);
                    return attendanceCheckDto;
                }
            }
            return null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
}
exports.IAttendanceCheckServiceImpl = IAttendanceCheckServiceImpl;
