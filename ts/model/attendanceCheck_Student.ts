import { StudentEntity } from "./studentEntity";
import { AttendanceCheckEntity } from "./attendanceCheckEntity";
export class AttendanceCheckStudentEntity {
    private _id: number;
    private _attendanceCheck_Id: number;
    private _status: string;
    private _studentId: number;


    constructor(id: number, attendanceCheck_Id: number, status: string, studentId: number) {
        this._id = id;
        this._attendanceCheck_Id = attendanceCheck_Id;
        this._status = status;
        this._studentId = studentId;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get attendanceCheck_Id(): number {
        return this._attendanceCheck_Id;
    }

    set attendanceCheck_Id(value: number) {
        this._attendanceCheck_Id = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get studentId(): number {
        return this._studentId;
    }

    set studentId(value: number) {
        this._studentId = value;
    }
}