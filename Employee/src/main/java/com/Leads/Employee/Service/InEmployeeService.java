package com.Leads.Employee.Service;

import com.Leads.Employee.model.EducationalInfoModel;
import com.Leads.Employee.model.EmployeeModel;

import java.util.List;

public interface InEmployeeService {
    List<EmployeeModel> getAllEmployee();
    void addEmployee(EmployeeModel emp);
    String deleteEmployee(long id);
    EmployeeModel updateEmployee(long id, EmployeeModel emp);
    EmployeeModel getEmployee(long id);

//    String addEducation(long empId, EducationalInfoModel education);
//    List<EducationalInfoModel> getEducationalByEmployee(long empId);
}
