import {StudentDto} from "../dto/studentDto";
import {GradeDto} from "../dto/gradeDto";

export interface IStudentService {
    showAll(gradeId: number): Array<StudentDto>;
    // update(id: number, updatedStudent: StudentDto): StudentDto;
    // delete(id: number): StudentDto;
    // addStudent(studentDto: StudentDto): StudentDto;
    findStudentDonHaveGrade(): Array<StudentDto>;
    findById(studentId: number): StudentDto  | null;
    updateGradeForStudent(studentDto : StudentDto): any;
}
