package com.frozik.springbootbackend.controller;

import com.frozik.springbootbackend.exception.ResourceNotFoundException;
import com.frozik.springbootbackend.domain.Employee;
import com.frozik.springbootbackend.repository.EmployeeRepository;
import com.frozik.springbootbackend.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        log.info("getAllEmployees was invoked");
        List<Employee> employees = employeeRepository.findAll();
        return employees;
    }

    @PostMapping("/add-employee")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No employee with id:" + id));
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/search-employee/{query}")
    public List<Employee> getEmployeeByQuery(@PathVariable String query) {
        return employeeRepository.findByFirstNameOrLastNameOrEmailContaining(query);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No employee with id:" + id));
        employeeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employeeDetails) {
        log.info("updateEmployee was invoked");
        Employee updatedEmployee = null;
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if(employeeDetails != null){
            updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
            try {
                employeeService.createEmployee(updatedEmployee);
                status = HttpStatus.ACCEPTED;
            } catch (Exception e) {
                log.error("Error creating employee: {}", e.getMessage());
            }
        }
        log.info("updateEmployee completed.");
        return ResponseEntity.status(status).body(updatedEmployee);
    }
}
