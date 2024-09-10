import fs from 'fs';
import path from 'path';
import {IAttendanceCheckService} from "../IAttendanceCheckService";
import {AttendanceCheckDto} from "../../dto/attendanceCheckDto";
import {StudentDto} from "../../dto/studentDto";
import IGradeServiceImpl from "./IGradeServiceImpl";
import {IGradeService} from "../IGradeService";
import {IStudentService} from "../IStudentService";
import IStudentServiceImpl from "./IStudentServiceImpl";
import {IAttendanceCheck_StudentService} from "../IAttendanceCheck_StudentService";
import {IAttendanceCheck_StudentServiceImpl} from "./IAttendanceCheck_StudentServiceImpl";
import {AttendanceCheckEntity} from "../../model/attendanceCheckEntity";
import {AttendanceCheckStasticsDto} from "../../dto/attendaneCheckStasticsDto";
import {IAttendanceCheckStasticServiceImpl} from "./IAttendanceCheckStasticServiceImpl";
import {IAttendanceCheckStasticService} from "../IAttendanceCheckStasticService";

const pathJson = path.join(__dirname, "../../../dao/attendanceCheck.json");

export class IAttendanceCheckServiceImpl implements IAttendanceCheckService {
    private IGradeService: IGradeService = new IGradeServiceImpl();
    private IStudent: IStudentService = new IStudentServiceImpl();
    private IAttendanceCheckStudentService: IAttendanceCheck_StudentService = new IAttendanceCheck_StudentServiceImpl();
    private IAttendanceCheckStasticsService: IAttendanceCheckStasticService = new IAttendanceCheckStasticServiceImpl();

    showAll(): Array<AttendanceCheckDto> {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttend: Array<AttendanceCheckDto> = [];

            for (const item of jsonData) {
                const gradeDto = this.IGradeService.findById(item.gradeId);
                if (gradeDto != null) {
                    const attend = new AttendanceCheckDto(item.id, new Date(item.createdAt), item.section, item.gradeId, gradeDto.name);
                    listAttend.push(attend);
                }
            }
            return listAttend;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    create(gradeId: number, attendanceCheckDto: AttendanceCheckDto): AttendanceCheckDto | null {
        const fileData = fs.readFileSync(pathJson, 'utf-8');
        const jsonData: AttendanceCheckDto[] = JSON.parse(fileData);


        const newId = jsonData.length > 0 ? Math.max(...jsonData.map((data: AttendanceCheckDto) => data.id)) + 1 : 1;
        attendanceCheckDto.id = newId;
        attendanceCheckDto.gradeId = gradeId;
        jsonData.push(attendanceCheckDto);
        fs.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));
        const listStudent = this.IStudent.showAll(gradeId);
        if (listStudent != null) {
            for (const item of listStudent) {
                this.IAttendanceCheckStudentService.create(newId,item.id);
            }
        }

        const attendanceCheckStasticsDto :AttendanceCheckStasticsDto = new AttendanceCheckStasticsDto(1,listStudent.length,0,0,0,0,attendanceCheckDto);
        this.IAttendanceCheckStasticsService.create(attendanceCheckStasticsDto);
        return attendanceCheckDto;
    }
    findById(id: number): AttendanceCheckDto | null {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const attendanceCheckEntity : AttendanceCheckEntity = jsonData.find((attendanceCheck : AttendanceCheckEntity) => attendanceCheck.id === id);
            if (attendanceCheckEntity != null) {
                const gradeDto = this.IGradeService.findById(attendanceCheckEntity.gradeId);
                if (gradeDto != null) {
                    const attendanceCheckDto: AttendanceCheckDto = new AttendanceCheckDto(attendanceCheckEntity.id,attendanceCheckEntity.createdAt,attendanceCheckEntity.section,attendanceCheckEntity.gradeId,gradeDto.name)
                    return attendanceCheckDto;
                }
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}