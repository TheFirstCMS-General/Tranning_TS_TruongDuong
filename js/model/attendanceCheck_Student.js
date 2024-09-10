"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckStudentEntity = void 0;
class AttendanceCheckStudentEntity {
    constructor(id, attendanceCheck_Id, status, studentId, description) {
        this._id = id;
        this._attendanceCheck_Id = attendanceCheck_Id;
        this._status = status;
        this._studentId = studentId;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get attendanceCheck_Id() {
        return this._attendanceCheck_Id;
    }
    set attendanceCheck_Id(value) {
        this._attendanceCheck_Id = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get studentId() {
        return this._studentId;
    }
    set studentId(value) {
        this._studentId = value;
    }
}
exports.AttendanceCheckStudentEntity = AttendanceCheckStudentEntity;
