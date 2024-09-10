
import {AttendanceCheck_StudentDto} from "../../dto/attendanceCheck_StudentDto";
import path from "path";
import fs from "fs";
import {IAttendanceCheck_StudentService} from "../IAttendanceCheck_StudentService";
import {IStudentService} from "../IStudentService";
import IStudentServiceImpl from "./IStudentServiceImpl";
import IGradeServiceImpl from "./IGradeServiceImpl";
import {IGradeService} from "../IGradeService";
import {AttendanceCheckStudentEntity} from "../../model/attendanceCheck_Student";


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

    create(attendanceId:number,studentId:number):any{
        try{
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const newId = jsonData.length > 0 ? jsonData.length + 1 : 1;
            const attendanceCheckStudentEntity: AttendanceCheckStudentEntity= new AttendanceCheckStudentEntity(newId,attendanceId,"",studentId,"");
            jsonData.push(attendanceCheckStudentEntity);
            fs.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));
        }catch (err){
            console.error(err);
            return [];
        }
    }
    updateByAttendanceCheckId(attendanceCheckId: number, attendanceCheckStudentDtos: AttendanceCheck_StudentDto[]): any {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData: Array<AttendanceCheck_StudentDto> = JSON.parse(fileData);
            const filterData = jsonData.filter(attend => attend.attendanceCheckId === attendanceCheckId);

            if (filterData.length > 0) {
                const updatedItems: AttendanceCheck_StudentDto[] = [];
                attendanceCheckStudentDtos.forEach(dto => {
                    const index = jsonData.findIndex(attend => attend.id === dto.id && attend.attendanceCheckId === attendanceCheckId);
                    if (index !== -1) {
                        jsonData[index] = dto;
                        updatedItems.push(jsonData[index]);
                    }
                });
                fs.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2), 'utf-8');
                console.log("Cập nhật thành công");
                return updatedItems;
            } else {
                console.error('Không tìm thấy id của attendanceCheckId = ' + attendanceCheckId);
                throw new Error('Lỗi');
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

}