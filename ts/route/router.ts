import IGradeServiceImpl from "../service/impl/IGradeServiceImpl";
import IStudentServiceImpl from "../service/impl/IStudentServiceImpl";
import {IAttendanceCheckServiceImpl} from "../service/impl/IAttendanceCheckServiceImpl";
import {IAttendanceCheck_StudentServiceImpl} from "../service/impl/IAttendanceCheck_StudentServiceImpl";
import {IAttendanceCheckStasticServiceImpl} from "../service/impl/IAttendanceCheckStasticServiceImpl";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {IGradeService} = require('../service/IGradeService')
const path = require('path');
const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const gradeService = new IGradeServiceImpl()
const iAttendanceCheck = new IAttendanceCheckServiceImpl();
const studentService = new IStudentServiceImpl();
const iAttendanceCheck_Student = new IAttendanceCheck_StudentServiceImpl()
const iAttendanceCheckStatics = new IAttendanceCheckStasticServiceImpl()

app.get('/grade/showAll', (req:any, res:any) => {
    try {
        const grades = gradeService.showAll();
        res.json(grades);
    } catch (error) {
        console.error('Error fetching grade data:', error);
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});


app.get('/grade/findById/:gradeId', (req: any, res: any) => {
    try {
        const gradeId = parseInt(req.params.gradeId, 10);
        const grade = gradeService.findById(gradeId);

        res.json(grade);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching.' });
    }
});

app.get('/student/findStudentDonHaveGrade', (req: any, res: any) => {
    try {
        const students = studentService.findStudentDonHaveGrade();

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});
app.get('/student/showAll/:gradeId', (req: any, res: any) => {
    try {
        const gradeId = parseInt(req.params.gradeId, 10);
        const students = studentService.showAll(gradeId);

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});

app.put('/updateStudent/:id', (req: any, res: any) => {
    try {
        const updatedStudent = req.body;
        const id = parseInt(req.params.id, 10);
        const updated = studentService.update(id, updatedStudent);
        if (updated) {
            res.status(200).json({ message: 'Cập nhật thành công!', student: updated });
        } else {
            res.status(404).send('Học sinh không tồn tại.');
        }
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Có lỗi xảy ra khi cập nhật sinh viên.');
    }
});
// app.delete('/deleteStudent/:id', (req:any, res:any) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         const studentService = new IStudentServiceImpl()
//         const deleted = studentService.delete(id);
//         if (deleted){
//             res.status(200).json({ message: 'Xóa học sinh thành công!', student: deleted });
//         } else {
//             res.status(404).send('Học sinh không tồn tại.');
//         }
//     }catch (error) {
//         console.error('Error deleting student:', error);
//
//     }
// })
// app.post('/createStudent', (req:any, res:any) => {
//     try {
//         const student = req.body;
//         const createdStudent = studentService.addStudent(student);
//         if (createdStudent){
//             res.status(200).json({ message: 'Thêm học sinh thành công!', student: createdStudent });
//         } else {
//             res.status(404).send('Thêm học sinh thất bại.');
//         }
//     }catch (error) {
//         console.error('Error creating student:', error);
//     }
// })

app.put('/student/updateGradeForStudent', (req: any, res: any) => {
    try {
        const updatedStudent = req.body;
        const updated = studentService.updateGradeForStudent(updatedStudent);
        if (updated) {
            res.status(200).json({ message: 'Cập nhật thành công!', student: updated });
        } else {
            res.status(404).send('Học sinh không tồn tại.');
        }
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Có lỗi xảy ra khi cập nhật sinh viên.');
    }
});

app.get('/student/findById/:studentId', (req: any, res: any) => {
    try {
        const studentId = parseInt(req.params.studentId, 10);
        const student = studentService.findById(studentId);

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching.' });
    }
});
// attendanceCheck

app.get('/attendanceCheck/showAll', (req: any, res: any) => {
    try {
        const attendanceCheckDtos = iAttendanceCheck.showAll();
        res.json(attendanceCheckDtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});
app.post('/created/attendance/:gradeId', (req:any, res:any) => {
    try {
        const attend = req.body;
        const gradeId = parseInt(req.params.gradeId, 10);
        const createdAttend = iAttendanceCheck.create(gradeId,attend);
        if (createdAttend){
            res.status(200).json({ message: 'Thêm điểm danh thành công!', student: createdAttend });
        } else {
            res.status(404).send('Thêm điểm danh thất bại.');
        }
    }catch (error) {
        console.error('Error creating student:', error);
    }
})


//IAttendanceCheck_Student

app.get('/attendanceCheck_Student/showAll/:attendaceCheckId', (req: any, res: any) => {
    try {
        const attendCheckId = parseInt(req.params.attendaceCheckId, 10);
        const attendanceCheckStudentDtos = iAttendanceCheck_Student.showAll(attendCheckId);

        res.json(attendanceCheckStudentDtos);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});
app.put('/attendanceCheck_Student/update/:attendanceCheckId', (req: any, res: any) => {
    try {
        const attendanceCheckId = parseInt(req.params.attendanceCheckId, 10);
        const attendanceCheckStudentDtos = req.body;

        const updated = iAttendanceCheck_Student.updateByAttendanceCheckId(attendanceCheckId, attendanceCheckStudentDtos);

        if (updated) {
            res.status(200).json({ message: 'Cập nhật thành công!', students: updated });
        } else {
            res.status(404).send('Không tìm thấy id với attendanceCheckId.');
        }
    } catch (err) {
        console.error('Error updating students:', err);
        res.status(500).send('Có lỗi xảy ra khi cập nhật.');
    }
});

//AttendanceCheckStatics
app.get('/attendanceCheckStatics/showAll', (req :any, res :any) => {
    try {
        const attendance = iAttendanceCheckStatics.showAll();
        res.json(attendance);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching.' });
    }
});
app.get('/attendanceCheckStatics/findById/:id', (req: any, res: any) => {
    try {
        const id = parseInt(req.params.id, 10);
        const student = iAttendanceCheckStatics.findById(id);

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching.' });
    }
});
app.get('/export-students/:attendanceCheckId', async (req: any, res: any) => {
    try {
        const attendanceCheckId = parseInt(req.params.attendanceCheckId);
        const attendanceCheckStudentDtos = await iAttendanceCheck_Student.showAll(attendanceCheckId);
        if (attendanceCheckStudentDtos.length === 0) {
            return res.status(404).send('Không tìm thấy dữ liệu');
        }
        const filePath = await iAttendanceCheck_Student.exportExcel(attendanceCheckId, attendanceCheckStudentDtos);
        if (filePath) {
            res.download(filePath, `attendance_${attendanceCheckId}.xlsx`, (err: any) => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            res.status(500).send('Lỗi trong quá trình xuất file Excel.');
        }
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
