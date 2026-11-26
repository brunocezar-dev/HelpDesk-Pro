package br.com.helpdesk.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
@Entity @Table(name="tickets")
public class Ticket {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false,length=120) private String title;
 @NotBlank @Column(nullable=false,columnDefinition="TEXT") private String description;
 @NotNull @Column(nullable=false) private Long requesterId;
 private Long technicianId;
 @NotBlank @Pattern(regexp="LOW|MEDIUM|HIGH|URGENT") @Column(nullable=false,length=10) private String priority;
 @NotBlank @Pattern(regexp="OPEN|IN_PROGRESS|RESOLVED|CLOSED") @Column(nullable=false,length=20) private String status="OPEN";
 @Column(nullable=false) private LocalDateTime createdAt=LocalDateTime.now();
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getTitle(){return title;} public void setTitle(String v){title=v;}
 public String getDescription(){return description;} public void setDescription(String v){description=v;}
 public Long getRequesterId(){return requesterId;} public void setRequesterId(Long v){requesterId=v;}
 public Long getTechnicianId(){return technicianId;} public void setTechnicianId(Long v){technicianId=v;}
 public String getPriority(){return priority;} public void setPriority(String v){priority=v;}
 public String getStatus(){return status;} public void setStatus(String v){status=v;}
 public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){createdAt=v;}
}