import {AttendanceCheckStasticsDto} from "../dto/attendaneCheckStasticsDto";

export interface IAttendanceCheckStasticService {
    showAll(): Array<AttendanceCheckStasticsDto>;
    create(attendanceCheckStasticsto:AttendanceCheckStasticsDto):any
    findById(id: number): AttendanceCheckStasticsDto | null
    countAttendanceCheck(attendId:number,data : AttendanceCheckStasticsDto):any
}