import {Status} from "../model/enum/status_enum";

export class AttendanceCheck_StudentDto{
    private _id: number;
    private _studentId: number;
    private _attendanceCheckId: number;
    private _status: string;


    constructor(id: number, studentId: number, attendanceCheckId: number, status: string) {
        this._id = id;
        this._studentId = studentId;
        this._attendanceCheckId = attendanceCheckId;
        this._status = status;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get studentId(): number {
        return this._studentId;
    }

    set studentId(value: number) {
        this._studentId = value;
    }

    get attendanceCheckId(): number {
        return this._attendanceCheckId;
    }

    set attendanceCheckId(value: number) {
        this._attendanceCheckId = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }
}