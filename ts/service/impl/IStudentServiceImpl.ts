import {IStudentService} from "../IStudentService";
import {StudentDto} from "../../dto/studentDto";
import {GradeDto} from "../../dto/gradeDto";
import fs from "fs";

export interface IStudentServiceImpl implements IStudentService {
    showAll(gradeId: number): Array<StudentDto>;
}