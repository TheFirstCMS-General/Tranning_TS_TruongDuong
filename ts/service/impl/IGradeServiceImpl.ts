import { IGradeService } from "../IGradeService";
import { GradeDto } from "../../dto/gradeDto";
import { GradeEntity } from "../../model/gradeEntity";
import fs from 'fs';
import path from 'path';

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
    
}
export default IGradeServiceImpl;