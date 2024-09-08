"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeEntity = void 0;
class GradeEntity {
    constructor(id, code, name, students = []) {
        this._students = [];
        this._id = id;
        this._code = code;
        this._name = name;
        this._students = students;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get code() {
        return this._code;
    }
    set code(value) {
        this._code = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get students() {
        return this._students;
    }
    set students(value) {
        this._students = value;
    }
}
exports.GradeEntity = GradeEntity;
