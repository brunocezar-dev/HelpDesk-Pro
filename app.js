// Modo demonstração: dados salvos no localStorage. Para usar a API, mude DEMO_MODE para false.
const API_URL="http://localhost:8080/api";
const DEMO_MODE=true;
let employees=[],tickets=[],statusChart;
const $=id=>document.getElementById(id);
const statusNames={OPEN:"Aberto",IN_PROGRESS:"Em andamento",RESOLVED:"Resolvido",CLOSED:"Fechado"};
const priorityNames={LOW:"Baixa",MEDIUM:"Média",HIGH:"Alta",URGENT:"Urgente"};
function seed(){
 employees=JSON.parse(localStorage.getItem("hd_employees")||"null")||[
  {id:1,name:"Ana Souza",email:"ana@empresa.com",role:"EMPLOYEE"},
  {id:2,name:"Carlos Lima",email:"carlos@empresa.com",role:"TECHNICIAN"},
  {id:3,name:"Marina Alves",email:"marina@empresa.com",role:"TECHNICIAN"},
  {id:4,name:"Paulo Mendes",email:"paulo@empresa.com",role:"ADMIN"}];
 tickets=JSON.parse(localStorage.getItem("hd_tickets")||"null")||[
  {id:1001,title:"Computador não liga",description:"Estação não inicia.",requesterId:1,technicianId:2,priority:"HIGH",status:"IN_PROGRESS",createdAt:new Date().toISOString()},
  {id:1002,title:"Acesso ao sistema",description:"Solicitação de acesso.",requesterId:1,technicianId:3,priority:"MEDIUM",status:"OPEN",createdAt:new Date().toISOString()},
  {id:1003,title:"Instalação de impressora",description:"Impressora configurada.",requesterId:4,technicianId:2,priority:"LOW",status:"RESOLVED",createdAt:new Date().toISOString()},
  {id:1004,title:"Internet indisponível",description:"Sem conexão no setor.",requesterId:4,technicianId:3,priority:"URGENT",status:"OPEN",createdAt:new Date().toISOString()}];
 save();
}
function save(){localStorage.setItem("hd_employees",JSON.stringify(employees));localStorage.setItem("hd_tickets",JSON.stringify(tickets));}
async function request(path,options={}){const r=await fetch(API_URL+path,{...options,headers:{"Content-Type":"application/json",...(options.headers||{})}});if(!r.ok)throw Error("Falha na API. Verifique o backend.");if(r.status===204)return null;return r.json();}
function person(id){return employees.find(e=>Number(e.id)===Number(id));}
function safe(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function roleName(r){return r==="TECHNICIAN"?"Técnico de suporte":r==="ADMIN"?"Administrador":"Funcionário";}
function render(){
 $("totalCount").textContent=tickets.length;
 $("openCount").textContent=tickets.filter(t=>t.status==="OPEN").length;
 $("progressCount").textContent=tickets.filter(t=>t.status==="IN_PROGRESS").length;
 $("resolvedCount").textContent=tickets.filter(t=>t.status==="RESOLVED"||t.status==="CLOSED").length;
 renderTickets();renderEmployees();renderPriority();renderChart();fillPeopleSelects();
}
function renderTickets(){
 const term=$("searchInput").value.toLowerCase(),filter=$("statusFilter").value;
 const list=tickets.filter(t=>(filter==="ALL"||t.status===filter)&&(`${t.title} ${t.id} ${person(t.requesterId)?.name||""}`).toLowerCase().includes(term)).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
 $("ticketTable").innerHTML=list.length?list.map(t=>`<tr>
 <td><span class="ticket-name">${safe(t.title)}</span><span class="ticket-id">#HD-${t.id}</span></td>
 <td>${safe(person(t.requesterId)?.name||"Não definido")}</td><td>${safe(person(t.technicianId)?.name||"Não atribuído")}</td>
 <td><span class="pill priority-${t.priority.toLowerCase()}">${priorityNames[t.priority]}</span></td>
 <td><span class="pill ${statusClass(t.status)}">${statusNames[t.status]}</span></td>
 <td>${new Date(t.createdAt).toLocaleDateString("pt-BR")}</td>
 <td><select class="action-select" data-status-id="${t.id}" aria-label="Alterar status do chamado ${t.id}">${Object.entries(statusNames).map(([k,v])=>`<option value="${k}" ${t.status===k?"selected":""}>${v}</option>`).join("")}</select></td>
 </tr>`).join(""):'<tr><td colspan="7" class="empty">Nenhum chamado encontrado.</td></tr>';
}
function statusClass(s){return {OPEN:"status-open",IN_PROGRESS:"status-progress",RESOLVED:"status-resolved",CLOSED:"status-closed"}[s];}
function renderEmployees(){
 $("employeeList").innerHTML=employees.length?employees.map(e=>`<div class="member"><div class="avatar">${safe(e.name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase())}</div><div><b>${safe(e.name)}</b><small>${roleName(e.role)} · ${safe(e.email)}</small></div></div>`).join(""):'<p class="empty">Nenhum funcionário cadastrado.</p>';
}
function renderPriority(){
 const active=tickets.filter(t=>!["RESOLVED","CLOSED"].includes(t.status));
 $("prioritySummary").innerHTML=Object.entries(priorityNames).map(([key,label])=>`<div class="priority-item"><span><i class="priority-dot" style="background:${{LOW:"#6b9bd2",MEDIUM:"#8272d5",HIGH:"#d58b37",URGENT:"#dc5969"}[key]}"></i>${label}</span><strong>${active.filter(t=>t.priority===key).length}</strong></div>`).join("");
}
function renderChart(){
 if(!window.Chart)return;if(statusChart)statusChart.destroy();
 statusChart=new Chart($("statusChart"),{type:"bar",data:{labels:Object.values(statusNames),datasets:[{data:Object.keys(statusNames).map(k=>tickets.filter(t=>t.status===k).length),backgroundColor:["#d99b4b","#568bd1","#27a47b","#a3a9b4"],borderRadius:6,maxBarThickness:38}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0,font:{size:9}},grid:{color:"#f0f1f5"}},x:{grid:{display:false},ticks:{font:{size:9}}}}}});
}
function fillPeopleSelects(){
 const requesters=employees.filter(e=>e.role!=="TECHNICIAN"),techs=employees.filter(e=>e.role==="TECHNICIAN"||e.role==="ADMIN");
 $("requesterSelect").innerHTML=requesters.map(e=>`<option value="${e.id}">${safe(e.name)}</option>`).join("");
 $("technicianSelect").innerHTML='<option value="">Não atribuído</option>'+techs.map(e=>`<option value="${e.id}">${safe(e.name)}</option>`).join("");
}
function modal(id,open=true){$(id).classList.toggle("open",open);}
$("newTicketBtn").addEventListener("click",()=>modal("ticketModal"));
$("newEmployeeBtn").addEventListener("click",()=>modal("employeeModal"));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>modal(b.dataset.close,false)));
document.querySelectorAll(".backdrop").forEach(b=>b.addEventListener("click",e=>{if(e.target===b)modal(b.id,false);}));
$("searchInput").addEventListener("input",renderTickets);$("statusFilter").addEventListener("change",renderTickets);
$("ticketForm").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target);
 const t={title:f.get("title").trim(),description:f.get("description").trim(),requesterId:Number(f.get("requesterId")),technicianId:f.get("technicianId")?Number(f.get("technicianId")):null,priority:f.get("priority"),status:f.get("status")};
 try{if(DEMO_MODE){t.id=Date.now();t.createdAt=new Date().toISOString();tickets.push(t);save();}else await request("/tickets",{method:"POST",body:JSON.stringify(t)});e.target.reset();modal("ticketModal",false);await reload();}
 catch(err){$("ticketMessage").textContent=err.message;}
});
$("employeeForm").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target),personData={name:f.get("name").trim(),email:f.get("email").trim(),role:f.get("role")};
 try{if(DEMO_MODE){personData.id=Date.now();employees.push(personData);save();}else await request("/employees",{method:"POST",body:JSON.stringify(personData)});e.target.reset();modal("employeeModal",false);await reload();}
 catch(err){$("employeeMessage").textContent=err.message;}
});
document.addEventListener("change",async e=>{
 if(!e.target.matches("[data-status-id]"))return;
 const id=Number(e.target.dataset.statusId),status=e.target.value;
 try{if(DEMO_MODE){tickets=tickets.map(t=>t.id===id?{...t,status}:t);save();}else await request(`/tickets/${id}/status`,{method:"PATCH",body:JSON.stringify({status})});await reload();}
 catch(err){alert(err.message);}
});
async function reload(){
 if(!DEMO_MODE){try{[tickets,employees]=await Promise.all([request("/tickets"),request("/employees")]);}catch(e){alert(e.message);return;}}
 render();
}
seed();reload();

// Para integrar a API, inicie o backend Spring Boot e mude DEMO_MODE para false.
