import {StudentDto} from "./studentDto";

export class AttendanceCheck_StudentDto{
    private _id: number;
    private _attendanceCheckId: number;
    private _status: string;
    private _description: string;
    private _stundentDto:StudentDto;


    constructor(id: number, attendanceCheckId: number, status: string, description: string, stundentDto: StudentDto) {
        this._id = id;
        this._attendanceCheckId = attendanceCheckId;
        this._status = status;
        this._description = description;
        this._stundentDto = stundentDto;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get stundentDto(): StudentDto {
        return this._stundentDto;
    }

    set stundentDto(value: StudentDto) {
        this._stundentDto = value;
    }
}