package com.smartcampus.dto;
import java.util.List;

public class GradeRequest {
    private List<CourseGrade> courses;

    public List<CourseGrade> getCourses() { return courses; }
    public void setCourses(List<CourseGrade> courses) { this.courses = courses; }

    public static class CourseGrade {
        private int credits;
        private int gradePoints; // Example: 10 for O, 9 for A+, etc.

        public int getCredits() { return credits; }
        public void setCredits(int credits) { this.credits = credits; }
        
        public int getGradePoints() { return gradePoints; }
        public void setGradePoints(int gradePoints) { this.gradePoints = gradePoints; }
    }
}
