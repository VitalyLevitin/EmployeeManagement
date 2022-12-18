package com.frozik.springbootbackend.service.impl;

import com.frozik.springbootbackend.domain.Employee;
import com.frozik.springbootbackend.exception.ResourceNotFoundException;
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

    private final List<String> icons = List.of(
            "https://www.shareicon.net/data/256x256/2016/01/06/234422_bender_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234428_fry_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234420_nibbler_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234424_farnsworth_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234419_zoidberg_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234426_hermes_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234425_amy_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234423_scruffy_256x256.png",
            "https://www.shareicon.net/data/256x256/2016/01/06/234431_leela_256x256.png"
    );

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
        return employeeRepository.findByFirstNameOrLastNameOrEmailContaining(query)
                .orElse(null);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        if(id < 0 || id >= Long.MAX_VALUE)
            return null;
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.orElse(null);
    }

    public Employee getEmployeeByEmail(String email){
        return employeeRepository.findByEmail(email)
                .orElse(null);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        String email = employee.getEmail();
        if( email != null && email.length() > 2 && this.getEmployeeByEmail(email) != null)
            throw new DataIntegrityViolationException("Email already exists");
        Employee newEmployee = null;
        try {
            if(employee.getImageURL()==null)
                employee.setImageURL(randomImage());
            newEmployee = employeeRepository.save(employee);
        } catch (Exception e) {
            log.error("Error trying to create Employee {}", e.getMessage());
        }
        return newEmployee;
    }

    private String randomImage() {
        int randomNum = ThreadLocalRandom.current().nextInt(0, icons.size()-1);
        return icons.get(randomNum);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isEmpty()){
            log.error("No employee with id: {}", id);
            return null;
        }
        Employee currentEmployee = optionalEmployee.get();
        if(employee.getFirstName() != null)
            currentEmployee.setFirstName(employee.getFirstName());
        if(employee.getLastName() != null)
            currentEmployee.setLastName(employee.getLastName());
        if(employee.getEmail() != null)
            currentEmployee.setEmail(employee.getEmail());
        return currentEmployee;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        if(id < 0 || id >= Long.MAX_VALUE)
            return false;
        employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No employee with id:" + id));
        try {
            employeeRepository.deleteById(id);
        } catch (Exception e) {
            log.error("Error during employee deletion: {}", e.getMessage());
            throw new InvalidDataAccessResourceUsageException(e.getMessage());
        }
        return true;
    }
}
