"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheck_StudentDto = void 0;
class AttendanceCheck_StudentDto {
    constructor(id, studentId, attendanceCheckId, status) {
        this._id = id;
        this._studentId = studentId;
        this._attendanceCheckId = attendanceCheckId;
        this._status = status;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get studentId() {
        return this._studentId;
    }
    set studentId(value) {
        this._studentId = value;
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
}
exports.AttendanceCheck_StudentDto = AttendanceCheck_StudentDto;
