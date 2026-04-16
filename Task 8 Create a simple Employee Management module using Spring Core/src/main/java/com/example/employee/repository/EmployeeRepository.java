package com.example.employee.repository;

import com.example.employee.model.Employee;
import java.util.List;

public interface EmployeeRepository {
    void addEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int id);
}
