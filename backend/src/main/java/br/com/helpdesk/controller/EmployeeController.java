package br.com.helpdesk.controller;
import br.com.helpdesk.model.Employee;
import br.com.helpdesk.repository.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/employees")
public class EmployeeController {
 private final EmployeeRepository repo;
 public EmployeeController(EmployeeRepository repo){this.repo=repo;}
 @GetMapping public List<Employee> list(){return repo.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Employee create(@Valid @RequestBody Employee e){e.setId(null);return repo.save(e);}
}