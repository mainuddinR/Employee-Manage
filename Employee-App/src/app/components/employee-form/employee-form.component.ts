import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EducationServiceService } from '../../services/education-service.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  form: FormGroup;
  showEducationForm = false;
  loading = false;
  degreeList: string[] = ['SSC', 'HSC', 'Diploma', 'BSc', 'MSc', 'PhD'];
  isEdit=false;
  employeeId?:number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private educationService:EducationServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private svc: EmployeeService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      educations: this.fb.array([]),
    });
  }


   ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.employeeId = +idParam;
        this.loadEmployeeData(this.employeeId);
      }
    });
  }

  // Getter for education array
  get educations(): FormArray {
    return this.form.get('educations') as FormArray;
  }

  // Create a new education form group
  createEducation(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      result: ['', Validators.required],
      passingYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  // Add new education
  addEducation() {
    this.educations.push(this.createEducation());
  }

  onAddEducationClick() {
  this.showEducationForm = true;
  this.addEducation(); // প্রথম Education form যোগ করে দেবে
}


  // Remove education form
  removeEducation(index: number) {
    this.educations.removeAt(index);
  }

  //loading data

  loadEmployeeData(id: number) {
    this.loading = true;
    this.svc.get(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });

        // Populate education form array
        if (data.educationList && data.educationList.length > 0) {
          this.showEducationForm = true;
          data.educationList.forEach((edu: any) => {
            const eduGroup = this.createEducation();
            eduGroup.patchValue({
              degree: edu.degree,
              institution: edu.institution,
              result: edu.result,
              passingYear: edu.passingYear
            });
            this.educations.push(eduGroup);
          });
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.loading = false;
      }
    });
  }


  // Save Employee + Education together
  // submit() {
  //   if (this.form.invalid) {
  //     alert('Please fill all required fields!');
  //     return;
  //   }

  //   this.loading = true;
  //   const educations = this.form.value.educations;
  //   const employeeData = {
  //     firstName: this.form.value.firstName,
  //     lastName: this.form.value.lastName,
  //     email: this.form.value.email,
  //     educationList:educations
  //   };
    
  //   console.log(employeeData);

  //   // 1️⃣ Step 1: Save Employee
  //   this.svc.create(employeeData).subscribe({
  //     next: () => {
  //        console.log('Employee saved');
  //       // //const objEmployee=JSON.parse(employee);

  //       // // 2️⃣ Step 2: Save all education info for that employee
  //       // const empId = employee.id;

  //       //console.log(employee.id);
  //      // console.log(empId);
  //      // const educations = this.form.value.educations;
  //       // console.log("educational date:")
  //       // console.log(educations);

  //       // if (educations && educations.length > 0) {
  //       //   educations.forEach((edu: any) => {
  //       //     this.educationService.addEducation( edu,empId).subscribe({
  //       //       next: () => console.log('Education saved for emp:', empId),
  //       //       error: () => console.error('Education save error:'),
  //       //     });
  //       //   });
  //       // }
  //       // alert('Employee and Education saved successfully!');
  //       // this.router.navigate(['/employees']);
  //     },
  //     error: (err) => {
  //       console.log(employeeData);
  //       console.error('Employee save error:', err);
  //       this.loading = false;
  //     },
  //     complete: () => (this.loading = false)
  //   });
  // }
    submit() {
    if (this.form.invalid) {
      alert('Please fill all required fields!');
      return;
    }

    const employeeData = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      educationList: this.form.value.educations
    };

    this.loading = true;

    if (this.isEdit && this.employeeId) {
      // 🔄 Update existing employee
      this.svc.update(this.employeeId, employeeData).subscribe({
        next: (data) => {
          alert('Employee updated successfully!');
          console.log(data);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.loading = false;
        },
        complete: () => (this.loading = false)
      });
    } else {
      // ➕ Create new employee
      this.svc.create(employeeData).subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Save failed:', err);
          this.loading = false;
        },
        complete: () => (this.loading = false)
      });
    }
  }
    
}
