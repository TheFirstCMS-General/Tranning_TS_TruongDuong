import { AttendanceCheckEntity } from "./attendanceCheckEntity";
export class AttendanceCheckStasticsEntity {
    private id: number;
    private quantity: number;
    private attendanceCheck: AttendanceCheckEntity;
    private status: string;

    constructor(id: number, quantity: number, attendanceCheck: AttendanceCheckEntity, status: string) {
        this.id = id;
        this.quantity = quantity;
        this.attendanceCheck = attendanceCheck;
        this.status = status;
    }

    public getId(): number {
        return this.id;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getAttendanceCheck(): AttendanceCheckEntity {
        return this.attendanceCheck;
    }

    public getStatus(): string {
        return this.status;
    }


    public setId(value: number) {
        this.id = value;
    }

    public setQuantity(value: number) {
        this.quantity = value;
    }

    public setAttendanceCheck(value: AttendanceCheckEntity) {
        this.attendanceCheck = value;
    }

    public setStatus(value: string) {
        this.status = value;
    }
}