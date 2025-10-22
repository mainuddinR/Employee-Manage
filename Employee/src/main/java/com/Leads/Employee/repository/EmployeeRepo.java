package com.Leads.Employee.repository;

import com.Leads.Employee.model.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<EmployeeModel, Long > {//Long hlo type of the primary key
}
