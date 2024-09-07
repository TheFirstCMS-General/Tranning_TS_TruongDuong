"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckEntity = void 0;
class AttendanceCheckEntity {
    constructor(id, grade, createdAt, section) {
        this.id = id;
        this.grade = grade;
        this.createdAt = createdAt;
        this.section = section;
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getSection() {
        return this.section;
    }
    setId(value) {
        this.id = value;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    setSection(value) {
        this.section = value;
    }
    getgrade() {
        return this.grade;
    }
    setgrade(grade) {
        this.grade = grade;
    }
}
exports.AttendanceCheckEntity = AttendanceCheckEntity;
