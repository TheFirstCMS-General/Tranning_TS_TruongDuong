import {IAttendanceCheckStasticService} from "../IAttendanceCheckStasticService";
import {AttendanceCheckStasticsDto} from "../../dto/attendaneCheckStasticsDto";
import {IAttendanceCheckService} from "../IAttendanceCheckService";
import {IAttendanceCheckServiceImpl} from "./IAttendanceCheckServiceImpl";
import {AttendanceCheckDto} from "../../dto/attendanceCheckDto";
import fs from "fs";
import path from "path";
import {AttendanceCheckEntity} from "../../model/attendanceCheckEntity";
import {AttendanceCheckStasticsEntity} from "../../model/attendanceCheckStasticsEntity";
import {AttendanceCheck_StudentDto} from "../../dto/attendanceCheck_StudentDto";
import {StudentDto} from "../../dto/studentDto";
import IGradeServiceImpl from "./IGradeServiceImpl";
const pathJson = path.join(__dirname, "../../../dao/attendaneCheckStastics.json");

export class IAttendanceCheckStasticServiceImpl implements IAttendanceCheckStasticService {

    showAll(): Array<AttendanceCheckStasticsDto> {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttendanceCheckStastics: Array<AttendanceCheckStasticsDto> = [];
            const IAttendanceCheckService : IAttendanceCheckService = new IAttendanceCheckServiceImpl();

            for (const item of jsonData) {
                const attendanceCheckDto = IAttendanceCheckService.findById(item.attendanceCheck_id);
                if (attendanceCheckDto != null) {
                    const attendanceCheckStaticsDto = new AttendanceCheckStasticsDto(item.id, item.totalStudents, item.present, item.excused
                        , item.late, item.unexcused, attendanceCheckDto);
                    listAttendanceCheckStastics.push(attendanceCheckStaticsDto);
                }
            }
            return listAttendanceCheckStastics;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    findById(id: number): AttendanceCheckStasticsDto | null {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const attendanceCheckEntity : AttendanceCheckStasticsEntity = jsonData.find((attendanceCheck : AttendanceCheckStasticsEntity) => attendanceCheck.id === id);
            const IAttendanceCheckService : IAttendanceCheckService = new IAttendanceCheckServiceImpl();

            if (attendanceCheckEntity != null) {
                const attendanceCheckDto = IAttendanceCheckService.findById(id);
                if (attendanceCheckDto != null) {
                    const attendanceCheckStaticsDto: AttendanceCheckStasticsDto = new AttendanceCheckStasticsDto(attendanceCheckEntity.id, attendanceCheckEntity.totalStudents, attendanceCheckEntity.present, attendanceCheckEntity.excused
                                                    , attendanceCheckEntity.late, attendanceCheckEntity.unexcused, attendanceCheckDto);
                    return attendanceCheckStaticsDto;
                }
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    create(attendanceCheckStasticsto:AttendanceCheckStasticsDto):any {
        const fileData = fs.readFileSync(pathJson, 'utf-8');
        const jsonData: AttendanceCheckStasticsEntity[] = JSON.parse(fileData);


        const newId = jsonData.length > 0 ? Math.max(...jsonData.map((data: AttendanceCheckStasticsEntity) => data.id)) + 1 : 1;
        const attendanceCheckStasticsEntity : AttendanceCheckStasticsEntity = new AttendanceCheckStasticsEntity(newId,attendanceCheckStasticsto.totalStudents,attendanceCheckStasticsto.present,
                                                                                attendanceCheckStasticsto.excused,attendanceCheckStasticsto.late,attendanceCheckStasticsto.unexcused,attendanceCheckStasticsto.attendanceCheckDto.id)
        jsonData.push(attendanceCheckStasticsEntity);
        fs.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2));

    }

    countAttendanceCheck(attendId:number,data : AttendanceCheckStasticsDto):any {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const attendIndex = jsonData.findIndex((attend :AttendanceCheckEntity) => attend.id === attendId);
            if (attendIndex !== -1) {
                jsonData[attendIndex].present = data.present;
                jsonData[attendIndex].excused = data.excused;
                jsonData[attendIndex].late = data.late;
                jsonData[attendIndex].unexcused = data.unexcused;

                fs.writeFileSync(pathJson, JSON.stringify(jsonData, null, 2), 'utf-8');
                return jsonData[attendIndex];
            } else {
                console.error('Lỗi không tìm thấy học sinh với id = ?');
                throw new Error('Lỗi');
            }
    }
}
