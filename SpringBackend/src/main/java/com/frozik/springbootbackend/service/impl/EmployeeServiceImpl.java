package com.frozik.springbootbackend.service.impl;

import com.frozik.springbootbackend.domain.Employee;
import com.frozik.springbootbackend.repository.EmployeeRepository;
import com.frozik.springbootbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;


@AllArgsConstructor
@Slf4j
@Transactional
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private final EmployeeRepository employeeRepository;

    private final String[] icons = {
            "https://www.shareicon.net/data/256x256/2016/01/06/234422_bender_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234428_fry_256x256.png"
    };

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employees = null;
        try {
            employees = employeeRepository.findAll();
        } catch (InvalidDataAccessResourceUsageException e) {
            log.error("getAllEmployees -> Could not fetch data {}", e.getMessage());
        } catch (Exception e) {
            log.error("getAllEmployees -> Unknown error {}", e.getMessage());
        }
        return employees;
    }

    @Override
    public List<Employee> getEmployeesByParam(String query) {
        return employeeRepository.findByFirstNameOrLastNameOrEmailContaining(query);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        if(id < 0 || id >= Long.MAX_VALUE)
            return null;
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.orElse(null);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        String email = employee.getEmail();
        if( email != null && email.length() > 2 && this.employeeRepository.findByEmail(email))
            throw new DataIntegrityViolationException("Email already exists");
        Employee newEmployee = null;
        try {
            employee.setImageURL(randomImage());
            newEmployee = employeeRepository.save(employee);
        } catch (Exception e) {
            log.error("Error trying to create Employee {}", e.getMessage());
        }
        return newEmployee;
    }

    private String randomImage() {
        int randomNum = ThreadLocalRandom.current().nextInt(0, icons.length);
        return icons[randomNum];
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        return null;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        return false;
    }
}
