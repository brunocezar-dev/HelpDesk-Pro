package br.com.helpdesk.repository;
import br.com.helpdesk.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TicketRepository extends JpaRepository<Ticket,Long>{}