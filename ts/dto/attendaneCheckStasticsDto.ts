import {AttendanceCheckDto} from "./attendanceCheckDto";

export class AttendanceCheckStasticsDto {
    private _id: number;
    private _totalStudents: number;
    private _present: number;
    private _excused: number;
    private _late: number;
    private _unexcused: number;
    private _attendanceCheckDto : AttendanceCheckDto;

    constructor(id: number, totalStudents: number, present: number, excused: number, late: number, unexcused: number, attendanceCheckDto: AttendanceCheckDto) {
        this._id = id;
        this._totalStudents = totalStudents;
        this._present = present;
        this._excused = excused;
        this._late = late;
        this._unexcused = unexcused;
        this._attendanceCheckDto = attendanceCheckDto;
    }

    get attendanceCheckDto(): AttendanceCheckDto {
        return this._attendanceCheckDto;
    }

    set attendanceCheckDto(value: AttendanceCheckDto) {
        this._attendanceCheckDto = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get totalStudents(): number {
        return this._totalStudents;
    }

    set totalStudents(value: number) {
        this._totalStudents = value;
    }

    get present(): number {
        return this._present;
    }

    set present(value: number) {
        this._present = value;
    }

    get excused(): number {
        return this._excused;
    }

    set excused(value: number) {
        this._excused = value;
    }

    get late(): number {
        return this._late;
    }

    set late(value: number) {
        this._late = value;
    }

    get unexcused(): number {
        return this._unexcused;
    }

    set unexcused(value: number) {
        this._unexcused = value;
    }
}