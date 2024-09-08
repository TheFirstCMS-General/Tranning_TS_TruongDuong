import { StudentEntity } from './studentEntity';

export class GradeEntity {
    private id: number;
    private code: string;
    private name: string;
    private students: StudentEntity[]=[];

    constructor(id: number, code: string, name: string, students: StudentEntity[] = []) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.students = students;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStudents(): StudentEntity[] {
        return this.students;
    }
}
