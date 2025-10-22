package com.Leads.Employee.Service;

import com.Leads.Employee.model.EducationalInfoModel;
import com.Leads.Employee.model.EmployeeModel;
import com.Leads.Employee.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
@Service
public class EmployeeService implements InEmployeeService{

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private EducationalInfoService educationalInfoService;

    @Override
    public List<EmployeeModel> getAllEmployee(){
        return employeeRepo.findAll();
    }

    @Override
    public void addEmployee( EmployeeModel emp){
        emp.getEducationList().forEach(edu-> edu.setEmployee(emp));
         employeeRepo.save(emp);
        //return "Employee added successfully";
    }

    @Override
    public String deleteEmployee( long id) {
         employeeRepo.deleteById(id);
        return "Employee deleted successfully";
    }

    @Override
    public EmployeeModel updateEmployee( long id, EmployeeModel emp){
        EmployeeModel empT=employeeRepo.findById(id).orElse(null);
        //empT.getEducationList()
        if(empT==null) {return null;}


            empT.setFirstName(emp.getFirstName());
            empT.setLastName(emp.getLastName());
            empT.setEmail(emp.getEmail());
            empT.getEducationList().clear();

        if (emp.getEducationList() != null) {
            for (EducationalInfoModel edu : emp.getEducationList()) {
                // employee reference set kortei hobe
                edu.setEmployee(empT);
                empT.getEducationList().add(edu);
            }
        }
        return employeeRepo.save(empT);

    }

    @Override
    public EmployeeModel getEmployee( long id){
        return employeeRepo.findById(id).get();
    }
}
