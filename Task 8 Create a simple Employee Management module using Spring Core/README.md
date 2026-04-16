# Employee Management Module (Spring Core)

This project demonstrates the core concepts of **Inversion of Control (IoC)** and **Dependency Injection (DI)** using Spring Framework annotations.

## 🚀 Features
- **IoC Container**: Uses `ApplicationContext` (BeanFactory) to manage object lifecycles.
- **Dependency Injection**: Achieved through `@Autowired` and constructor injection.
- **Annotations**: Uses `@Component`, `@Configuration`, `@ComponentScan`, and `@Qualifier`.
- **Data Storage**: 
  - **In-Memory**: Uses `InMemoryEmployeeRepository` for quick demonstration.
  - **MySQL**: Uses `MySQLEmployeeRepository` with `JdbcTemplate` for persistent storage.

## 🛠️ Prerequisites
- JDK 17 or higher
- Apache Maven
- MySQL Server

## ⚙️ Configuration
1. **MySQL Setup**:
   - Run the provided `setup.sql` script in your MySQL workbench or terminal.
   - Update the database credentials in `src/main/java/com/example/employee/AppConfig.java`:
     ```java
     dataSource.setUsername("your_username");
     dataSource.setPassword("your_password");
     ```

2. **Switching Repositories**:
   - The application is currently configured to use **MySQL Repository** (`mysqlRepo`).
   - Database credentials have been updated in `AppConfig.java`.

## 🏃 How to Run
1. Open the project folder in VS Code.
2. Ensure you have the **Extension Pack for Java** installed.
3. Open `src/main/java/com/example/employee/EmployeeApp.java`.
4. Click **Run** or use the terminal:
   ```bash
   mvn compile exec:java -Dexec.mainClass="com.example.employee.EmployeeApp"
   ```

## 📂 Project Structure
- `model/`: The `Employee` POJO.
- `repository/`: Interface and implementations for data access.
- `service/`: Business logic using injected dependencies.
- `AppConfig.java`: Configuration for Spring context and DataSource.
- `EmployeeApp.java`: Entry point demonstrating the IoC container.
