import { StudentEntity } from './studentEntity';

export class GradeEntity {
    private _id: number;
    private _code: string;
    private _name: string;
    private _students: StudentEntity[]=[];

    constructor(id: number, code: string, name: string, students: StudentEntity[] = []) {
        this._id = id;
        this._code = code;
        this._name = name;
        this._students = students;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get students(): StudentEntity[] {
        return this._students;
    }

    set students(value: StudentEntity[]) {
        this._students = value;
    }
}
