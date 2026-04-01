# Employee Management System
### Full Stack Java Project | Spring Boot + MySQL + HTML/CSS/JS

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Java 17, Spring Boot 3.2          |
| Database   | MySQL 8                           |
| ORM        | Spring Data JPA / Hibernate       |
| Frontend   | HTML5, CSS3, Vanilla JavaScript   |
| API Style  | REST API (JSON)                   |
| Build Tool | Maven                             |

---

## Features

- ✅ Add new employee with validation
- ✅ View all employees in a table
- ✅ Edit employee details
- ✅ Delete employee
- ✅ Search by name, email, or department
- ✅ Dashboard with total count stats
- ✅ Toast notifications for actions
- ✅ Responsive design

---

## REST API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/employees`                | Get all employees        |
| GET    | `/api/employees/{id}`           | Get employee by ID       |
| POST   | `/api/employees`                | Add new employee         |
| PUT    | `/api/employees/{id}`           | Update employee          |
| DELETE | `/api/employees/{id}`           | Delete employee          |
| GET    | `/api/employees/search?keyword` | Search employees         |
| GET    | `/api/employees/stats`          | Get dashboard stats      |

---

## How to Run

### Step 1 — Setup MySQL
```sql
-- Open MySQL and run:
CREATE DATABASE ems_db;
```
Then run `database/setup.sql` to create table and insert sample data.

### Step 2 — Configure Database
Open `src/main/resources/application.properties` and update:
```properties
spring.datasource.password=your_mysql_password
```

### Step 3 — Run the Application
```bash
mvn spring-boot:run
```

### Step 4 — Open in Browser
```
http://localhost:8081
```

---

## Project Structure
```
EmployeeManagementSystem/
├── src/main/java/com/ems/
│   ├── EmployeeManagementSystemApplication.java
│   ├── controller/EmployeeController.java
│   ├── model/Employee.java
│   ├── repository/EmployeeRepository.java
│   ├── service/EmployeeService.java
│   └── exception/GlobalExceptionHandler.java
├── src/main/resources/
│   ├── application.properties
│   └── static/
│       ├── index.html
│       ├── style.css
│       └── app.js
├── database/setup.sql
└── pom.xml
```

---

## Author
**Vandana K S**  
Java Full Stack Developer | MCA  2026
Cambridge Institute of Technology
