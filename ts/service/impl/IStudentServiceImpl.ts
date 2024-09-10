import { IStudentService } from "../IStudentService";
import { StudentDto } from "../../dto/studentDto";
import fs from 'fs';
import path from 'path';
import {GradeDto} from "../../dto/gradeDto";
import {IGradeService} from "../IGradeService";
import IGradeServiceImpl from "./IGradeServiceImpl";
import {GradeEntity} from "../../model/gradeEntity";
import {StudentEntity} from "../../model/studentEntity";

const pathJson = path.join(__dirname, "../../../dao/student.json");

export class IStudentServiceImpl implements IStudentService {
    private IGradeService: IGradeService = new IGradeServiceImpl();

    showAll(gradeId: number): Array<StudentDto> {
        const fileData = fs.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const listStudent: Array<StudentDto> = [];
        const gradeDto = this.IGradeService.findById(gradeId);

        for (const item of jsonData) {
            if (item.grade_id === gradeId && gradeDto != null) {
                const student = new StudentDto(item.id, item.name,item.dob,
                    item.gender,item.address, item.phone,item.grade_id,gradeDto.name);
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

    findStudentDonHaveGrade(): Array<StudentDto> {
        const fileData = fs.readFileSync(pathJson, 'utf-8');
        const jsonData = JSON.parse(fileData);
        const listStudent: Array<StudentDto> = [];

        for (const item of jsonData) {
            if (item.grade_id == "") {
                const student = new StudentDto(item.id, item.name,item.dob,
                    item.gender,item.address, item.phone,item.grade_id,"Chưa có lớp");
                listStudent.push(student);
            }
        }

        return listStudent;
    }

    findById(studentId: number): StudentDto | null {
        try {
            const data = fs.readFileSync(pathJson, 'utf8');
            const listStudentEntity: Array<StudentEntity> = JSON.parse(data);
            const studentEntity = listStudentEntity.find((student: StudentEntity) => student.id === studentId);

            if (studentEntity != undefined) {

                const gradeDto = this.IGradeService.findById(studentEntity.grade_id);
                if (gradeDto != null){
                    return new StudentDto(studentEntity.id, studentEntity.name, studentEntity.dob, studentEntity.gender, studentEntity.address, studentEntity.phone, gradeDto.id, gradeDto.name);
                }
            }

            return null;

        } catch (err) {
            console.error('Error reading or parsing file:', err);
            throw err;
        }
    }

    updateGradeForStudent(studentDto : StudentDto): any {
        const fileData = fs.readFileSync(pathJson, 'utf-8');
        const students: Array<StudentEntity> = JSON.parse(fileData);
        const studentIndex = students.findIndex(student => student.id === studentDto.id);
        if (studentIndex !== -1) {
            students[studentIndex].grade_id = studentDto.grade_id;
            fs.writeFileSync(pathJson, JSON.stringify(students, null, 2), 'utf-8');
            return true;
        } else {
            console.error('Lỗi không tìm thấy học sinh với id = ?');
            throw new Error('Lỗi');
        }
    }
}

export default IStudentServiceImpl;
