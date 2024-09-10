import {IAttendanceCheckStasticService} from "../IAttendanceCheckStasticService";
import {AttendanceCheckStasticsDto} from "../../dto/attendaneCheckStasticsDto";
import {IAttendanceCheckService} from "../IAttendanceCheckService";
import {IAttendanceCheckServiceImpl} from "./IAttendanceCheckServiceImpl";
import {AttendanceCheckDto} from "../../dto/attendanceCheckDto";
import fs from "fs";
import path from "path";
import {AttendanceCheckEntity} from "../../model/attendanceCheckEntity";
import {AttendanceCheckStasticsEntity} from "../../model/attendanceCheckStasticsEntity";
const pathJson = path.join(__dirname, "../../../dao/attendaneCheckStastics.json");

export class IAttendanceCheckStasticServiceImpl implements IAttendanceCheckStasticService {
    private IAttendanceCheckService : IAttendanceCheckService = new IAttendanceCheckServiceImpl();

    showAll(): Array<AttendanceCheckStasticsDto> {
        try {
            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const listAttendanceCheckStastics: Array<AttendanceCheckStasticsDto> = [];

            for (const item of jsonData) {
                const attendanceCheckDto = this.IAttendanceCheckService.findById(item.attendanceCheck_id);
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
            if (attendanceCheckEntity != null) {
                const attendanceCheckDto = this.IAttendanceCheckService.findById(id);
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
}