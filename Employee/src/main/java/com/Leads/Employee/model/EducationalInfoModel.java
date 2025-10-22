package com.Leads.Employee.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.Year;
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="education")
public class EducationalInfoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="degree")
    private String degree ;
    @Column(name="institution")
    private String institution;
    @Column(name="result")
    private double result;
    @Column(name="passingYear")
    private Year passingYear;

    // Many Education to One Employee
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "employee_id") // foreign key in education table
    private EmployeeModel employee;

//    public EmployeeModel getEmployee() { return employee; }
//    public void setEmployee(EmployeeModel employee) { this.employee = employee; }

}
