package br.com.helpdesk.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="ticket_history")
public class TicketHistory {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private Long ticketId;
 @Column(nullable=false,length=30) private String action;
 @Column(length=500) private String details;
 @Column(nullable=false) private LocalDateTime createdAt=LocalDateTime.now();
 public Long getId(){return id;} public Long getTicketId(){return ticketId;} public void setTicketId(Long v){ticketId=v;}
 public String getAction(){return action;} public void setAction(String v){action=v;}
 public String getDetails(){return details;} public void setDetails(String v){details=v;}
 public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){createdAt=v;}
}