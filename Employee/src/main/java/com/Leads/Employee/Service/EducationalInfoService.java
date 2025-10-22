package com.Leads.Employee.Service;

import com.Leads.Employee.model.EducationalInfoModel;
import com.Leads.Employee.model.EmployeeModel;
import com.Leads.Employee.repository.EductionalInfoRepo;
import com.Leads.Employee.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Service
public class EducationalInfoService implements InEducationalInfoService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private EductionalInfoRepo educationRepo;

    @Override
    public String addEducationInfo(long empId, EducationalInfoModel education) {
        Optional<EmployeeModel> empOpt = employeeRepo.findById(empId);
        if (empOpt.isPresent()) {
            EmployeeModel employee = empOpt.get();
            education.setEmployee(employee);
            educationRepo.save(education);
            return "Education added successfully..........................";
        }
        return "Employee not found";
    }

    @Override
    public List<EducationalInfoModel> getEducationInfoByEmployee(long empId) {
        Optional<EmployeeModel> empOpt = employeeRepo.findById(empId);
        if (empOpt.isPresent()) {
            return empOpt.get().getEducationList();
        }
        return null;
    }

    @Override
    public EducationalInfoModel updateEducationalInfo(long educationId, EducationalInfoModel education) {
        Optional<EducationalInfoModel> eduOpt = educationRepo.findById((long)educationId);
        if (eduOpt.isPresent()) {
            EducationalInfoModel existingEdu = eduOpt.get();
            existingEdu.setDegree(education.getDegree());
            existingEdu.setInstitution(education.getInstitution());
            existingEdu.setResult(education.getResult());
            existingEdu.setPassingYear(education.getPassingYear());
            return educationRepo.save(existingEdu);
        }
        return null;
    }

    @Override
    public String deletedEducationalInfo(long educationId) {
        Optional<EducationalInfoModel> eduOpt = educationRepo.findById((long)educationId);
        if (eduOpt.isPresent()) {
            educationRepo.deleteById((long)educationId);
            return "Education record deleted successfully";
        }
        return "Education record not found";
    }

    @Override
    public EducationalInfoModel getEducationInfoById(long educationId) {
        Optional<EducationalInfoModel> eduOpt = educationRepo.findById((long)educationId);
        return eduOpt.orElse(null);
    }
}
