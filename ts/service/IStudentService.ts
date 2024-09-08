import {StudentDto} from "../dto/studentDto";

export interface IStudentService {
    showAll(gradeId: number): Array<StudentDto>;
    update(id: number, updatedStudent: StudentDto): StudentDto;
    delete(id: number): StudentDto;
    addStudent(studentDto: StudentDto): StudentDto;
}
