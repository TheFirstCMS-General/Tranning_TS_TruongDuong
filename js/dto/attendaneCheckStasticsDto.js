"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckStasticsDto = void 0;
class AttendanceCheckStasticsDto {
    constructor(id, totalStudents, present, excused, late, unexcused, attendanceCheckDto) {
        this._id = id;
        this._totalStudents = totalStudents;
        this._present = present;
        this._excused = excused;
        this._late = late;
        this._unexcused = unexcused;
        this._attendanceCheckDto = attendanceCheckDto;
    }
    get attendanceCheckDto() {
        return this._attendanceCheckDto;
    }
    set attendanceCheckDto(value) {
        this._attendanceCheckDto = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get totalStudents() {
        return this._totalStudents;
    }
    set totalStudents(value) {
        this._totalStudents = value;
    }
    get present() {
        return this._present;
    }
    set present(value) {
        this._present = value;
    }
    get excused() {
        return this._excused;
    }
    set excused(value) {
        this._excused = value;
    }
    get late() {
        return this._late;
    }
    set late(value) {
        this._late = value;
    }
    get unexcused() {
        return this._unexcused;
    }
    set unexcused(value) {
        this._unexcused = value;
    }
}
exports.AttendanceCheckStasticsDto = AttendanceCheckStasticsDto;
