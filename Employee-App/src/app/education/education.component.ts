import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EducationServiceService } from '../services/education-service.service';
import { Router } from '@angular/router';
import { EducationInfo } from '../models/education-info';

@Component({
  selector: 'app-education',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{
    educationForm!:FormGroup
  degreeList: string[] = [
    'SSC',
    'HSC',
    'Diploma',
    'BSc',
    'MSc',
    'PhD'
  ];

  constructor(
    private fb: FormBuilder,
    private educationService:EducationServiceService,
    private router:Router
  ) {
    // this.educationForm = this.fb.group({
    //   educations: this.fb.array([this.createEducation()])
    // });
  }

  ngOnInit(): void {
    this.educationForm=this.fb.group({
      educations: this.fb.array([this.createEducation()])
    })
  }

  // Get FormArray
  get educations(): FormArray {
    return this.educationForm.get('educations') as FormArray;
  }

  // Create one education group
  createEducation(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      result: ['', Validators.required],
      passingYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$'),Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  // Add new education field
  addEducation() {
    this.educations.push(this.createEducation());
    console.log(this.educations.get)

  }

  // Remove specific education
  removeEducation(index: number) {
    this.educations.removeAt(index);
  }
 // educationInfo:EducationInfo=
  // Submit form
  saveEducation() {
    const eduArray = this.educationForm.value.educations;
    const id=2
    eduArray.forEach((edu:any)=>{
      console.log(edu);
      this.educationService.addEducation(edu,id).subscribe({
        next:(res)=>console.log("Saved:",res),
        error:(err)=> console.log('Error: ',err)
      })
    })
    // if (this.educationForm.valid) {
    //   console.log('All Educational Info:', this.educationForm.value.educations);
    //   alert('Education info saved successfully!');
    // } else {
    //   alert('Please fill all required fields!');
    // }
  }
}


