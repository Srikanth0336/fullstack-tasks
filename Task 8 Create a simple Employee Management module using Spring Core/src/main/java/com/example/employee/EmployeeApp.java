package com.example.employee;

import com.example.employee.model.Employee;
import com.example.employee.service.EmployeeService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class EmployeeApp {
    public static void main(String[] args) {
        // Initializing the IoC Container (ApplicationContext is a BeanFactory)
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // Retrieving the service bean from the Spring container
        EmployeeService employeeService = context.getBean(EmployeeService.class);

        // Demonstrating Inversion of Control and Dependency Injection
        System.out.println("--- Spring Core Employee Management Demo ---");

        // Adding some employees (Stored in memory as per default service qualifier)
        employeeService.registerEmployee(new Employee(101, "Alice Johnson", "Engineering", 75000));
        employeeService.registerEmployee(new Employee(102, "Bob Smith", "Marketing", 60000));
        employeeService.registerEmployee(new Employee(103, "Charlie Davis", "HR", 55000));

        // Display results
        employeeService.displayAllEmployees();

        System.out.println("\nDemo complete. Verify MySQL connection settings in AppConfig.java to use MySQL repository.");
    }
}
