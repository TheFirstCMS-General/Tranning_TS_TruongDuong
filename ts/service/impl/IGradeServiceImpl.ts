import { IGradeService } from "../IGradeService";
import { GradeDto } from "../../dto/gradeDto";
import { GradeEntity } from "../../model/gradeEntity";
import fs from 'fs';
import path from 'path';
import {StudentDto} from "../../dto/studentDto";

const pathJson = path.join(__dirname, "../../../dao/grade.json");

export class IGradeServiceImpl implements IGradeService {


    showAll(): Array<GradeDto> {
        try {
            const data = fs.readFileSync(pathJson, 'utf8');
            const jsonData = JSON.parse(data); 
            const listGrade: Array<GradeDto> = [];
    
            for (const item of jsonData) {
                const grade = new GradeDto(item.id, item.code, item.name);
                listGrade.push(grade);
            }
    
            return listGrade;
        } catch (err) {
            console.error('Error reading or parsing file:', err);
            throw err; 
        }
    }

    findById(id: number): GradeDto | null{
        try {
            const data = fs.readFileSync(pathJson, 'utf8');
            const listGradeEntity : Array<GradeEntity> = JSON.parse(data);
            const gradeEntity = listGradeEntity.find((grade: GradeEntity) => grade.id === id);
            if (gradeEntity != undefined) {
                return new GradeDto(gradeEntity.id,gradeEntity.code,gradeEntity.name);
            }
            return null;

        } catch (err) {
            console.error('Error reading or parsing file:', err);
            throw err;
        }
    }
}
export default IGradeServiceImpl;