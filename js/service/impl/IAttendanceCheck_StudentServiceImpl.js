"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAttendanceCheck_StudentServiceImpl = void 0;
const attendanceCheck_StudentDto_1 = require("../../dto/attendanceCheck_StudentDto");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const exceljs_1 = __importDefault(require("exceljs"));
const IStudentServiceImpl_1 = __importDefault(require("./IStudentServiceImpl"));
const IGradeServiceImpl_1 = __importDefault(require("./IGradeServiceImpl"));
const attendanceCheck_Student_1 = require("../../model/attendanceCheck_Student");
const IAttendanceCheckServiceImpl_1 = require("./IAttendanceCheckServiceImpl");
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
    updateByAttendanceCheckId(attendanceCheckId, attendanceCheckStudentDtos) {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const filterData = jsonData.filter(attend => attend.attendanceCheckId === attendanceCheckId);
            if (filterData.length > 0) {
                const updatedItems = [];
                attendanceCheckStudentDtos.forEach(dto => {
                    const index = jsonData.findIndex(attend => attend.id === dto.id && attend.attendanceCheckId === attendanceCheckId);
                    if (index !== -1) {
                        jsonData[index] = dto;
                        updatedItems.push(jsonData[index]);
                    }
                });
                fs_1.default.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2), 'utf-8');
                console.log("Cập nhật thành công");
                return updatedItems;
            }
            else {
                console.error('Không tìm thấy id của attendanceCheckId = ' + attendanceCheckId);
                throw new Error('Lỗi');
            }
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
    exportExcel(attendanceCheckId, attendanceCheckStudentDtos) {
        try {
            const iAttendCheck = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl();
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('Attendance');
            worksheet.columns = [
                { header: 'Lớp', key: 'className', width: 15 },
                { header: 'Họ tên', key: 'name', width: 25 },
                { header: 'Ngày sinh', key: 'dob', width: 15 },
                { header: 'Giới tính', key: 'gender', width: 10 },
                { header: 'Trạng thái', key: 'status', width: 10 },
                { header: 'Lý do', key: 'description', width: 30 },
                { header: 'Phiên', key: 'section', width: 30 },
                { header: 'Ngày', key: 'createdAt', width: 30 },
            ];
            const idAttend = iAttendCheck.findById(attendanceCheckId);
            if (idAttend != null) {
                attendanceCheckStudentDtos.forEach(dto => {
                    worksheet.addRow({
                        className: dto.stundentDto.grade_name,
                        name: dto.stundentDto.name,
                        dob: dto.stundentDto.dob,
                        gender: dto.stundentDto.gender,
                        status: dto.status,
                        description: dto.description,
                        section: idAttend.section,
                        createdAt: idAttend.createdAt,
                    });
                });
            }
            const exportPath = path_1.default.join(__dirname, 'students_list.xlsx');
            return workbook.xlsx.writeFile(exportPath).then(() => {
                return exportPath;
            });
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    importExcel(filePath) {
        try {
            const workbook = xlsx_1.default.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx_1.default.utils.sheet_to_json(worksheet);
            return data;
        }
        catch (error) {
            console.error('Lỗi đọc file:', error);
            throw error;
        }
    }
    importData(filePath) {
        try {
            console.log('Thành công');
        }
        catch (error) {
            console.error('Error importing data:', error);
            throw error;
        }
    }
}
exports.IAttendanceCheck_StudentServiceImpl = IAttendanceCheck_StudentServiceImpl;
