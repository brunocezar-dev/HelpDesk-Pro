package br.com.helpdesk.controller;
import br.com.helpdesk.model.*;
import br.com.helpdesk.repository.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController @RequestMapping("/api/tickets")
public class TicketController {
 private final TicketRepository tickets; private final TicketHistoryRepository history;
 public TicketController(TicketRepository tickets,TicketHistoryRepository history){this.tickets=tickets;this.history=history;}
 @GetMapping public List<Ticket> list(){return tickets.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Ticket create(@Valid @RequestBody Ticket t){
  t.setId(null);Ticket saved=tickets.save(t);record(saved.getId(),"CREATED","Chamado aberto");return saved;
 }
 @PatchMapping("/{id}/status") public Ticket status(@PathVariable Long id,@RequestBody Map<String,String> body){
  Ticket t=tickets.findById(id).orElseThrow(()->new IllegalArgumentException("Chamado não encontrado"));
  String next=body.get("status");
  if(!List.of("OPEN","IN_PROGRESS","RESOLVED","CLOSED").contains(next))throw new IllegalArgumentException("Status inválido");
  String old=t.getStatus();t.setStatus(next);Ticket saved=tickets.save(t);record(id,"STATUS_CHANGED",old+" -> "+next);return saved;
 }
 @GetMapping("/{id}/history") public List<TicketHistory> history(@PathVariable Long id){return history.findByTicketIdOrderByCreatedAtDesc(id);}
 private void record(Long id,String action,String details){TicketHistory h=new TicketHistory();h.setTicketId(id);h.setAction(action);h.setDetails(details);history.save(h);}
}