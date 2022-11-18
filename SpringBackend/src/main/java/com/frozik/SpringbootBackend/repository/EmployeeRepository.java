package com.frozik.SpringbootBackend.repository;

import com.frozik.SpringbootBackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
