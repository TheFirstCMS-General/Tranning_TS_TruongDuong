import {IAttendanceCheckServiceImpl} from "./IAttendanceCheckServiceImpl";
import {AttendanceCheck_StudentDto} from "../../dto/attendanceCheck_StudentDto";
import path from "path";
import fs from "fs";
import {IAttendanceCheck_StudentService} from "../IAttendanceCheck_StudentService";
import {IStudentService} from "../IStudentService";
import IStudentServiceImpl from "./IStudentServiceImpl";
import IGradeServiceImpl from "./IGradeServiceImpl";
import {IGradeService} from "../IGradeService";

const pathJson = path.join(__dirname, "../../../dao/attendanceCheck_Student.json");

export class IAttendanceCheck_StudentServiceImpl implements IAttendanceCheck_StudentService {
    private iStudent: IStudentService = new IStudentServiceImpl();
    private IGradeService: IGradeService = new IGradeServiceImpl();

    showAll(attendaceId: number): Array<AttendanceCheck_StudentDto> {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttend: Array<AttendanceCheck_StudentDto> = [];
            for (const item of jsonData) {
                const studentDto = this.iStudent.findById(item.studentId);
                if (item.attendanceCheckId === attendaceId && studentDto != null) {
                    const attenCheckStudent = new AttendanceCheck_StudentDto(item.id, item.attendanceCheckId, item.status, item.description,studentDto)
                    listAttend.push(attenCheckStudent);
                }
            }
            return listAttend;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}