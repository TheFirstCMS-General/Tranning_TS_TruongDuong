import { StudentEntity } from "./studentEntity";
import { AttendanceCheckEntity } from "./attendanceCheckEntity";
export class AttendanceCheckStudentEntity {
    private id: number;
    private attendanceCheckId: number;
    private status: string;
    private studentId: number;
    private description:string

    constructor(id: number, attendanceCheckId: number, status: string, studentId: number,description:string) {
        this.id = id;
        this.attendanceCheckId = attendanceCheckId;
        this.status = status;
        this.studentId = studentId;
        this.description = description;
    }


}