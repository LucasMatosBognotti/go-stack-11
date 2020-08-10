# Recuperação de senha

**Requisitos Funcionais**

- O usuario deve poder recuparar sua senha informando o seu e-mail;
- O usuario deve receber um e-mail com instruções de recuperação de senha;
- O usuario deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar MailTrap para testar envios de e-mail em embiente de desenvolvimento;
- Utilizar Amazon SES para envios de e-mail em produção;
- O envio de  e-mail deve acontecer em segundo plano (background job);

**Regras de Negocio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar;

# Atualização do perfil

**Requisitos Funcionais**

- O usuario deve poder atualizar seu nome, email e senha;

**Requisitos Não Funcionais**

-

**Regras de Negocio**

- O usuario não pode alterar seu e-mail para um e-mail ja ultilizado;
- Para atualizar sua senha, o usuario deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senha;

# Painel do prestador

**Requisitos Funcionais**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamentos;
- O prestador deve poder visualizar as notificaçoes não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador dever ser armazenda em MongoDB;
- As notificaçoes do prestador deve ser enviadas em tempo-real utilizando Socket.IO

**Regras de Negocio**

- A notificação deveter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento do serviço

**Requisitos Funcionais**

- O usuario deve poder listar todos os prestadotes de serviço cadastrados;
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazanada em cache;

**Regras de Negocio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponiveis entre 8h as 18h (Primeiro horario 8h, ultimo as 17h);
- O usuario não pode agendar em um horario ja ocupado;
- O usuario não pode agendar em um horario que ja passou;
- O usuario não pode agendar serviço consigo mesmo;
