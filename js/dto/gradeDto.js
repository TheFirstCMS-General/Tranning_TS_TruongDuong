"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeDto = void 0;
class GradeDto {
    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
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
}
exports.GradeDto = GradeDto;
