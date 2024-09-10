import {AttendanceCheckStasticsDto} from "../dto/attendaneCheckStasticsDto";

export interface IAttendanceCheckStasticService {
    showAll(): Array<AttendanceCheckStasticsDto>;
    create(attendanceCheckStasticsto:AttendanceCheckStasticsDto):any
}