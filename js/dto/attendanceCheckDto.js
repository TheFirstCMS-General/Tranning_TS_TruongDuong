"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCheckDto = void 0;
class AttendanceCheckDto {
    constructor(id, createdAt, section, gradeId) {
        this._id = id;
        this._createdAt = createdAt;
        this._section = section;
        this._gradeId = gradeId;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
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
    get gradeId() {
        return this._gradeId;
    }
    set gradeId(value) {
        this._gradeId = value;
    }
}
exports.AttendanceCheckDto = AttendanceCheckDto;
