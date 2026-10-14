package com.smartcampus.service;

import com.smartcampus.dto.GradeRequest;
import org.springframework.stereotype.Service;

@Service
public class CalculationService {
    
    public double calculateSGPA(GradeRequest request) {
        if (request.getCourses() == null || request.getCourses().isEmpty()) return 0.0;
        
        double totalCredits = 0;
        double earnedPoints = 0;
        
        for (GradeRequest.CourseGrade course : request.getCourses()) {
            totalCredits += course.getCredits();
            earnedPoints += (course.getCredits() * course.getGradePoints());
        }
        
        if (totalCredits == 0) return 0.0;
        
        return Math.round((earnedPoints / totalCredits) * 100.0) / 100.0; // Two decimal places
    }
}
