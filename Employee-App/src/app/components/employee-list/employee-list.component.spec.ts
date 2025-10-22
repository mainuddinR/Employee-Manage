import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;

  constructor(private svc: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: data => {
        this.employees = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  edit(id?: number) {
    if (id) this.router.navigate(['/employees/edit', id]);
  }

  remove(id?: number) {
    if (!id) return;
    if (!confirm('Are you sure to delete this employee?')) return;
    this.svc.delete(id).subscribe(() => this.fetch());
  }
}
