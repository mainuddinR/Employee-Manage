package com.Leads.Employee.Service;

import com.Leads.Employee.model.EducationalInfoModel;
import com.Leads.Employee.model.EmployeeModel;

import java.util.List;

public interface InEducationalInfoService {
    //List<EducationalInfoModel[]> findAllEducation();
    String addEducationInfo(long empId,EducationalInfoModel education);
    List<EducationalInfoModel> getEducationInfoByEmployee(long empId);
    EducationalInfoModel updateEducationalInfo(long educationId, EducationalInfoModel education);
    String deletedEducationalInfo(long educationId);

    EducationalInfoModel getEducationInfoById(long educationId);

}
