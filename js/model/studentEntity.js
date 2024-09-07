"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEntity = void 0;
class StudentEntity {
    constructor(id, name, dob, gender, address, phone, grade) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.address = address;
        this.phone = phone;
        this.grade = grade;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getDob() {
        return this.dob;
    }
    setDob(dob) {
        this.dob = dob;
    }
    getGender() {
        return this.gender;
    }
    setGender(gender) {
        this.gender = gender;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    getPhone() {
        return this.phone;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    getgrade() {
        return this.grade;
    }
    setgrade(grade) {
        this.grade = grade;
    }
}
exports.StudentEntity = StudentEntity;
