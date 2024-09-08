import { GradeDto } from "../dto/gradeDto";
import { GradeEntity } from "../model/gradeEntity";

export interface IGradeService {
    showAll(): Array<GradeDto>;
    findById(id: number): GradeDto  | null;
}
