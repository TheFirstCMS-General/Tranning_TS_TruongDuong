import { GradeEntity } from "./gradeEntity";
import {Section} from "./enum/section";
export class AttendanceCheckEntity{
    private _id: number;
    private _grade: GradeEntity;
    private _createdAt: Date;
    private _section: Section;

    constructor(id: number, grade: GradeEntity, createdAt: Date, section: Section) {
        this._id = id;
        this._grade = grade;
        this._createdAt = createdAt;
        this._section = section;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get grade(): GradeEntity {
        return this._grade;
    }

    set grade(value: GradeEntity) {
        this._grade = value;
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