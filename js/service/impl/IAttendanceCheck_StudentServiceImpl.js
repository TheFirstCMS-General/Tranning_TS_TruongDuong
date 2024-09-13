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
const IStudentServiceImpl_1 = require("./IStudentServiceImpl");
const IGradeServiceImpl_1 = __importDefault(require("./IGradeServiceImpl"));
const attendanceCheck_Student_1 = require("../../model/attendanceCheck_Student");
const IAttendanceCheckServiceImpl_1 = require("./IAttendanceCheckServiceImpl");
const IAttendanceCheckStasticServiceImpl_1 = require("./IAttendanceCheckStasticServiceImpl");
const attendanceCheckDto_1 = require("../../dto/attendanceCheckDto");
const studentDto_1 = require("../../dto/studentDto");
const gender_enum_1 = require("../../model/enum/gender_enum");
const attendaneCheckStasticsDto_1 = require("../../dto/attendaneCheckStasticsDto");
const pathJson = path_1.default.join(__dirname, "../../../dao/attendanceCheck_Student.json");
class IAttendanceCheck_StudentServiceImpl {
    constructor() {
        this.iStudent = new IStudentServiceImpl_1.IStudentServiceImpl();
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
        const iAttendanceStasticService = new IAttendanceCheckStasticServiceImpl_1.IAttendanceCheckStasticServiceImpl();
        try {
            const iAttendCheck = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl();
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('điểm danh');
            const worksheetStacstic = workbook.addWorksheet('thống kê');
            const worksheetEng = workbook.addWorksheet('attend');
            const worksheetStacsticEng = workbook.addWorksheet('stastic');
            worksheet.columns = [
                { header: 'Họ tên', key: 'name', width: 25 },
                { header: 'Ngày sinh', key: 'dob', width: 15 },
                { header: 'Giới tính', key: 'gender', width: 10 },
                { header: 'Trạng thái', key: 'status', width: 10 },
                { header: 'Lý do', key: 'description', width: 30 },
            ];
            worksheetEng.columns = [
                { header: 'id', key: 'id', width: 25 },
                { header: 'status', key: 'status', width: 10 },
                { header: 'description', key: 'description', width: 30 },
            ];
            worksheetStacsticEng.columns = [
                { header: 'gradeId', key: 'gradeId', width: 10 },
                { header: 'section', key: 'section', width: 10 },
                { header: 'createdAt', key: 'createdAt', width: 10 },
                { header: 'totalStudents', key: 'totalStudents', width: 25 },
                { header: 'present', key: 'present', width: 10 },
                { header: 'excused', key: 'excused', width: 10 },
                { header: 'late', key: 'late', width: 10 },
                { header: 'unexcused', key: 'unexcused', width: 10 },
            ];
            const idAttend = iAttendCheck.findById(attendanceCheckId);
            const idAttendanceCheckId = iAttendanceStasticService.findById(attendanceCheckId);
            if (idAttend != null && idAttendanceCheckId != null) {
                let currentClassName = '';
                attendanceCheckStudentDtos.forEach((dto, index) => {
                    if (dto.stundentDto.grade_name !== currentClassName) {
                        currentClassName = dto.stundentDto.grade_name;
                        const classRow = worksheetStacstic.addRow([`Lớp: ${currentClassName}`]);
                        const sectionRow = worksheetStacstic.addRow([`Phiên: ${idAttend.section}`]);
                        const dateRow = worksheetStacstic.addRow([`Ngày: ${this.formatDate(idAttend.createdAt)}`]);
                        const totalStudents = worksheetStacstic.addRow([`Sĩ số: ${idAttendanceCheckId.totalStudents}`]);
                        const present = worksheetStacstic.addRow([`Có mặt: ${idAttendanceCheckId.present}`]);
                        const excused = worksheetStacstic.addRow([`Có phép: ${idAttendanceCheckId.excused}`]);
                        const late = worksheetStacstic.addRow([`Muộn : ${idAttendanceCheckId.late}`]);
                        const unexcused = worksheetStacstic.addRow([`Không phép: ${idAttendanceCheckId.unexcused}`]);
                        worksheetStacsticEng.addRow({
                            gradeId: dto.stundentDto.grade_id,
                            section: idAttend.section,
                            createdAt: this.formatDate(idAttend.createdAt),
                            totalStudents: idAttendanceCheckId.totalStudents,
                            present: idAttendanceCheckId.present,
                            excused: idAttendanceCheckId.excused,
                            late: idAttendanceCheckId.late,
                            unexcused: idAttendanceCheckId.unexcused,
                        });
                        if (worksheet.lastRow) {
                            worksheetStacstic.mergeCells(`A${classRow.number}:E${classRow.number}`);
                            worksheetStacstic.mergeCells(`A${sectionRow.number}:E${sectionRow.number}`);
                            worksheetStacstic.mergeCells(`A${dateRow.number}:E${dateRow.number}`);
                            worksheetStacstic.mergeCells(`A${totalStudents.number}:E${totalStudents.number}`);
                            worksheetStacstic.mergeCells(`A${present.number}:E${present.number}`);
                            worksheetStacstic.mergeCells(`A${excused.number}:E${excused.number}`);
                            worksheetStacstic.mergeCells(`A${late.number}:E${late.number}`);
                            worksheetStacstic.mergeCells(`A${unexcused.number}:E${unexcused.number}`);
                        }
                    }
                    worksheet.addRow({
                        name: dto.stundentDto.name,
                        dob: dto.stundentDto.dob,
                        gender: dto.stundentDto.gender,
                        status: dto.status,
                        description: dto.description,
                    });
                    worksheetEng.addRow({
                        id: dto.stundentDto.id,
                        status: dto.status,
                        description: dto.description,
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
    formatDate(date) {
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    importExcel(filePath) {
        try {
            const workbook = xlsx_1.default.readFile(filePath);
            const worksheetStudent = workbook.Sheets["attend"];
            const worksheetAttend = workbook.Sheets["stastic"];
            const data = [xlsx_1.default.utils.sheet_to_json(worksheetStudent), xlsx_1.default.utils.sheet_to_json(worksheetAttend)];
            return data;
        }
        catch (error) {
            console.error('Error importing data:', error);
            throw error;
        }
    }
    importData(filePath) {
        try {
            const newData = this.importExcel(filePath);
            const attendCheckService = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl;
            const gradeId = newData[1][0].gradeId;
            const createdAt = newData[1][0].createdAt;
            const present = parseInt(newData[1][0].present);
            const excused = parseInt(newData[1][0].excused);
            const late = parseInt(newData[1][0].late);
            const unexcused = parseInt(newData[1][0].unexcused);
            const section = newData[1][0].section;
            const attendanceCheckDto = attendCheckService.create(gradeId, new attendanceCheckDto_1.AttendanceCheckDto(0, createdAt, section, 0, ""));
            const attendCheckStasticService = new IAttendanceCheckStasticServiceImpl_1.IAttendanceCheckStasticServiceImpl();
            if (attendanceCheckDto !== null) {
                let arrAttendaceCheckStudent = [];
                for (const student of newData[0]) {
                    let studentId = student.id;
                    let status = student.status;
                    let description = student.description;
                    const attendaceCheckStudentDto = new attendanceCheck_StudentDto_1.AttendanceCheck_StudentDto(0, attendanceCheckDto.id, status, description, new studentDto_1.StudentDto(studentId, "", new Date("1/1/1111"), gender_enum_1.Gender.Female, "", "", 0, ""));
                    arrAttendaceCheckStudent.push(attendaceCheckStudentDto);
                }
                this.updateByStudentId(attendanceCheckDto.id, arrAttendaceCheckStudent);
                attendCheckStasticService.countAttendanceCheck(attendanceCheckDto.id, new attendaneCheckStasticsDto_1.AttendanceCheckStasticsDto(0, 0, present, excused, late, unexcused, new attendanceCheckDto_1.AttendanceCheckDto(0, new Date("1/1/1111"), "", 0, "")));
            }
            console.log('Thành công');
        }
        catch (e) {
            console.log("err");
        }
    }
    updateByStudentId(attendanceCheckId, attendanceCheckStudentDtos) {
        try {
            const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const filterData = jsonData.filter((attend) => attend.attendanceCheckId === attendanceCheckId);
            if (filterData.length > 0) {
                const updatedItems = [];
                attendanceCheckStudentDtos.forEach(dto => {
                    const index = jsonData.findIndex((attend) => attend.studentId === dto.stundentDto.id && attend.attendanceCheckId === attendanceCheckId);
                    if (index !== -1) {
                        jsonData[index].status = dto.status;
                        jsonData[index].description = dto.description;
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
}
exports.IAttendanceCheck_StudentServiceImpl = IAttendanceCheck_StudentServiceImpl;
