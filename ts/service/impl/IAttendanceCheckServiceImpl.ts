import fs from 'fs';
import path from 'path';
import {IAttendanceCheckService} from "../IAttendanceCheckService";
import {AttendanceCheckDto} from "../../dto/attendanceCheckDto";
import {StudentDto} from "../../dto/studentDto";
import IGradeServiceImpl from "./IGradeServiceImpl";
import {IGradeService} from "../IGradeService";

const pathJson = path.join(__dirname, "../../../dao/attendanceCheck.json");

export class IAttendanceCheckServiceImpl implements IAttendanceCheckService {
    private IGradeService: IGradeService = new IGradeServiceImpl();

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

        const idGrade = jsonData.find((grade: AttendanceCheckDto) => grade.gradeId === gradeId);
        if (!idGrade) {
            console.log("Lỗi: Không tìm thấy gradeId");
            return null;
        }

        jsonData.push(attendanceCheckDto);
        fs.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));

        return attendanceCheckDto;
    }

}