package com.frozik.springbootbackend.repository;

import com.frozik.springbootbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
