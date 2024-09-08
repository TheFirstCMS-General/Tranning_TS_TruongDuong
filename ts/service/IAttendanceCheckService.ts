import {AttendanceCheckDto} from "../dto/attendanceCheckDto";

export interface IAttendanceCheckService {
    showAll():Array<AttendanceCheckDto>
    create(gradeId:number,attendanceCheckDto:AttendanceCheckDto):AttendanceCheckDto|null;
}