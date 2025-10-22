import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EducationInfo } from '../models/education-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationServiceService {

  url="http://localhost:8020/api/employee/education"

  constructor(private http:HttpClient) { }

  addEducation(education:EducationInfo,empId:number):Observable<string> {
     return this.http.post<string>(this.url+"/"+empId,education,{responseType:'text' as 'json'})
  }
  getEducation(empId:number):Observable<EducationInfo[]>{
    return this.http.get<EducationInfo[]>(this.url+"/"+empId)
  }

  updateEducationaInfo(educationId:number,education:EducationInfo):Observable<EducationInfo>{
    return this.http.put<EducationInfo>(this.url+"/put"+educationId,education)
  }
  deletedEducationalInfo(educationId:number):Observable<string>{
    return this.http.delete<string>(this.url+"/del"+educationId,{responseType:'text' as 'json'})
  }

  getEducationalInfoById(educationId:number):Observable<EducationInfo>{
    return this.http.get<EducationInfo>(this.url+"/get"+educationId);
  }


}
