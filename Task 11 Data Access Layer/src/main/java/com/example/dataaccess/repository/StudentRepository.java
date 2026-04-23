package com.example.dataaccess.repository;

import com.example.dataaccess.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom query method based on department
    List<Student> findByDepartment(String department);

    // Custom query method based on age with sorting
    List<Student> findByAgeGreaterThan(int age, Sort sort);

    // Pagination example finding by department
    Page<Student> findByDepartment(String department, Pageable pageable);

    // Custom JPQL query
    @Query("SELECT s FROM Student s WHERE s.name LIKE %:keyword%")
    List<Student> searchByNameContaining(@Param("keyword") String keyword);
}
