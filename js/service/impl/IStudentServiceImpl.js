"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IStudentServiceImpl = void 0;
const studentDto_1 = require("../../dto/studentDto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const IGradeServiceImpl_1 = __importDefault(require("./IGradeServiceImpl"));
const pathJson = path_1.default.join(__dirname, "../../../dao/student.json");
class IStudentServiceImpl {
    constructor() {
        this.IGradeService = new IGradeServiceImpl_1.default();
    }
    showAll(gradeId) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const listStudent = [];
        const gradeDto = this.IGradeService.findById(gradeId);
        for (const item of jsonData) {
            if (item.grade_id === gradeId && gradeDto != null) {
                const student = new studentDto_1.StudentDto(item.id, item.name, item.dob, item.gender, item.address, item.phone, item.grade_id, gradeDto.name);
                listStudent.push(student);
            }
        }
        return listStudent;
    }
    // update(id: number, updatedStudent: StudentDto): StudentDto {
    //     const fileData = fs.readFileSync(pathJson, 'utf-8');
    //     const students: Array<StudentDto> = JSON.parse(fileData);
    //     const studentIndex = students.findIndex(student => student.id === id);
    //     if (studentIndex !== -1) {
    //         students[studentIndex] = updatedStudent;
    //         fs.writeFileSync(pathJson, JSON.stringify(students, null, 2), 'utf-8');
    //         console.log("Cập nhật thành công")
    //         return students[studentIndex];
    //     } else {
    //         console.error('Lỗi không tìm thấy học sinh với id = ?');
    //         throw new Error('Lỗi');
    //     }
    // }
    // delete(id: number): StudentDto {
    //     const fileData = fs.readFileSync(pathJson, 'utf-8');
    //     const students: Array<StudentDto> = JSON.parse(fileData);
    //     const studentIndex = students.findIndex(student => student.id === id);
    //     if (studentIndex !== -1) {
    //         const [deletedStudent] = students.splice(studentIndex, 1);
    //         fs.writeFileSync(pathJson, JSON.stringify(students, null, 2));
    //         console.log('Xóa thành công');
    //         return deletedStudent;
    //     } else {
    //         console.log("Lỗi không tìm thấy id");
    //         throw new Error('Sinh viên không tồn tại');
    //     }
    // }
    // addStudent(studentDto: StudentDto): StudentDto{
    //     const fileData = fs.readFileSync(pathJson, 'utf-8');
    //     const students: Array<StudentDto> = JSON.parse(fileData);
    //     const newId = students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
    //     studentDto.id = newId;
    //     students.push(studentDto);
    //     fs.writeFileSync(pathJson, JSON.stringify(students, null, 2));
    //     return studentDto;
    // }
    findStudentDonHaveGrade() {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const listStudent = [];
        for (const item of jsonData) {
            if (item.grade_id == "") {
                const student = new studentDto_1.StudentDto(item.id, item.name, item.dob, item.gender, item.address, item.phone, item.grade_id, "Chưa có lớp");
                listStudent.push(student);
            }
        }
        return listStudent;
    }
    findById(studentId) {
        try {
            const data = fs_1.default.readFileSync(pathJson, 'utf8');
            const listStudentEntity = JSON.parse(data);
            const studentEntity = listStudentEntity.find((student) => student.id === studentId);
            if (studentEntity != undefined) {
                const gradeDto = this.IGradeService.findById(studentEntity.grade_id);
                if (gradeDto != null) {
                    return new studentDto_1.StudentDto(studentEntity.id, studentEntity.name, studentEntity.dob, studentEntity.gender, studentEntity.address, studentEntity.phone, gradeDto.id, gradeDto.name);
                }
            }
            return null;
        }
        catch (err) {
            console.error('Error reading or parsing file:', err);
            throw err;
        }
    }
    updateGradeForStudent(studentDto) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const students = JSON.parse(fileData);
        const studentIndex = students.findIndex(student => student.id === studentDto.id);
        if (studentIndex !== -1) {
            students[studentIndex].grade_id = studentDto.grade_id;
            fs_1.default.writeFileSync(pathJson, JSON.stringify(students, null, 2), 'utf-8');
            return true;
        }
        else {
            console.error('Lỗi không tìm thấy học sinh với id = ?');
            throw new Error('Lỗi');
        }
    }
}
exports.IStudentServiceImpl = IStudentServiceImpl;
exports.default = IStudentServiceImpl;
