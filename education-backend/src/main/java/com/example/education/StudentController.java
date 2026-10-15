
package com.example.education;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerStudent(
            @Valid @RequestBody StudentRegistrationRequest request) {

        Student student = studentService.registerStudent(request);

        Map<String, Object> response = Map.of(
                "message", "Student registered successfully",
                "id", student.getId(),
                "name", student.getName(),
                "email", student.getEmail(),
                "branch", student.getBranch()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginStudent(
            @Valid @RequestBody StudentLoginRequest request) {

        Student student = studentService.loginStudent(request);

        Map<String, Object> response = Map.of(
                "message", "Login successful",
                "id", student.getId(),
                "name", student.getName(),
                "email", student.getEmail(),
                "branch", student.getBranch()
        );

        return ResponseEntity.ok(response);
    }
}
