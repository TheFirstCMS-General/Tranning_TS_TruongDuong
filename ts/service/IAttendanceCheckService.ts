import {AttendanceCheckDto} from "../dto/attendanceCheckDto";

export interface IAttendanceCheckService {
    showAll(gradeId:number):Array<AttendanceCheckDto>
    create(gradeId:number,attendanceCheckDto:AttendanceCheckDto):AttendanceCheckDto|null;
}