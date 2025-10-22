import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';


@Injectable({ providedIn: 'root' })

export class EmployeeService {
  base= 'http://localhost:8020/api/employee'
  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.base);
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/${id}`);
  }

  create(emp: Employee): Observable<string|Employee> {
    return this.http.post<Employee>(this.base, emp);
  }

  update(id: number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.base}/${id}`, emp);
  }
  deleteEducation(empId:number,eduId:number):Observable<string>{
    return this.http.delete<string>(`${this.base}/education/del/${eduId}`, {responseType:'text' as 'json'});
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.base}/${id}`,{ responseType:'text' as 'json'});
  }
}
