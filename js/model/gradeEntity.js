"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeEntity = void 0;
class GradeEntity {
    constructor(id, code, name, students = []) {
        this.students = [];
        this.id = id;
        this.code = code;
        this.name = name;
        this.students = students;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getStudents() {
        return this.students;
    }
}
exports.GradeEntity = GradeEntity;
