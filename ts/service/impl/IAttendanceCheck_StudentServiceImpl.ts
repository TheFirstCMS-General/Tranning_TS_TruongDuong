
import {AttendanceCheck_StudentDto} from "../../dto/attendanceCheck_StudentDto";
import path from "path";
import fs from "fs";
import xlsx from "xlsx";
import Excel from 'exceljs';
import {IAttendanceCheck_StudentService} from "../IAttendanceCheck_StudentService";
import {IStudentService} from "../IStudentService";
import {IStudentServiceImpl} from "./IStudentServiceImpl";
import IGradeServiceImpl from "./IGradeServiceImpl";
import {IGradeService} from "../IGradeService";
import {AttendanceCheckStudentEntity} from "../../model/attendanceCheck_Student";
import {IAttendanceCheckServiceImpl} from "./IAttendanceCheckServiceImpl";
import {IAttendanceCheckService} from "../IAttendanceCheckService";


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
    exportExcel(attendanceCheckId: number, attendanceCheckStudentDtos: AttendanceCheck_StudentDto[]): any {
        try {
            const iAttendCheck:IAttendanceCheckService = new IAttendanceCheckServiceImpl();
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Attendance');

            worksheet.columns = [
                { header: 'Lớp', key: 'className', width: 15 },
                { header: 'Họ tên', key: 'name', width: 25 },
                { header: 'Ngày sinh', key: 'dob', width: 15 },
                { header: 'Giới tính', key: 'gender', width: 10 },
                { header: 'Trạng thái', key: 'status', width: 10 },
                { header: 'Lý do', key: 'description', width: 30 },
                { header: 'Phiên', key: 'section', width: 30 },
                { header: 'Ngày', key: 'createdAt', width: 30 },
            ];
            const idAttend = iAttendCheck.findById(attendanceCheckId);
            if (idAttend!=null){
                attendanceCheckStudentDtos.forEach(dto => {
                    worksheet.addRow({
                        className: dto.stundentDto.grade_name,
                        name: dto.stundentDto.name,
                        dob: dto.stundentDto.dob,
                        gender: dto.stundentDto.gender,
                        status: dto.status,
                        description: dto.description,
                        section: idAttend.section,
                        createdAt: idAttend.createdAt,
                    });
                });
            }
            const exportPath = path.join(__dirname, 'students_list.xlsx');
            return workbook.xlsx.writeFile(exportPath).then(() => {
                return exportPath;
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    importExcel(filePath:string) {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            return data;
        } catch (error) {
            console.error('Lỗi đọc file:', error);
            throw error;
        }
    }
     importData(filePath:string):any {
        try {

            console.log('Thành công');
        } catch (error) {
            console.error('Error importing data:', error);
            throw error;
        }
    }




}