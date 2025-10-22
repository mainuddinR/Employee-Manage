import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  imports:[CommonModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  loading = false;

  constructor(private employeeService: EmployeeService,private router:Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: (data:any) => {
        this.employees = data;
        console.log(data);
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching employees:', err);
        this.loading = false;
      },
    });
  }

  edit(empId: number) {
    // navigate to edit form page
    //window.location.href = `/employees/edit/${empId}`;
    this.router.navigate(['/employees/edit',empId]);

  }

  remove(empId: number) {
    if (confirm('Are you sure you want to delete this employee and all related education info?')) {
      this.employeeService.delete(empId).subscribe({
        next: () => this.loadEmployees(),
        error: (err:any) => console.error('Error deleting employee:', err),
      });
    }
  }

  removeEducation(empId: number, eduId: number) {
    if (confirm('Delete this specific education entry?')) {
      this.employeeService.deleteEducation(empId, eduId).subscribe({
        next: () => this.loadEmployees(),
        error: (err:any) => console.error('Error deleting education:', err),
      });
    }
  }
}
