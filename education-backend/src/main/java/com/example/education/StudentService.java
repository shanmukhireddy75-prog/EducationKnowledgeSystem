
package com.example.education;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Student registerStudent(StudentRegistrationRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (studentRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "An account with this email already exists");
        }

        Student student = new Student();
        student.setName(request.getName().trim());
        student.setEmail(email);
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setBranch(request.getBranch().trim());

        return studentRepository.save(student);
    }

    @Transactional(readOnly = true)
    public Student loginStudent(StudentLoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(), student.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password");
        }

        return student;
    }
}
