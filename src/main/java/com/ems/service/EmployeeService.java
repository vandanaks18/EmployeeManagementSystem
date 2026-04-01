package com.ems.service;

import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return employee.get();
        }
        throw new RuntimeException("Employee not found with ID: " + id);
    }

    // Add new employee
    public Employee addEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Employee with email '" + employee.getEmail() + "' already exists.");
        }
        return employeeRepository.save(employee);
    }

    // Update existing employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existing = getEmployeeById(id);

        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setDesignation(updatedEmployee.getDesignation());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setPhone(updatedEmployee.getPhone());

        return employeeRepository.save(existing);
    }

    // Delete employee
    public void deleteEmployee(Long id) {
        Employee existing = getEmployeeById(id);
        employeeRepository.delete(existing);
    }

    // Search employees
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.searchEmployees(keyword);
    }

    // Get employees by department
    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }

    // Get total count
    public long getTotalEmployees() {
        return employeeRepository.count();
    }
}
