"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckStasticsEntity = void 0;
class AttendanceCheckStasticsEntity {
    constructor(id, totalStudents, present, excused, late, unexcused, attendanceCheckId) {
        this._id = id;
        this._totalStudents = totalStudents;
        this._present = present;
        this._excused = excused;
        this._late = late;
        this._unexcused = unexcused;
        this._attendanceCheck_id = attendanceCheckId;
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
    get attendanceCheck_id() {
        return this._attendanceCheck_id;
    }
    set attendanceCheck_id(value) {
        this._attendanceCheck_id = value;
    }
    toJSON() {
        return {
            id: this._id,
            totalStudents: this._totalStudents,
            present: this._present,
            excused: this._excused,
            late: this._late,
            unexcused: this._unexcused,
            attendanceCheck_id: this._attendanceCheck_id
        };
    }
}
exports.AttendanceCheckStasticsEntity = AttendanceCheckStasticsEntity;
