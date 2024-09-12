"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckEntity = void 0;
class AttendanceCheckEntity {
    constructor(id, grade_Id, createdAt, section) {
        this._id = id;
        this._grade_Id = grade_Id;
        this._createdAt = createdAt;
        this._section = section;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get gradeId() {
        return this._grade_Id;
    }
    set gradeId(value) {
        this._grade_Id = value;
    }
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(value) {
        this._createdAt = value;
    }
    get section() {
        return this._section;
    }
    set section(value) {
        this._section = value;
    }
}
exports.AttendanceCheckEntity = AttendanceCheckEntity;
