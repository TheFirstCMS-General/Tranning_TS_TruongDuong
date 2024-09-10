"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckStudentEntity = void 0;
class AttendanceCheckStudentEntity {
    constructor(id, attendanceCheckId, status, studentId, description) {
        this.id = id;
        this.attendanceCheckId = attendanceCheckId;
        this.status = status;
        this.studentId = studentId;
        this.description = description;
    }
}
exports.AttendanceCheckStudentEntity = AttendanceCheckStudentEntity;
