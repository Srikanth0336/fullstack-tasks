package com.example.dataaccess.controller;

import com.example.dataaccess.model.Student;
import com.example.dataaccess.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/department/{department}")
    public List<Student> getStudentsByDepartment(@PathVariable String department) {
        return studentRepository.findByDepartment(department);
    }

    @GetMapping("/age-greater-than/{age}")
    public List<Student> getStudentsByAgeGreater(@PathVariable int age) {
        return studentRepository.findByAgeGreaterThan(age, Sort.by("age").descending());
    }

    @GetMapping("/department-paged/{department}")
    public Page<Student> getStudentsByDepartmentPaged(
            @PathVariable String department,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return studentRepository.findByDepartment(department, PageRequest.of(page, size, Sort.by("name")));
    }

    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String keyword) {
        return studentRepository.searchByNameContaining(keyword);
    }
}
