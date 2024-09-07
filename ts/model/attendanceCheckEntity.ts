import { GradeEntity } from "./gradeEntity";
export class AttendanceCheckEntity{
    public id: number;
    public grade: GradeEntity;
    public createdAt: Date;
    public section: number;

    constructor(id: number, grade: GradeEntity, createdAt: Date, section: number) {
        this.id = id;
        this.grade = grade;
        this.createdAt = createdAt;
        this.section = section;
    }
    public getId(): number {
        return this.id;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getSection(): number {
        return this.section;
    }
    public setId(value: number) {
        this.id = value;
    }
    public setCreatedAt(value: Date) {
        this.createdAt = value;
    }
    public setSection(value: number) {
        this.section = value;
    }
    public getgrade(): GradeEntity {
        return this.grade;
    }
    public setgrade(grade: GradeEntity): void {
        this.grade = grade;
    }
}