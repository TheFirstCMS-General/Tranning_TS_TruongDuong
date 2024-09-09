import { GradeEntity } from "./gradeEntity";
import {Section} from "./enum/section";
export class AttendanceCheckEntity{
    private _id: number;
    private _grade_Id: number;
    private _createdAt: Date;
    private _section: Section;


    constructor(id: number, grade_Id: number, createdAt: Date, section: Section) {
        this._id = id;
        this._grade_Id = grade_Id;
        this._createdAt = createdAt;
        this._section = section;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get grade_Id(): number {
        return this._grade_Id;
    }

    set grade_Id(value: number) {
        this._grade_Id = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get section(): Section {
        return this._section;
    }

    set section(value: Section) {
        this._section = value;
    }
}