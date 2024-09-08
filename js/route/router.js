"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IGradeServiceImpl_1 = __importDefault(require("../service/impl/IGradeServiceImpl"));
const IStudentServiceImpl_1 = __importDefault(require("../service/impl/IStudentServiceImpl"));
const IAttendanceCheckServiceImpl_1 = require("../service/impl/IAttendanceCheckServiceImpl");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { IGradeService } = require('../service/IGradeService');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const gradeService = new IGradeServiceImpl_1.default();
const iAttendanceCheck = new IAttendanceCheckServiceImpl_1.IAttendanceCheckServiceImpl();
app.get('/grade/showAll', (req, res) => {
    try {
        const grades = gradeService.showAll();
        res.json(grades);
    }
    catch (error) {
        console.error('Error fetching grade data:', error);
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});
app.get('/grade/:id', (req, res) => {
    try {
        const gradeId = parseInt(req.params.id, 10);
        const studentService = new IStudentServiceImpl_1.default();
        const students = studentService.showAll(gradeId);
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});
app.put('/updateStudent/:id', (req, res) => {
    try {
        const updatedStudent = req.body;
        const id = parseInt(req.params.id, 10);
        const studentService = new IStudentServiceImpl_1.default();
        const updated = studentService.update(id, updatedStudent);
        if (updated) {
            res.status(200).json({ message: 'Cập nhật thành công!', student: updated });
        }
        else {
            res.status(404).send('Học sinh không tồn tại.');
        }
    }
    catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Có lỗi xảy ra khi cập nhật sinh viên.');
    }
});
app.delete('/deleteStudent/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const studentService = new IStudentServiceImpl_1.default();
        const deleted = studentService.delete(id);
        if (deleted) {
            res.status(200).json({ message: 'Xóa học sinh thành công!', student: deleted });
        }
        else {
            res.status(404).send('Học sinh không tồn tại.');
        }
    }
    catch (error) {
        console.error('Error deleting student:', error);
    }
});
app.post('/createStudent', (req, res) => {
    try {
        const student = req.body;
        const studentService = new IStudentServiceImpl_1.default();
        const createdStudent = studentService.addStudent(student);
        if (createdStudent) {
            res.status(200).json({ message: 'Thêm học sinh thành công!', student: createdStudent });
        }
        else {
            res.status(404).send('Thêm học sinh thất bại.');
        }
    }
    catch (error) {
        console.error('Error creating student:', error);
    }
});
// attendanceCheck
app.get('/attendanceCheck/showAll', (req, res) => {
    try {
        const attendanceCheckDtos = iAttendanceCheck.showAll();
        res.json(attendanceCheckDtos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});
app.post('/created/attendance/:gradeId', (req, res) => {
    try {
        const attend = req.body;
        const gradeId = parseInt(req.params.gradeId, 10);
        const createdAttend = iAttendanceCheck.create(gradeId, attend);
        if (createdAttend) {
            res.status(200).json({ message: 'Thêm điểm danh thành công!', student: createdAttend });
        }
        else {
            res.status(404).send('Thêm điểm danh thất bại.');
        }
    }
    catch (error) {
        console.error('Error creating student:', error);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
