"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheck_StudentDto = void 0;
class AttendanceCheck_StudentDto {
    constructor(id, attendanceCheckId, status, description, stundentDto) {
        this._id = id;
        this._attendanceCheckId = attendanceCheckId;
        this._status = status;
        this._description = description;
        this._stundentDto = stundentDto;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get attendanceCheckId() {
        return this._attendanceCheckId;
    }
    set attendanceCheckId(value) {
        this._attendanceCheckId = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get stundentDto() {
        return this._stundentDto;
    }
    set stundentDto(value) {
        this._stundentDto = value;
    }
}
exports.AttendanceCheck_StudentDto = AttendanceCheck_StudentDto;
