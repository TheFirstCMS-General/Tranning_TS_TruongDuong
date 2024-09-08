"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IStudentServiceImpl = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathJson = path_1.default.join(__dirname, "../../../dao/student.json");
class IStudentServiceImpl {
    showAll(gradeId) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const students = JSON.parse(fileData);
        const studentFilter = students.filter(student => student.grade_id === gradeId);
        return studentFilter;
    }
    update(id, updatedStudent) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const students = JSON.parse(fileData);
        const studentIndex = students.findIndex(student => student.id === id);
        if (studentIndex !== -1) {
            students[studentIndex] = updatedStudent;
            fs_1.default.writeFileSync(pathJson, JSON.stringify(students, null, 2), 'utf-8');
            console.log("Cập nhật thành công");
            return students[studentIndex];
        }
        else {
            console.error('Lỗi không tìm thấy học sinh với id = ?');
            throw new Error('Lỗi');
        }
    }
    delete(id) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const students = JSON.parse(fileData);
        const studentIndex = students.findIndex(student => student.id === id);
        if (studentIndex !== -1) {
            const [deletedStudent] = students.splice(studentIndex, 1);
            fs_1.default.writeFileSync(pathJson, JSON.stringify(students, null, 2));
            console.log('Xóa thành công');
            return deletedStudent;
        }
        else {
            console.log("Lỗi không tìm thấy id");
            throw new Error('Sinh viên không tồn tại');
        }
    }
    addStudent(studentDto) {
        const fileData = fs_1.default.readFileSync(pathJson, 'utf-8');
        const students = JSON.parse(fileData);
        const newId = students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
        studentDto.id = newId;
        students.push(studentDto);
        fs_1.default.writeFileSync(pathJson, JSON.stringify(students, null, 2));
        return studentDto;
    }
}
exports.IStudentServiceImpl = IStudentServiceImpl;
exports.default = IStudentServiceImpl;
