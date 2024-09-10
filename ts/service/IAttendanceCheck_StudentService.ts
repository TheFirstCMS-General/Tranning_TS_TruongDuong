import {AttendanceCheck_StudentDto} from "../dto/attendanceCheck_StudentDto";

export interface IAttendanceCheck_StudentService {
    showAll(attendaceId:number):Array<AttendanceCheck_StudentDto>

    create(attendanceId:number,studentId:number):any
}