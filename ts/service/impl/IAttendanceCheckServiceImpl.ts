import fs from 'fs';
import path from 'path';
import {IAttendanceCheckService} from "../IAttendanceCheckService";
import {GradeDto} from "../../dto/gradeDto";
import {AttendanceCheckDto} from "../../dto/attendanceCheckDto";
import {Section} from "../../model/enum/section";
const pathJson = path.join(__dirname, "../../../dao/attendanceCheck.json");

export class IAttendanceCheckServiceImpl implements IAttendanceCheckService {

}