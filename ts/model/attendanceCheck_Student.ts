import { StudentEntity } from "./studentEntity";
import { AttendanceCheckEntity } from "./attendanceCheckEntity";
export class AttendanceCheckStudentEntity {
    private id: number;
    private student: StudentEntity;
    private attendanceCheck: AttendanceCheckEntity;
    private status: string;

    constructor(id: number, student: StudentEntity, attendanceCheck: AttendanceCheckEntity, status: string) {
        this.id = id;
        this.student = student;
        this.attendanceCheck = attendanceCheck;
        this.status = status;
    }
    public getId(): number {
        return this.id;
    }

    public getStudent(): StudentEntity {
        return this.student;
    }

    public getAttendanceCheck(): AttendanceCheckEntity {
        return this.attendanceCheck;
    }

    public getStatus(): string {
        return this.status;
    }


    public setId(value: number) {
        this.id = value;
    }

    public setStudent(value: StudentEntity) {
        this.student = value;
    }

    public setAttendanceCheck(value: AttendanceCheckEntity) {
        this.attendanceCheck = value;
    }

    public setStatus(value: string) {
        this.status = value;
    }
}