"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEntity = void 0;
class StudentEntity {
    constructor(id, name, dob, gender, address, phone, grade) {
        this._id = id;
        this._name = name;
        this._dob = dob;
        this._gender = gender;
        this._address = address;
        this._phone = phone;
        this._grade = grade;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get dob() {
        return this._dob;
    }
    set dob(value) {
        this._dob = value;
    }
    get gender() {
        return this._gender;
    }
    set gender(value) {
        this._gender = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        this._phone = value;
    }
    get grade() {
        return this._grade;
    }
    set grade(value) {
        this._grade = value;
    }
}
exports.StudentEntity = StudentEntity;
