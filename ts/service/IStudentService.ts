import {StudentDto} from "../dto/studentDto";

export interface IStudentService {
    showAll(gradeId: number): Array<StudentDto>;
}
