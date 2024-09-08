"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckStudentEntity = void 0;
class AttendanceCheckStudentEntity {
    constructor(id, student, attendanceCheck, status) {
        this.id = id;
        this.student = student;
        this.attendanceCheck = attendanceCheck;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    getStudent() {
        return this.student;
    }
    getAttendanceCheck() {
        return this.attendanceCheck;
    }
    getStatus() {
        return this.status;
    }
    setId(value) {
        this.id = value;
    }
    setStudent(value) {
        this.student = value;
    }
    setAttendanceCheck(value) {
        this.attendanceCheck = value;
    }
    setStatus(value) {
        this.status = value;
    }
}
exports.AttendanceCheckStudentEntity = AttendanceCheckStudentEntity;
