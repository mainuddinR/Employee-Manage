package com.Leads.Employee.controller;

import com.Leads.Employee.Service.EducationalInfoService;
import com.Leads.Employee.Service.EmployeeService;
import com.Leads.Employee.model.EducationalInfoModel;
import com.Leads.Employee.model.EmployeeModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EducationalInfoService educationalInfoService;
//    private EmployeeRepo employeeRepo;

    @GetMapping("employee")
    public List<EmployeeModel> getAllEmployee(){
        return employeeService.getAllEmployee();
    }

    @PostMapping("employee")
    public void addEmployee(@RequestBody EmployeeModel emp){
         employeeService.addEmployee(emp);
    }
    @DeleteMapping("employee/{id}")
    public String deleteEmployee(@PathVariable long id) {
        return employeeService.deleteEmployee(id);
    }
    @PutMapping("employee/{id}")
    public EmployeeModel updateEmployee(@PathVariable long id, @RequestBody EmployeeModel emp){
        return employeeService.updateEmployee(id, emp);
    }
    @GetMapping("employee/{id}")
    public EmployeeModel getEmployee(@PathVariable long id){
        return employeeService.getEmployee(id);
    }

    @GetMapping("/employee/education/{empId}")
    public List<EducationalInfoModel> getEmployeeEducation(@PathVariable long empId){
        return educationalInfoService.getEducationInfoByEmployee(empId);
    }

    @PostMapping("/employee/education/{empId}")
    public String addEmployeeEducation(@PathVariable long empId, @RequestBody EducationalInfoModel educ){
        educationalInfoService.addEducationInfo(empId,educ);
        return "Employee education added";
    }

    @DeleteMapping("employee/education/del/{educationId}")
    public String deleteEmployeeEducation(@PathVariable long educationId){
        educationalInfoService.deletedEducationalInfo(educationId);
        return "Employee education deleted";
    }

    @PutMapping("employee/education/put/{educationId}")
    public EducationalInfoModel updateEducationalInfo(@PathVariable long educationId, @RequestBody EducationalInfoModel educ){
        return educationalInfoService.updateEducationalInfo(educationId,educ);
    }

    @GetMapping("employee/education/get/{educationId}")
    public EducationalInfoModel getEducationInfoById(@PathVariable long educationId){
        return educationalInfoService.getEducationInfoById(educationId);
    }

}
