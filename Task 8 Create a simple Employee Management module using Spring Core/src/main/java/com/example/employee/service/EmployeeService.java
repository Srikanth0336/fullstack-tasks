package com.example.employee.service;

import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeService {

    // Demonstrating Dependency Injection using @Autowired
    // We use @Qualifier to specify which implementation to use
    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(@Qualifier("mysqlRepo") EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void registerEmployee(Employee employee) {
        employeeRepository.addEmployee(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    public void displayAllEmployees() {
        System.out.println("--- Employee List ---");
        getAllEmployees().forEach(System.out::println);
    }
}
