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
const attendanceCheckStasticsEntity_1 = require("../../model/attendanceCheckStasticsEntity");
const pathJson = path_1.default.join(__dirname, "../../../dao/attendaneCheckStastics.json");
class IAttendanceCheckStasticServiceImpl {
    showAll() {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttendanceCheckStastics = [];
            const IAttendanceCheckService = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl();
            for (const item of jsonData) {
                const attendanceCheckDto = IAttendanceCheckService.findById(item.attendanceCheck_id);
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
            const IAttendanceCheckService = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl();
            if (attendanceCheckEntity != null) {
                const attendanceCheckDto = IAttendanceCheckService.findById(id);
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
    create(attendanceCheckStasticsto) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const newId = jsonData.length > 0 ? Math.max(...jsonData.map((data) => data.id)) + 1 : 1;
        const attendanceCheckStasticsEntity = new attendanceCheckStasticsEntity_1.AttendanceCheckStasticsEntity(newId, attendanceCheckStasticsto.totalStudents, attendanceCheckStasticsto.present, attendanceCheckStasticsto.excused, attendanceCheckStasticsto.late, attendanceCheckStasticsto.unexcused, attendanceCheckStasticsto.attendanceCheckDto.id);
        jsonData.push(attendanceCheckStasticsEntity);
        fs_1.default.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));
    }
    countAttendanceCheck(attendId, data) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const attendIndex = jsonData.findIndex((attend) => attend.id === attendId);
        if (attendIndex !== -1) {
            jsonData[attendIndex].present = data.present;
            jsonData[attendIndex].excused = data.excused;
            jsonData[attendIndex].late = data.late;
            jsonData[attendIndex].unexcused = data.unexcused;
            fs_1.default.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2), 'utf-8');
            return jsonData[attendIndex];
        }
        else {
            console.error('Lỗi không tìm thấy học sinh với id = ?');
            throw new Error('Lỗi');
        }
    }
}
exports.IAttendanceCheckStasticServiceImpl = IAttendanceCheckStasticServiceImpl;
