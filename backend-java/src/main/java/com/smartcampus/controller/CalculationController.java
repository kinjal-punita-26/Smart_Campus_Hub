package com.smartcampus.controller;

import com.smartcampus.dto.GradeRequest;
import com.smartcampus.service.CalculationService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/calculate")
@CrossOrigin(origins = "*")
public class CalculationController {

    private final CalculationService calculationService;

    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @PostMapping("/sgpa")
    public Map<String, Object> calculateSGPA(@RequestBody GradeRequest request) {
        double sgpa = calculationService.calculateSGPA(request);
        Map<String, Object> response = new HashMap<>();
        response.put("sgpa", sgpa);
        return response;
    }
}
