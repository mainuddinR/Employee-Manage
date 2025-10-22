package com.Leads.Employee.repository;

import com.Leads.Employee.model.EducationalInfoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EductionalInfoRepo extends JpaRepository<EducationalInfoModel, Long> {}