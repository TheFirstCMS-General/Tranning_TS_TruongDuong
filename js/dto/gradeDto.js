"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeDto = void 0;
class GradeDto {
    constructor(id, code, name) {
        this._id = id;
        this._code = code;
        this._name = name;
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
}
exports.GradeDto = GradeDto;
