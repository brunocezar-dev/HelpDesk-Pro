package br.com.helpdesk.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity @Table(name="employees")
public class Employee {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false,length=100) private String name;
 @Email @NotBlank @Column(nullable=false,unique=true,length=140) private String email;
 @NotBlank @Pattern(regexp="EMPLOYEE|TECHNICIAN|ADMIN") @Column(nullable=false,length=20) private String role;
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getRole(){return role;} public void setRole(String v){role=v;}
}