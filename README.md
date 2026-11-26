# HelpDesk Pro — Sistema de Suporte

Sistema web de demonstração para gerenciamento de chamados técnicos, funcionários, responsáveis, prioridades e histórico/status de atendimento.

## Tecnologias
- Java 17
- Spring Boot 3.3.5
- Spring Web, Spring Data JPA, Spring Security
- MySQL 8+
- HTML5, CSS3 e JavaScript
- Chart.js

## Estrutura do projeto
```text
HelpDesk/
├── index.html
├── style.css
├── app.js
├── README.md
├── assets/photo.png
└── backend/
    ├── pom.xml
    └── src/main/
        ├── java/br/com/helpdesk/
        │   ├── HelpDeskApplication.java
        │   ├── config/
        │   ├── model/
        │   ├── repository/
        │   └── controller/
        └── resources/application.properties
```

## Executar a interface
1. Extraia o ZIP e abra a pasta `HelpDesk` no VS Code.
2. Abra `index.html` com a extensão Live Server.
3. O projeto inicia em modo demonstração, sem precisar de Java ou MySQL. Os cadastros ficam salvos no armazenamento local do navegador.

## Executar o backend
Pré-requisitos: JDK 17, Maven e MySQL 8+.

1. Crie o banco de dados:
   ```sql
   CREATE DATABASE helpdesk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Edite `backend/src/main/resources/application.properties` e configure usuário e senha do MySQL.
3. No terminal:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. A API inicia em `http://localhost:8080`.

## Conectar o front-end
No arquivo `app.js`, altere `const DEMO_MODE=true` para `false` e abra o front-end via Live Server.

## Endpoints da API
| Método | Rota | Função |
|---|---|---|
| GET | `/api/tickets` | Listar chamados |
| POST | `/api/tickets` | Abrir chamado |
| PATCH | `/api/tickets/{id}/status` | Atualizar status |
| GET | `/api/employees` | Listar funcionários |
| POST | `/api/employees` | Cadastrar funcionário |
| GET | `/api/tickets/{id}/history` | Consultar histórico |

## GitHub
Dentro da pasta `HelpDesk`, execute:
```bash
git init
git add .
git commit -m "feat: cria sistema HelpDesk Pro"
git branch -M main
```
Crie um repositório vazio chamado `HelpDesk` no GitHub e conecte:
```bash
git remote add origin https://github.com/SEU-USUARIO/HelpDesk.git
git push -u origin main
```
Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

## Segurança e escopo
O Spring Security está incluído como dependência e a configuração inicial libera as rotas da API para facilitar os testes locais. Ainda não há login, controle de acesso por perfil ou autenticação real. A senha de usuário não é coletada pelo formulário demonstrativo. Antes de usar em empresa, implemente autenticação (por exemplo, JWT), autorização por função, hash de senhas, validações, testes e trilha de auditoria.
