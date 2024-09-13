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
import {IAttendanceCheckStasticService} from "../IAttendanceCheckStasticService";
import {IAttendanceCheckStasticServiceImpl} from "./IAttendanceCheckStasticServiceImpl";
import {AttendanceCheckDto} from "../../dto/attendanceCheckDto";
import {StudentDto} from "../../dto/studentDto";
import {Gender} from "../../model/enum/gender_enum";
import {AttendanceCheckStasticsDto} from "../../dto/attendaneCheckStasticsDto";

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
        const iAttendanceStasticService: IAttendanceCheckStasticService = new IAttendanceCheckStasticServiceImpl();
        try {
            const iAttendCheck: IAttendanceCheckService = new IAttendanceCheckServiceImpl();
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('điểm danh');
            const worksheetStacstic = workbook.addWorksheet('thống kê');

            const worksheetEng = workbook.addWorksheet('attend');
            const worksheetStacsticEng = workbook.addWorksheet('stastic');
            worksheet.columns = [
                { header: 'Họ tên', key: 'name', width: 25 },
                { header: 'Ngày sinh', key: 'dob', width: 15 },
                { header: 'Giới tính', key: 'gender', width: 10 },
                { header: 'Trạng thái', key: 'status', width: 10 },
                { header: 'Lý do', key: 'description', width: 30 },
            ];

            worksheetEng.columns = [
                { header: 'id', key: 'id', width: 25 },
                { header: 'status', key: 'status', width: 10 },
                { header: 'description', key: 'description', width: 30 },
            ];
            worksheetStacsticEng.columns = [
                { header: 'gradeId', key: 'gradeId', width: 10 },
                { header: 'section', key: 'section', width: 10 },
                { header: 'createdAt', key: 'createdAt', width: 10 },
                { header: 'totalStudents', key: 'totalStudents', width: 25 },
                { header: 'present', key: 'present', width: 10 },
                { header: 'excused', key: 'excused', width: 10 },
                { header: 'late', key: 'late', width: 10 },
                { header: 'unexcused', key: 'unexcused', width: 10 },
            ];

            const idAttend = iAttendCheck.findById(attendanceCheckId);
            const idAttendanceCheckId = iAttendanceStasticService.findById(attendanceCheckId);
            if (idAttend != null && idAttendanceCheckId != null) {
                let currentClassName = '';
                attendanceCheckStudentDtos.forEach((dto, index) => {
                    if (dto.stundentDto.grade_name !== currentClassName) {
                        currentClassName = dto.stundentDto.grade_name;

                        const classRow = worksheetStacstic.addRow([`Lớp: ${currentClassName}`]);
                        const sectionRow = worksheetStacstic.addRow([`Phiên: ${idAttend.section}`]);
                        const dateRow = worksheetStacstic.addRow([`Ngày: ${this.formatDate(idAttend.createdAt)}`]);
                        const totalStudents = worksheetStacstic.addRow([`Sĩ số: ${idAttendanceCheckId.totalStudents}`]);
                        const present = worksheetStacstic.addRow([`Có mặt: ${idAttendanceCheckId.present}`]);
                        const excused = worksheetStacstic.addRow([`Có phép: ${idAttendanceCheckId.excused}`]);
                        const late = worksheetStacstic.addRow([`Muộn : ${idAttendanceCheckId.late}`]);
                        const unexcused = worksheetStacstic.addRow([`Không phép: ${idAttendanceCheckId.unexcused}`]);

                        worksheetStacsticEng.addRow({
                            gradeId: dto.stundentDto.grade_id,
                            section: idAttend.section,
                            createdAt: this.formatDate(idAttend.createdAt),
                            totalStudents: idAttendanceCheckId.totalStudents,
                            present: idAttendanceCheckId.present,
                            excused: idAttendanceCheckId.excused,
                            late: idAttendanceCheckId.late,
                            unexcused: idAttendanceCheckId.unexcused,
                        });

                        if (worksheet.lastRow) {
                            worksheetStacstic.mergeCells(`A${classRow.number}:E${classRow.number}`);
                            worksheetStacstic.mergeCells(`A${sectionRow.number}:E${sectionRow.number}`);
                            worksheetStacstic.mergeCells(`A${dateRow.number}:E${dateRow.number}`);
                            worksheetStacstic.mergeCells(`A${totalStudents.number}:E${totalStudents.number}`);
                            worksheetStacstic.mergeCells(`A${present.number}:E${present.number}`);
                            worksheetStacstic.mergeCells(`A${excused.number}:E${excused.number}`);
                            worksheetStacstic.mergeCells(`A${late.number}:E${late.number}`);
                            worksheetStacstic.mergeCells(`A${unexcused.number}:E${unexcused.number}`);
                        }
                    }

                    worksheet.addRow({
                        name: dto.stundentDto.name,
                        dob: dto.stundentDto.dob,
                        gender: dto.stundentDto.gender,
                        status: dto.status,
                        description: dto.description,
                    });

                    worksheetEng.addRow({
                        id: dto.stundentDto.id,
                        status: dto.status,
                        description: dto.description,
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
    formatDate(date: Date | string): string | null {
        // Convert string to Date if necessary
        const parsedDate = typeof date === 'string' ? new Date(date) : date;

        // Check if parsedDate is a valid Date object
        if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
            return parsedDate.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } else {
            console.error('Invalid date:', date);
            return null; // Handle invalid date appropriately
        }
    }

    importExcel(filePath: string): any {
        try {
            const workbook = xlsx.readFile(filePath);
            const worksheetStudent = workbook.Sheets["attend"];
            const worksheetAttend = workbook.Sheets["stastic"];
            const data :any = [xlsx.utils.sheet_to_json(worksheetStudent),xlsx.utils.sheet_to_json(worksheetAttend)]
            return data
        } catch (error) {
            console.error('Error importing data:', error);
            throw error;
        }
    }

    importData(filePath: string):any {
        try {
            const newData = this.importExcel(filePath)
            const attendCheckService: IAttendanceCheckService = new IAttendanceCheckServiceImpl;
            const gradeId = newData[1][0].gradeId
            const createdAt = newData[1][0].createdAt
            const present = parseInt(newData[1][0].present)
            const excused = parseInt(newData[1][0].excused)
            const late = parseInt(newData[1][0].late)
            const unexcused = parseInt(newData[1][0].unexcused)
            const section = newData[1][0].section

            const attendanceCheckDto: AttendanceCheckDto| null = attendCheckService.create(gradeId,new AttendanceCheckDto(0,createdAt,section,0,""))
            const attendCheckStasticService : IAttendanceCheckStasticService = new IAttendanceCheckStasticServiceImpl();
            if (attendanceCheckDto !== null) {
                let arrAttendaceCheckStudent: AttendanceCheck_StudentDto[] = []
                for (const student of newData[0]) {
                    let studentId = student.id;
                    let status = student.status;
                    let description = student.description;

                    const attendaceCheckStudentDto: AttendanceCheck_StudentDto = new AttendanceCheck_StudentDto(0,attendanceCheckDto.id,status,description,
                                                                                    new StudentDto(studentId,"",new Date("1/1/1111"),Gender.Female, "","",0,""))
                    arrAttendaceCheckStudent.push(attendaceCheckStudentDto)
                }

                this.updateByStudentId(attendanceCheckDto.id, arrAttendaceCheckStudent)
                attendCheckStasticService.countAttendanceCheck(attendanceCheckDto.id,new AttendanceCheckStasticsDto(0,0,present,excused,late,unexcused,new AttendanceCheckDto(0,new Date("1/1/1111"),"",0,"")))
            }
            console.log('Thành công');
        }
        catch (e){
            console.log("err")
        }
    }
    updateByStudentId(attendanceCheckId: number, attendanceCheckStudentDtos: AttendanceCheck_StudentDto[]): any {
        try {
            interface AttendanceCheck {
                attendanceCheckId: number;
                studentId: number;
                status: string;
                description: string;
            }

            const fileData = fs.readFileSync(pathJson, 'utf-8');
            const jsonData = JSON.parse(fileData);
            const filterData = jsonData.filter((attend: { id:number,attendanceCheckId: number,status:string,studentId:number, description:string}) => attend.attendanceCheckId === attendanceCheckId);

            if (filterData.length > 0) {
                const updatedItems: AttendanceCheck_StudentDto[] = [];
                attendanceCheckStudentDtos.forEach(dto => {
                    const index = jsonData.findIndex((attend: { id:number,attendanceCheckId: number,status:string,studentId:number, description:string})  => attend.studentId === dto.stundentDto.id && attend.attendanceCheckId === attendanceCheckId);
                    if (index !== -1) {
                        jsonData[index].status = dto.status;
                        jsonData[index].description = dto.description;
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