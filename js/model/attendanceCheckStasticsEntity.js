"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckStasticsEntity = void 0;
class AttendanceCheckStasticsEntity {
    constructor(id, quantity, attendanceCheck, status) {
        this.id = id;
        this.quantity = quantity;
        this.attendanceCheck = attendanceCheck;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    getQuantity() {
        return this.quantity;
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
    setQuantity(value) {
        this.quantity = value;
    }
    setAttendanceCheck(value) {
        this.attendanceCheck = value;
    }
    setStatus(value) {
        this.status = value;
    }
}
exports.AttendanceCheckStasticsEntity = AttendanceCheckStasticsEntity;
