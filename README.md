# HealthFlow - Sistema de Saúde

O **HealthFlow** é um sistema simples de **Prontuário Eletrônico e Gestão de Pacientes**, desenvolvido em **Node.js** com **Express** e **SQLite**.  
Ele permite cadastrar pacientes, registrar consultas médicas e consultar o histórico de cada paciente.  
Na versão atual, o sistema conta com **autenticação JWT** para proteger as rotas e **testes automatizados** para garantir estabilidade.

---

## Tecnologias utilizadas
- **Node.js** (runtime JavaScript)
- **Express** (framework web)
- **SQLite** (banco de dados)
- **Jest + Supertest** (testes automatizados)
- **JSON Web Token (JWT)** (autenticação)

---

## Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/RafaelEndy/healthflow.git
cd healthflow
npm install
