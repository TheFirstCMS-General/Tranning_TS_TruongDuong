import {Gender} from "../model/enum/gender_enum";

export class StudentDto {
    private _id: number;
    private _name: string;
    private _dob: Date;
    private _gender: Gender;
    private _address: string;
    private _phone: string;
    private _grade_id: number;
    private _grade_name: string;

    constructor(id: number,  name: string, dob: Date, gender: Gender, address: string, phone: string, grade_id: number, grade_name: string) {
        this._id = id;
        this._name = name;
        this._dob = dob;
        this._gender = gender;
        this._address = address;
        this._phone = phone;
        this._grade_id = grade_id;
        this._grade_name = grade_name;
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

    get grade_id(): number {
        return this._grade_id;
    }

    set grade_id(value: number) {
        this._grade_id = value;
    }

    get grade_name(): string {
        return this._grade_name;
    }

    set grade_name(value: string) {
        this._grade_name = value;
    }
}