import {Section} from "../model/enum/section";

export class AttendanceCheckDto {
    private _id: number;
    private _createdAt: Date;
    private _section: string;
    private _gradeId: number;
    private _gradeName: string;

    constructor(id: number, createdAt: Date, section: string, gradeId: number,gradeName: string) {
        this._id = id;
        this._createdAt = createdAt;
        this._section = section;
        this._gradeId = gradeId;
        this._gradeName = gradeName;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get section(): string {
        return this._section;
    }

    set section(value: string) {
        this._section = value;
    }

    get gradeId(): number {
        return this._gradeId;
    }

    set gradeId(value: number) {
        this._gradeId = value;
    }

    get gradeName(): string {
        return this._gradeName;
    }

    set gradeName(value: string) {
        this._gradeName = value;
    }
}