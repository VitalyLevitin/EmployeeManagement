package com.frozik.springbootbackend.repository;

import com.frozik.springbootbackend.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("Select e FROM Employee e where " +
            "e.firstName like CONCAT('%',:query,'%') " +
            "or e.lastName like CONCAT('%',:query,'%') " +
            "or e.email like CONCAT('%',:query,'%')")
    List<Employee> findByFirstNameOrLastNameOrEmailContaining(@Param("query")String query);
}
