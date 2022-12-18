package com.frozik.springbootbackend.controller;

import com.frozik.springbootbackend.domain.Employee;
import com.frozik.springbootbackend.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<Employee> getAllEmployees() {
        log.info("getEmployeeByQuery was invoked.");
        List<Employee> employees = employeeService.getAllEmployees();
        log.info("getEmployeeByQuery completed.");
        return employees;
    }

    @PostMapping("/add-employee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        log.info("createEmployee was invoked.");
        HttpStatus status = HttpStatus.BAD_REQUEST;
        try {
            employeeService.createEmployee(employee);
            status = HttpStatus.CREATED;
        } catch (Exception e) {
            log.error("Error creating employee {}", e.getMessage());
        }
        log.info("createEmployee completed.");
        return ResponseEntity
                .status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .body(employee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
        log.info("getEmployeeById was invoked.");
        Employee employee = employeeService.getEmployeeById(id);
        log.info("getEmployee completed.");
        if(employee != null){
            log.debug("Employee was found with Id {}, name {} {} and email {}",
                    employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(employee);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/search-employee/{query}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Employee> getEmployeeByQuery(@PathVariable String query) {
        log.info("getEmployeeByQuery was invoked.");
        List<Employee> employees = employeeService.getEmployeesByParam(query);
        log.info("getEmployeeByQuery completed.");
        return employees;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id) {
        log.info("deleteEmployee was invoked");
        HttpStatus status = HttpStatus.BAD_REQUEST;
        try {
            employeeService.deleteEmployee(id);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            log.error("Error deleting employee: {}", e.getMessage());
        }
        log.info("deleteEmployee completed.");
        return new ResponseEntity<>(status);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employeeDetails) {
        log.info("updateEmployee was invoked");
        Employee updatedEmployee = null;
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if(employeeDetails != null){
            updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
            status = HttpStatus.ACCEPTED;
        }
        log.info("updateEmployee completed.");
        return ResponseEntity.status(status).body(updatedEmployee);
    }
}
