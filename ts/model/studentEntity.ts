import { Gender } from './enum/gender_enum';
import { GradeEntity } from './gradeEntity';
export class StudentEntity {
    public id: number;
    public name: string;
    public dob: Date;
    public gender: Gender; 
    public address: string;
    public phone: string;
    public grade: GradeEntity;
  
    constructor(id: number, name: string, dob: Date, gender: Gender, address: string, phone: string,grade: GradeEntity) {
      this.id = id;
      this.name = name;
      this.dob = dob;
      this.gender = gender;
      this.address = address;
      this.phone = phone;
      this.grade = grade;
    }
    public getId(): number {
      return this.id;
  }

  public setId(id: number): void {
      this.id = id;
  }

  public getName(): string {
      return this.name;
  }

  public setName(name: string): void {
      this.name = name;
  }

  public getDob(): Date {
      return this.dob;
  }


  public setDob(dob: Date): void {
      this.dob = dob;
  }


  public getGender(): Gender {
      return this.gender;
  }


  public setGender(gender: Gender): void {
      this.gender = gender;
  }

  public getAddress(): string {
      return this.address;
  }

  public setAddress(address: string): void {
      this.address = address;
  }

  public getPhone(): string {
      return this.phone;
  }

  public setPhone(phone: string): void {
      this.phone = phone;
  }

  public getgrade(): GradeEntity {
    return this.grade;
}


public setgrade(grade: GradeEntity): void {
    this.grade = grade;
}
}
  