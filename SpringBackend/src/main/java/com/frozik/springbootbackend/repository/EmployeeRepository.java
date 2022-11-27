package com.frozik.springbootbackend.repository;

import com.frozik.springbootbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByFirstName(String query);

    List<Employee> findByFirstNameContaining(String query);
}
