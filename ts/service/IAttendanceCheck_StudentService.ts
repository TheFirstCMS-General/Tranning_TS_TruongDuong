import {AttendanceCheck_StudentDto} from "../dto/attendanceCheck_StudentDto";

export interface IAttendanceCheck_StudentService {
    showAll(attendaceId:number):Array<AttendanceCheck_StudentDto>

    create(attendanceId:number,studentId:number):any
    updateByAttendanceCheckId(attendanceCheckId: number, attendanceCheckStudentDtos: AttendanceCheck_StudentDto[]): any

    exportExcel(attendanceCheckId: number,attendanceCheckStudentDtos: AttendanceCheck_StudentDto[]):any;
    importExcel(filePath: string): any
    importData(filePath: string): any
}