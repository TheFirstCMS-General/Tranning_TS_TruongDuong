"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAttendanceCheckStasticServiceImpl = void 0;
const attendaneCheckStasticsDto_1 = require("../../dto/attendaneCheckStasticsDto");
const IAttendanceCheckServiceImpl_1 = require("./IAttendanceCheckServiceImpl");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathJson = path_1.default.join(__dirname, "../../../dao/attendaneCheckStastics.json");
class IAttendanceCheckStasticServiceImpl {
    constructor() {
        this.IAttendanceCheckService = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl();
    }
    showAll() {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttendanceCheckStastics = [];
            for (const item of jsonData) {
                const attendanceCheckDto = this.IAttendanceCheckService.findById(item.attendanceCheck_id);
                if (attendanceCheckDto != null) {
                    const attendanceCheckStaticsDto = new attendaneCheckStasticsDto_1.AttendanceCheckStasticsDto(item.id, item.totalStudents, item.present, item.excused, item.late, item.unexcused, attendanceCheckDto);
                    listAttendanceCheckStastics.push(attendanceCheckStaticsDto);
                }
            }
            return listAttendanceCheckStastics;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    findById(id) {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const attendanceCheckEntity = jsonData.find((attendanceCheck) => attendanceCheck.id === id);
            if (attendanceCheckEntity != null) {
                const attendanceCheckDto = this.IAttendanceCheckService.findById(id);
                if (attendanceCheckDto != null) {
                    const attendanceCheckStaticsDto = new attendaneCheckStasticsDto_1.AttendanceCheckStasticsDto(attendanceCheckEntity.id, attendanceCheckEntity.totalStudents, attendanceCheckEntity.present, attendanceCheckEntity.excused, attendanceCheckEntity.late, attendanceCheckEntity.unexcused, attendanceCheckDto);
                    return attendanceCheckStaticsDto;
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
exports.IAttendanceCheckStasticServiceImpl = IAttendanceCheckStasticServiceImpl;
