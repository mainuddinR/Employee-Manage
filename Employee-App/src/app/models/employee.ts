import { EducationInfo } from "./education-info";

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  educationList:EducationInfo[];
  
}
