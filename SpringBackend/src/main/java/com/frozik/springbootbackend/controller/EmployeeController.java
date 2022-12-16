package com.frozik.springbootbackend.controller;

import com.frozik.springbootbackend.domain.Title;
import com.frozik.springbootbackend.exception.ResourceNotFoundException;
import com.frozik.springbootbackend.domain.Employee;
import com.frozik.springbootbackend.repository.EmployeeRepository;
import com.frozik.springbootbackend.repository.TitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TitleRepository titleRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/titles")
    public List<Title> getAllTitles() {
        return titleRepository.findAll();
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

    @GetMapping("/titles/{id}")
    public ResponseEntity<Title> getTitleById(@PathVariable long id) {
        Title title = titleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No titles with id:" + id));
        return ResponseEntity.ok(title);
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
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No employee with id %d found", id)));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
//        employee.setTitle(employeeDetails.getTitle());

        employeeRepository.save(employee);
        return ResponseEntity.ok(employee);

    }
}
