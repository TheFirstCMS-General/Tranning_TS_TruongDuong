import { Gender } from './enum/gender_enum';
import { GradeEntity } from './gradeEntity';
export class StudentEntity {
    private _id: number;
    private _name: string;
    private _dob: Date;
    private _gender: Gender;
    private _address: string;
    private _phone: string;
    private _grade: GradeEntity;


    constructor(id: number, name: string, dob: Date, gender: Gender, address: string, phone: string, grade: GradeEntity) {
        this._id = id;
        this._name = name;
        this._dob = dob;
        this._gender = gender;
        this._address = address;
        this._phone = phone;
        this._grade = grade;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get dob(): Date {
        return this._dob;
    }

    set dob(value: Date) {
        this._dob = value;
    }

    get gender(): Gender {
        return this._gender;
    }

    set gender(value: Gender) {
        this._gender = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get grade(): GradeEntity {
        return this._grade;
    }

    set grade(value: GradeEntity) {
        this._grade = value;
    }
}
  