import { Gender } from '../model/enum/gender_enum';
class Student {
    public id: number;
    public name: string;
    public dob: Date;
    public gender: Gender; 
    public address: string;
    public phone: string;
  
    constructor(id: number, name: string, dob: Date, gender: Gender, address: string, phone: string) {
      this.id = id;
      this.name = name;
      this.dob = dob;
      this.gender = gender;
      this.address = address;
      this.phone = phone;
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
}
  